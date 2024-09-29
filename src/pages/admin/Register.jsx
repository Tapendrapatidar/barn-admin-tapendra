import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from '../../components/Coustom';
import { Divider } from '@chakra-ui/react';
import AdminApi from '../../apis/admin.api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

function Register() {
    const adminApi = new AdminApi();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [type, setType] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [branchName, setBranchName] = useState('');
    const [nameError, setNameError] = useState('');
    const [numberError, setNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [businessNameError, setBusinessNameError] = useState('');
    const [homeAddressError, setHomeAddressError] = useState('');
    const [businessAddressError, setBusinessAddressError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [bankNameError, setBankNameError] = useState('');
    const [accountNumberError, setAccountNumberError] = useState('');
    const [ifscCodeError, setIfscCodeError] = useState('');
    const [branchNameError, setBranchNameError] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const validateEmail = () => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        setEmailError(isValid ? '' : 'Please enter a valid email address');
        return isValid;
    };

    const validatePhoneNumber = () => {
        const isValid = /^\d{10}$/.test(number);
        setNumberError(isValid ? '' : 'Please enter a valid 10-digit phone number');
        return isValid;
    };

    const validateSelect = () => {
        const isValid = !!type;
        setTypeError(isValid ? '' : 'Please select a Type');
        return isValid;
    };

    const validateIFSCCode = () => {
        const ifscRegex = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
        const isValid = ifscRegex.test(ifscCode);
        setIfscCodeError(isValid ? '' : 'Please enter a valid IFSC code');
        return isValid;
    };

    const validateAccountNumber = () => {
        const accountNumberRegex = /^[0-9]+$/;
        const isValid = accountNumberRegex.test(accountNumber);
        setAccountNumberError(isValid ? '' : 'Please enter a valid account number');
        return isValid;
    };

    const validate = () => {
        if (
            validateEmail() &&
            validatePhoneNumber() &&
            validateSelect() &&
            validateIFSCCode() &&
            validateAccountNumber()
        ) {
            return true;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const AddAdminResponse = await adminApi.addAdmin({

                    email,
                    name,
                    businessName,
                    businessAddress,
                    homeAddress,
                    bankName,
                    type,
                    contact: number,
                    accountNumber,
                    ifscCode,
                    branchName,
                });
                if (AddAdminResponse.data.code === 200) {
                    toast.success(AddAdminResponse.data.message);
                    navigate('/admin');
                } else {
                    toast.error(AddAdminResponse.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };
    const UpdatedAdmin = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const AddAdminResponse = await adminApi.updateAdmin(
                    {
                        adminId: id,
                        email,
                        name,
                        businessName,
                        businessAddress,
                        homeAddress,
                        bankName,
                        type,
                        contact: number,
                        accountNumber,
                        ifscCode,
                        branchName,
                    });
                if (AddAdminResponse.data.code === 200) {
                    toast.success(AddAdminResponse.data.message);
                    navigate('/admin');
                } else {
                    toast.error(AddAdminResponse.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };
    const getAdminById = async (e) => {
        try {
            const getAdminByIdResponse = await adminApi.getAdminById({ adminId: id });
            if (getAdminByIdResponse.data.code === 200) {
                const e = getAdminByIdResponse.data.data
                setEmail(e.email)
                setName(e.name)
                setNumber(e.contact)
                setBusinessAddress(e.businessAddress)
                setBusinessName(e.businessName)
                setHomeAddress(e.homeAddress)
                setType(e.type)
                setAccountNumber(e.bank.accountNumber)
                setIfscCode(e.bank.ifscCode)
                setBankName(e.bank.bankName)
                setBranchName(e.bank.branchName)
            } else {
                toast.error(getAdminByIdResponse.data.message);

            }
        } catch (error) {
            toast.error("Something went wrong");
        }

    };
    useEffect(() => {
        if (id) {
            getAdminById()
        }
    }, [id])


    return (
        <form onSubmit={id ? UpdatedAdmin : handleSubmit}>
            <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
                <h1 className="text-xl text-black px-2 mt-4 mb-4 font-bold">
                    Add Admins
                </h1>
                <Divider border={'1px solid gay'} mt={2} mb={4} orientation='horizontal' />
                <div className='grid grid-cols-12 gap-2 pb-10 p-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 '>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            minLength='8'
                            maxLength='50'
                            placeholder='Jack Sullivan'
                            label="Name"
                            value={name}
                            onBlur={() => setNameError(name ? '' : 'Name is required')}
                            onChange={(e) => setName(e.target.value)}
                            error={nameError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="tel"
                            required
                            placeholder='9876543210'
                            label="Mobile Number"
                            value={number}
                            onBlur={() => setNumberError(number ? '' : 'Mobile Number is required')}
                            onChange={(e) => setNumber(e.target.value)}
                            error={numberError}
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
                        <Select
                            value={type}
                            label='Type'
                            onChange={(e) => setType(e.target.value)}
                            onBlur={validateSelect}
                            options={[
                                { value: 'admin', label: 'Admin' },
                                { value: 'user', label: 'User' },
                            ]}
                            placeholder="Select Type"
                            error={typeError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Business name'
                            label="Business name"
                            value={businessName}
                            onBlur={() => setBusinessNameError(businessName ? '' : 'Business Name is required')}
                            onChange={(e) => setBusinessName(e.target.value)}
                            error={businessNameError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Business Address'
                            label="Business Address"
                            value={businessAddress}
                            onBlur={() => setBusinessAddressError(businessAddress ? '' : 'Business Address is required')}
                            onChange={(e) => setBusinessAddress(e.target.value)}
                            error={businessAddressError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='NY'
                            label="Home Address"
                            value={homeAddress}
                            onBlur={() => setHomeAddressError(homeAddress ? '' : 'Home Address is required')}
                            onChange={(e) => setHomeAddress(e.target.value)}
                            error={homeAddressError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Bank Name'
                            label="Bank Name"
                            value={bankName}
                            onBlur={() => setBankNameError(bankName ? '' : 'Bank Name is required')}
                            onChange={(e) => setBankName(e.target.value)}
                            error={bankNameError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Account Number'
                            label="Account Number"
                            value={accountNumber}
                            onBlur={validateAccountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            error={accountNumberError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            maxLength='11'
                            placeholder='IFSC Code'
                            label="IFSC Code"
                            value={ifscCode}
                            onBlur={validateIFSCCode}
                            onChange={(e) => setIfscCode(e.target.value.toUpperCase())} // Transforming input to uppercase
                            error={ifscCodeError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Branch Name'
                            label="Branch Name"
                            value={branchName}
                            onBlur={() => setBranchNameError(branchName ? '' : 'Branch Name is required')}
                            onChange={(e) => setBranchName(e.target.value)}
                            error={branchNameError}
                        />
                    </div>
                    <div className="col-span-full m-auto xl:col-span-12">
                        <Button isLoading={false} type='submit'>
                            {!id ? "Save" : "Update"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;
