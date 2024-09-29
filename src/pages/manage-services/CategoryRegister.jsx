import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from '../../components/Coustom';
import { Divider } from '@chakra-ui/react';
import FileUploader from '../../components/FileUploader';
import { useNavigate } from 'react-router-dom';
import CategoryApi from '../../apis/products.api';
import { useLocation } from 'react-router-dom';

function Register() {
    const [productName, setProductName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');

    const [productNameError, setProductNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [files, setFiles] = useState([]);
    const navigate = useNavigate()
    const categoryApi = new CategoryApi();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const validateEmail = () => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        setEmailError(isValid ? '' : 'Please enter a valid email address');
        return isValid;
    };

    const validateAmount = () => {
        const isValid = amount.trim() !== '';
        setAmountError(isValid ? '' : 'Amount is required');
        return isValid;
    };

    const validateQuantity = () => {
        const isValid = quantity.trim() !== '';
        setQuantityError(isValid ? '' : 'Quantity is required');
        return isValid;
    };

    const validateSelect = () => {
        const isValid = type.trim() !== '';
        setTypeError(isValid ? '' : 'Type is required');
        return isValid;
    };
    const validate = () => {
        if (
            validateEmail() &&
            validateAmount() &&
            validateQuantity() &&
            validateSelect()

        ) {
            return true;
        }
    }
    const formData = new FormData();
    if (id) {
        formData.append('categoryId', id)
    }
    formData.append('productName', productName);
    formData.append('email', email);
    formData.append('type', type);
    formData.append('price', amount);
    files.forEach((file, index) => {
        formData.append(`images`, file);
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const AddCategoryResponse = await categoryApi.addCategory(formData);
                if (AddCategoryResponse.data.code === 200) {
                    toast.success(AddCategoryResponse.data.message);
                    navigate('/categorys');
                } else {
                    toast.error(AddCategoryResponse.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };
    const UpdatedCategory = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const AddCategoryResponse = await categoryApi.updateCategory(formData);
                if (AddCategoryResponse.data.code === 200) {
                    toast.success(AddCategoryResponse.data.message);
                    navigate('/Categorys');
                } else {
                    toast.error(AddCategoryResponse.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };
    const getCategoryById = async (e) => {
        try {
            const getCategoryByIdResponse = await categoryApi.getCategoryById({ categoryId: id });
            if (getCategoryByIdResponse.data.code === 200) {
                const e = getCategoryByIdResponse.data.data
                setProductName(e.name)
                setAmount(e.price)

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
                    Add Services Category
                </h1>
                <Divider border={'1px solid gray'} mt={2} mb={4} orientation='horizontal' />
                <div className='grid grid-cols-12 gap-2 pb-10 p-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200'>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Jack Sullivan'
                            label="Product Name"
                            value={productName}
                            onBlur={() => setProductNameError(productName ? '' : 'Product Name is required')}
                            onChange={(e) => setProductName(e.target.value)}
                            error={productNameError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="email"
                            required
                            placeholder='example@example.com'
                            label="Email"
                            value={email}
                            onBlur={validateEmail}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="tel"
                            required
                            placeholder='Enter Amount'
                            label="Amount"
                            value={amount}
                            onBlur={validateAmount}
                            onChange={(e) => setAmount(e.target.value)}
                            error={amountError}
                        />
                    </div>
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
                            value={type}
                            label='Type'
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
