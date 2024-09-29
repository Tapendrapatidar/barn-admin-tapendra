import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from '../../../components/Coustom';
import { Divider } from '@chakra-ui/react';
import FileUploader from '../../../components/FileUploader';
import { useNavigate } from 'react-router-dom';
import CategoryApi from '../../../apis/products.api';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FormLabel } from '@chakra-ui/react'

function Register() {
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [categoryError, setCategoryError] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [files, setFiles] = useState([]);
    const [section, setSection] = useState('');
    const [sectionError, setSectionError] = useState('');
    const navigate = useNavigate();
    const categoryApi = new CategoryApi();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const validateSelect = () => {
        const isValid = type.trim() !== '';
        setTypeError(isValid ? '' : 'Status is required');
        return isValid;
    };

    const validateQuantity = () => {
        const isValid = quantity.trim() !== '';
        setQuantityError(isValid ? '' : 'Quantity is required');
        return isValid;
    };

    const validaSection = () => {
        const isValid = section.trim() !== '';
        setSectionError(isValid ? '' : 'Section is required');
        return isValid;
    };

    const validate = () => {
        return validateSelect() && validateQuantity() && validaSection();
    };

    const formData = new FormData();
    if (id) {
        formData.append('categoryId', id);
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
                const response = id ? await categoryApi.updateCategory(formData) : await categoryApi.addCategory(formData);
                if (response.data.code === 200) {
                    toast.success(response.data.message);
                    navigate('/manage-products/category');
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
            setLoading(false);
        }
    };

    const getCategoryById = async () => {
        try {
            const response = await categoryApi.getCategoryById({ categoryId: id });
            if (response.data.code === 200) {
                const data = response.data.data;
                setCategory(data.name);
                setType(data.status);
                setSection(data.section); // Assuming there's a 'section' property in the data
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (id) {
            getCategoryById();
        }
    }, [id]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
                <h1 className="text-xl text-black px-2 mt-4 mb-4 font-bold">
                    {id ? 'Update Email Camping' : 'Create Email Camping'}
                </h1>
                <Divider border={'1px solid gray'} mt={2} mb={4} orientation='horizontal' />
                <div className='grid grid-cols-12 grid-rows-1 gap-2 pb-10 p-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200'>
                    <div className="col-span-full xl:col-span-6">
                        <div className="col-span-full xl:col-span-6">
                            <Input
                                type="text"
                                required
                                placeholder='Quantity'
                                label="Quantity"
                                value={quantity}
                                onBlur={validateQuantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                error={quantityError}
                            />
                        </div>
                        <div className="col-span-full xl:col-span-6">
                            <Select
                                value={section}
                                label='Section'
                                onChange={(e) => setSection(e.target.value)}
                                onBlur={validaSection}
                                options={[
                                    { value: 'Home', label: 'Home page' },
                                    { value: 'Products', label: 'Products page' },
                                    { value: 'Services', label: 'Services page' },
                                ]}
                                placeholder="Select Section"
                                error={sectionError}
                            />
                        </div>
                        <div className="col-span-full pt-3 xl:col-span-6">
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
                    </div>
                    <div className="col-span-full xl:row-span-12 xl:col-span-6">
                        <FormLabel fontWeight={400} fontFamily={'Outfit'} textColor={'rgba(51, 51, 51, 1)'} fontSize={'14px'}>
                            Preview
                        </FormLabel>
                        <div className='rounded-md bg-[#FDF6EB] min-h-32 h-[82%]'></div>
                    </div>
                    <div className="col-span-full pt-4 xl:col-span-6">
                        <FileUploader label='Upload Image' files={files} setFiles={setFiles} />
                    </div>
                    <div className="col-span-full m-auto xl:col-span-12">
                        <Button isLoading={loading} type='submit'>
                            {id ? "Update" : "Save"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;
