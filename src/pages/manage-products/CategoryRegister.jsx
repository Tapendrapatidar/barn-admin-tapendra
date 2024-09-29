import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from '../../components/Coustom';
import { Divider } from '@chakra-ui/react';
import FileUploader from '../../components/FileUploader';
import { useNavigate } from 'react-router-dom';
import CategoryApi from '../../apis/products.api';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {
    const [category, setcategory] = useState('');

    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);

    const [categoryError, setcategoryError] = useState('');

    const [typeError, setTypeError] = useState('');
    const [files, setFiles] = useState([]);
    const navigate = useNavigate()
    const categoryApi = new CategoryApi();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const validateSelect = () => {
        const isValid = type.trim() !== '';
        setTypeError(isValid ? '' : 'Type is required');
        return isValid;
    };
    const validate = () => {
        if (
            validateSelect()
        ) {
            return true;
        }
    }
    const formData = new FormData();
    if (id) {
        formData.append('categoryId', id)
    }
    formData.append('name', category);
    formData.append('status', type);
    files.forEach((file, index) => {
        formData.append(`image`, file);
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                const AddCategoryResponse = await categoryApi.addCategory(formData);
                if (AddCategoryResponse.data.code === 200) {
                    toast.success(AddCategoryResponse.data.message);
                    navigate('/manage-products/category');
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
    const UpdatedCategory = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true)
            try {
                const AddCategoryResponse = await categoryApi.updateCategory(formData);
                if (AddCategoryResponse.data.code === 200) {
                    toast.success(AddCategoryResponse.data.message);
                    navigate('/manage-products/category');
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
            const getCategoryByIdResponse = await categoryApi.getCategoryById({ categoryId: id });
            if (getCategoryByIdResponse.data.code === 200) {
                const e = getCategoryByIdResponse.data.data
                setcategory(e.name)
                setType(e.status)
                console.log(e.status)

            } else {
                toast.error(getCategoryByIdResponse.data.message);

            }
        } catch (error) {
            toast.error("Something went wrong");
        }

    };
    useEffect(() => {
        if (id) {
            getCategoryById()
        }
    }, [id])

    return (
        <form onSubmit={id ? UpdatedCategory : handleSubmit}>
            <div className="px-4 sm:px-6 lg:px-8  w-full max-w-9xl mx-auto">
                <h1 className="text-xl text-black px-2 mt-4 mb-4 font-bold">
                    {!id ? "Add Product Category" : "Update Product Category"}
                </h1>
                <Divider border={'1px solid gray'} mt={2} mb={4} orientation='horizontal' />
                <div className='grid grid-cols-12 gap-2 pb-10 p-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200'>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Jack Sullivan'
                            label="Category Name"
                            value={category}
                            onBlur={() => setcategoryError(category ? '' : 'Product Name is required')}
                            onChange={(e) => setcategory(e.target.value)}
                            error={categoryError}
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
                            placeholder="Select Status"
                            error={typeError}
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
