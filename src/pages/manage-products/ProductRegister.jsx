import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Textarea } from '../../components/Coustom';
import { Divider } from '@chakra-ui/react';
import FileUploader from '../../components/FileUploader';
import { useNavigate } from 'react-router-dom';
import ProductApi from '../../apis/products.api';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');

    const [quantity, setQuantity] = useState('');
    const [quantityError, setQuantityError] = useState('');

    const [discountPrice, setDiscountPrice] = useState('');
    const [discountPriceError, setDiscountPriceError] = useState('');

    const [feature, setFeature] = useState('');
    const [featureError, setFeatureError] = useState('');

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const [discount, setDiscount] = useState('');
    const [discountError, setDiscountError] = useState('');

    const [type, setType] = useState('');
    const [typeError, setTypeError] = useState('');

    const [categoryIdData, setCategoryData] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [categoryIdError, setCategoryIdError] = useState('');
    const [subCategoryIdData, setSubCategoryData] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState('');
    const [subcategoryIdError, setSubcategoryIdError] = useState('');

    const [files, setFiles] = useState([]);
    const [CoverImage, setCoverImage] = useState([]);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const productApi = new ProductApi();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const validateStatus = () => {
        const isValid = type.trim() !== '';
        setTypeError(isValid ? '' : 'Status is required');
        return isValid;
    };
    const validateSelectCategory = () => {
        const isValid = categoryId.trim() !== '';
        setCategoryIdError(isValid ? '' : 'Select a category');
        return isValid;
    };

    const validateSelectSubCategory = () => {
        const isValid = subCategoryId.trim() !== '';
        setSubcategoryIdError(isValid ? '' : 'Select a sub-category');
        return isValid;
    };
    const validateName = () => {
        const isValid = name.trim() !== '';
        setNameError(isValid ? '' : 'Product Name is required');
        return isValid;
    };

    const validateAmount = () => {
        const isValid = amount.trim() !== '';
        setAmountError(isValid ? '' : 'Amount is required');
        return isValid;
    };
    const validateDicountPrice = () => {
        const isValid = discountPrice.trim() !== '';
        setDiscountPriceError(isValid ? '' : 'Discount price is required');
        return isValid;
    };
    const validateDicount = () => {
        const isValid = discount.trim() !== '';
        setDiscountError(isValid ? '' : 'select  discount ');
        return isValid;
    };

    const validateQuantity = () => {
        const isValid = quantity.trim() !== '';
        setQuantityError(isValid ? '' : 'Quantity is required');
        return isValid;
    };


    const validate = () => {
        if (
            validateStatus() &&
            validateSelectCategory() &&
            validateQuantity() &&
            validateDicount() &&
            validateDicountPrice() &&
            validateAmount() &&
            validateName() &&
            validateSelectSubCategory() &&
            validateStatus()
        ) {
            return true;
        }
    }
    const formData = new FormData();
    if (id) {
        formData.append('productId', id)
    }
    formData.append('name', name);
    formData.append('status', type);
    formData.append('categoryId', categoryId);
    formData.append('subCategoryId', subCategoryId);
    formData.append('quantity', quantity);
    formData.append('price', amount);
    formData.append('discount', discount);
    formData.append('discountPrice', discountPrice);
    formData.append('feature', feature);
    formData.append('description', description);

    CoverImage.forEach((file, index) => {
        formData.append(`image`, file);
    });
    files.forEach((file, index) => {
        formData.append(`images`, file);
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true)
            try {
                const AddProductResponse = await productApi.addProduct(formData);
                if (AddProductResponse.data.code === 200) {
                    toast.success(AddProductResponse.data.message);
                    navigate('/manage-products/produts');
                } else {
                    setLoading(false)
                    toast.error(AddProductResponse.data.message);
                }
            } catch (error) {
                setLoading(false)
                toast.error("Something went wrong");
            }
        }
    };
    const getAllCategory = async () => {
        try {
            const getAllCategoryResponse = await productApi.getAllCategory()
            if (getAllCategoryResponse.data.code === 200) {
                setCategoryData(getAllCategoryResponse.data.data)
            } else {
                toast.error(getAllCategoryResponse.data.message);
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    }

    const getAllSubCategory = async () => {
        try {
            const getAllSubCategoryResponse = await productApi.getSubCategoryByCategory({
                categoryId
            })
            if (getAllSubCategoryResponse.data.code === 200) {
                setSubCategoryData(getAllSubCategoryResponse.data.data)
            } else {
                toast.error(getAllSubCategoryResponse.data.message);
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    }
    const UpdatedProduct = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (true) {
            setLoading(true);
            try {
                const AddProductResponse = await productApi.updateProduct(formData);
                if (AddProductResponse.data.code === 200) {
                    toast.success(AddProductResponse.data.message);
                    navigate('/manage-products/produts');
                } else {
                    setLoading(false);
                    toast.error(AddProductResponse.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
                setLoading(false)
            }
        }
    };
    const getProductById = async (e) => {
        try {
            const getProductByIdResponse = await productApi.getProductById({ productId: id });
            if (getProductByIdResponse.data.code === 200) {
                const e = getProductByIdResponse.data.data
                setAmount(e.price)
                setName(e.name)
                setAmount(e.price)
                setQuantity(e.quantity)
                setDiscount(e.discount)
                setDiscountPrice(e.discountPrice)
                setType(e.status)
                setCategoryId(e.categoryId.categoryId)
                setDescription(e.description)
                setFeature(e.feature)
                setSubCategoryId(e.subCategoryId.subCategoryId)

            } else {
                toast.error(getProductByIdResponse.data.message);

            }
        } catch (error) {
            toast.error("Something went wrong");
        }

    };
    useEffect(() => {
        getAllCategory()

        if (id) {
            getProductById()
        }
    }, [id])

    useEffect(() => {
        if (categoryId) { getAllSubCategory() }

    }, [categoryId])

    return (
        <form onSubmit={id ? UpdatedProduct : handleSubmit}>
            <div className="px-4 sm:px-6 lg:px-8  w-full max-w-9xl mx-auto">
                <h1 className="text-xl text-black px-2 mt-4 mb-4 font-bold">
                    {!id ? " Add Product" : "Update Product"}
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
                            onChange={(e) => setName(e.target.value)}
                            error={nameError}
                            onBlur={validateName}
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

                            value={discount}
                            label='Discount'
                            placeholder="discount"
                            onBlur={validateDicount}

                            onChange={(e) => setDiscount(e.target.value)}
                            options={[
                                { value: 'true', label: 'true' },
                                { value: 'false', label: 'false' },
                            ]}
                            error={discountError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Discount Price'
                            label="Discount Price"
                            onBlur={validateDicountPrice}
                            value={discountPrice}
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            error={discountPriceError}
                        />
                    </div>


                    <div className="col-span-full xl:col-span-6">
                        <Select
                            value={type}
                            label='Status'
                            placeholder={'Status'}
                            onBlur={validateStatus}
                            onChange={(e) => setType(e.target.value)}
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'inProcess', label: 'In Process' }
                            ]}
                            error={typeError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Select
                            value={categoryId}
                            label='Select Category'
                            placeholder={'select Category'}
                            onBlur={validateSelectCategory}
                            onChange={(e) => setCategoryId(e.target.value)}
                            options={categoryIdData.map((category) => ({
                                value: category.categoryId,
                                label: category.name
                            }))}
                            error={categoryIdError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Select
                            value={subCategoryId}
                            label='Select Sub-Category'
                            onBlur={validateSelectSubCategory}
                            placeholder={'select Sub-Category'}
                            onChange={(e) => setSubCategoryId(e.target.value)}
                            options={subCategoryIdData.map((item) => ({
                                value: item.subCategoryId,
                                label: item.name,

                            }))}
                            error={subcategoryIdError}
                        />
                    </div>
                    <div className="col-span-full ">
                        <Textarea
                            type="text"
                            required
                            maxLength='300'
                            placeholder='Feature'
                            label="Feature"
                            value={feature}
                            onBlur={() => setFeatureError(feature ? '' : 'feature is required')}
                            onChange={(e) => setFeature(e.target.value)}
                            error={featureError}
                        />
                    </div>
                    <div className="col-span-full">
                        <Textarea
                            type="text"
                            required
                            maxLength='1000'
                            placeholder='Description'
                            label="Description"
                            value={description}
                            onBlur={() => setDescriptionError(description ? '' : 'discription is required')}
                            onChange={(e) => setDescription(e.target.value)}
                            error={descriptionError}
                        />
                    </div>
                    <div className="col-span-full ">
                        <FileUploader notRequired={!id ? false : true} label='Upload Cover Image ' files={CoverImage} setFiles={setCoverImage} />
                    </div>
                    <div className="col-span-full pt-4 ">
                        <FileUploader notRequired={!id ? false : true} label='Upload Product Images ' files={files} setFiles={setFiles} />
                    </div>
                    <div className="col-span-full m-auto pt-4 xl:col-span-12">
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
