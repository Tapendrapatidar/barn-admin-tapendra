import React, { useState } from 'react';
import { Button, Input, Select } from '../../components/Coustom';
import { Divider } from '@chakra-ui/react';

function Register() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [timeframe, setTimeframe] = useState('');
    const [status, setStatus] = useState('');
    const [nameError, setNameError] = useState('');
    const [numberError, setNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [timeframeError, setTimeframeError] = useState('');
    const [statusError, setStatusError] = useState('');

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
        const isValidTimeframe = !!timeframe;
        const isValidStatus = !!status;
        setTimeframeError(isValidTimeframe ? '' : 'Please select a timeframe');
        setStatusError(isValidStatus ? '' : 'Please select a status');
        return isValidTimeframe && isValidStatus;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail() && validatePhoneNumber() && validateSelect()) {
            console.log('Form submitted:', { name, number, email, status });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="px-4 sm:px-6 lg:px-8  w-full max-w-9xl mx-auto">
                <h1 className=" text-xl text-black px-2 mt-4 mb-4 font-bold">
                    Add  Staffs
                </h1>
                <Divider border={'1px solid gay'} mt={2} mb={4} orientation='horizontal' />
                <div className='grid grid-cols-12 gap-2 pb-10 p-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200'>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
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
                            value={timeframe}
                            label='Timeframe'
                            onChange={(e) => setTimeframe(e.target.value)}
                            onBlur={validateSelect}
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'inProcess', label: 'In Process' }
                            ]}
                            placeholder="Select Timeframe"
                            error={timeframeError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Select
                            value={status}
                            label='Status'
                            onChange={(e) => setStatus(e.target.value)}
                            onBlur={validateSelect}
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'inProcess', label: 'In Process' }
                            ]}
                            placeholder="Select Status"
                            error={statusError}
                        />
                    </div>
                    <div className="col-span-full mt-20 m-auto xl:col-span-12">
                        <Button isLoading={false} type='submit'>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;