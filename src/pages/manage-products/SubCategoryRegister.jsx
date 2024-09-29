import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from '../../components/Coustom';
import { Divider } from '@chakra-ui/react';
import FileUploader from '../../components/FileUploader';
import { useNavigate } from 'react-router-dom';
import CategoryApi from '../../apis/products.api';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');
    const [categoryIdData, setCategoryData] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [nameError, setnameError] = useState('');
    const [loading, setLoading] = useState(false);
    const [amountError, setAmountError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [categoryIdError, setCategoryIdError] = useState('');
    const [files, setFiles] = useState([]);
    const navigate = useNavigate()
    const categoryApi = new CategoryApi();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const validateSelect = () => {
        const isValid = type.trim() !== '';
        setTypeError(isValid ? '' : 'Status is required');
        return isValid;
    };
    const validateSelectCategory = () => {
        const isValid = categoryId.trim() !== '';
        setCategoryIdError(isValid ? '' : 'Select a category');
        return isValid;
    };

    const validate = () => {
        if (
            validateSelect() &&
            validateSelectCategory()
        ) {
            return true;
        }
    }
    const formData = new FormData();
    if (id) {
        formData.append('categoryId', id)
    }
    formData.append('name', name);
    formData.append('status', type);
    formData.append('categoryId', categoryId);
    files.forEach((file, index) => {
        formData.append(`image`, file);
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true)
            try {
                const AddCategoryResponse = await categoryApi.addSubCategory(formData);
                if (AddCategoryResponse.data.code === 200) {
                    toast.success(AddCategoryResponse.data.message);
                    navigate('/manage-products/sub-category');
                } else {
                    toast.error(AddCategoryResponse.data.message);
                    setLoading(false)

                }
            } catch (error) {
                setLoading(false)
                toast.error("Something went wrong");
            }
        }
    };
    const getAllCategory = async () => {
        try {
            const getAllCategoryResponse = await categoryApi.getAllCategory()
            if (getAllCategoryResponse.data.code === 200) {
                setCategoryData(getAllCategoryResponse.data.data)
            } else {
                toast.error(getAllCategoryResponse.data.message);
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    }
    const UpdatedCategory = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                const AddCategoryResponse = await categoryApi.updateCategory(formData);
                if (AddCategoryResponse.data.code === 200) {
                    toast.success(AddCategoryResponse.data.message);
                    navigate('/Categorys');
                } else {
                    toast.error(AddCategoryResponse.data.message);
                    setLoading(false)

                }
            } catch (error) {
                toast.error("Something went wrong");
                setLoading(false)
            }
        }
    };
    const getCategoryById = async (e) => {
        try {
            const getCategoryByIdResponse = await categoryApi.getCategoryById({ subCategoryId: id });
            if (getCategoryByIdResponse.data.code === 200) {
                const e = getCategoryByIdResponse.data.data
                setname(e.name)
                setAmount(e.price)

            } else {
                toast.error(getCategoryByIdResponse.data.message);

            }
        } catch (error) {
            toast.error("Something went wrong");
        }

    };
    useEffect(() => {
        getAllCategory()
        if (id) {
            getCategoryById()
        }
    }, [id])

    return (
        <form onSubmit={id ? UpdatedCategory : handleSubmit}>
            <div className="px-4 sm:px-6 lg:px-8  w-full max-w-9xl mx-auto">
                <h1 className="text-xl text-black px-2 mt-4 mb-4 font-bold">
                    {!id ? "Add Product Sub-Category" : "Update Product Sub-Category"}
                </h1>
                <Divider border={'1px solid gray'} mt={2} mb={4} orientation='horizontal' />
                <div className='grid grid-cols-12 gap-2 pb-10 p-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200'>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Jack Sullivan'
                            label="Product Name"
                            value={name}
                            onBlur={() => setnameError(name ? '' : 'Product Name is required')}
                            onChange={(e) => setname(e.target.value)}
                            error={nameError}
                        />
                    </div>


                    <div className="col-span-full xl:col-span-6">
                        <Select
                            value={type}
                            label='Status'
                            onChange={(e) => setType(e.target.value)}
                            onBlur={validateSelect}
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'inProcess', label: 'In Process' }
                            ]}
                            placeholder="Select Type"
                            error={typeError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Select
                            value={categoryId}
                            label='Select Category'
                            onChange={(e) => setCategoryId(e.target.value)}
                            onBlur={validateSelectCategory}
                            options={categoryIdData.map((e, i) => {
                                return (
                                    {
                                        value: e.categoryId, label: e.name
                                    }
                                )
                            })}
                            placeholder="Select Category"
                            error={categoryIdError}
                        />

                    </div>
                    <div className="col-span-full pt-5 ">
                        <FileUploader notRequired={!id ? false : true} label='Upload Product Images ' files={files} setFiles={setFiles} />
                    </div>
                    <div className="col-span-full m-auto xl:col-span-12">
                        <Button isLoading={loading} type='submit'>
                            {!id ? "Save" : "Update"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;
