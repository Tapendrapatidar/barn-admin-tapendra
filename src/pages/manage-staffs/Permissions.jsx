import React, { useState } from "react";
import { Select } from "../../components/Coustom";
import { Divider, FormLabel, Switch } from '@chakra-ui/react';

const Index = () => {
    const [status, setStatus] = useState('');
    const [statusError, setStatusError] = useState('');

    const validateSelect = () => {
        const isValidStatus = !!status;
        setStatusError(isValidStatus ? '' : 'Please select a status');
        return isValidStatus;
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
            <div className="col-span-full xl:col-span-12 bg-white rounded-sm">
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl text-black px-2 mt-4 mb-4 font-bold">
                            Permissions
                        </h1>
                    </div>
                    <div className='grid grid-cols-12 gap-2 pb-10 p-2'>
                        <div className="col-span-full xl:col-span-6">
                            <Select
                                value={status}
                                label='Select Role to Get & Set Permissions'
                                onChange={(e) => setStatus(e.target.value)}
                                onBlur={validateSelect}
                                options={[
                                    { value: 'option1', label: 'Option 1' },
                                    { value: 'option2', label: 'Option 2' },
                                    { value: 'option3', label: 'Option 3' }
                                ]}
                                placeholder="Salesperson"
                                error={statusError}
                            />
                        </div>
                        <div className="col-span-full xl:col-span-12">
                            <Divider border={'1px solid #e1e1e1'} orientation='horizontal' />
                        </div>
                        <div className="overflow-scroll gap-2 md:overflow-hidden w-[300px] md:w-fit xl:w-[2000px]">
                            <CheckBoxComponent name="Admin module" />
                            <CheckBoxComponent name="User module" />
                            <CheckBoxComponent name="Office module" />
                            <CheckBoxComponent name="Product module" />
                            <CheckBoxComponent name="Lead module" />
                            <CheckBoxComponent name="Role module" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

const CheckBoxComponent = ({ name }) => {
    const [isChecked, setIsChecked] = useState({
        create: false,
        read: false,
        update: false,
        delete: false
    });

    const handleCheckboxChange = (type) => {
        setIsChecked(prevState => ({
            ...prevState,
            [type]: !prevState[type]
        }));
    };

    return (
        <div className="col-span-full flex items-center gap-10 md:gap-10 xl:col-span-12">
            <p className="text-black text-[14px] md:text-[16px] w-40 font-bold">{name}</p>
            <div className="cursor-pointer flex items-center">
                <Checkbox isChecked={isChecked.create} onChange={() => handleCheckboxChange('create')} label="Create" />
            </div>
            <div className="cursor-pointer flex items-center">
                <Checkbox isChecked={isChecked.read} onChange={() => handleCheckboxChange('read')} label="Read" />
            </div>
            <div className="cursor-pointer flex items-center">
                <Checkbox isChecked={isChecked.update} onChange={() => handleCheckboxChange('update')} label="Update" />
            </div>
            <div className="cursor-pointer flex items-center">
                <Checkbox isChecked={isChecked.delete} onChange={() => handleCheckboxChange('delete')} label="Delete" />
            </div>
        </div>
    );
};

const Checkbox = ({ label = '', isChecked = false, onChange = () => { } }) => {
    return (
        <div className="text-black mt-4 font-medium gap-4 cursor-pointer flex-row flex items-center">
            {label}
            <div className="checkbox-apple">
                <input
                    className="!bg-[#F9F9F9] focus:ring-transparent"
                    id={label}
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                />
                <label htmlFor={label}></label>
            </div>
        </div>
    );
};
