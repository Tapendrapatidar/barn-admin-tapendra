import React, { useState } from 'react';
import { FormControl, FormLabel, Input as Inputs, Textarea as Textareaa, Text, Select as Selects, Button as Buttons } from '@chakra-ui/react';

export const Input = ({ minLength = '', maxLength = '50', type, name, id, placeholder, required, label = null, value = '', onChange = () => { }, onBlur = () => { }, error = null }) => {
    const [touched, setTouched] = useState(false);

    const handleBlur = (e) => {
        setTouched(true);
        onBlur(e);
    };

    return (
        <div className="relative z-0 w-full mb-5 group">
            <FormControl isRequired={required}>
                <FormLabel fontWeight={400} fontFamily={'Outfit'} textColor={'rgba(51, 51, 51, 1)'} fontSize={'14px'}>{label}</FormLabel>
                <Inputs
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    type={type}
                    id={id}
                    minLength={minLength}
                    maxLength={type === "tel" || type === 'number' ? 10 : maxLength}
                    textColor={'rgba(0, 0, 0, 1)'}
                    outlineColor={'transparent'}
                    name={name}
                    h={12}
                    fontFamily={'Outfit'}
                    fontWeight={500}
                    fontSize={'16px'}
                    required={required}
                    placeholder={placeholder}
                    className=' focus:ring-transparent focus:outline-none focus:border-r-indigo-950  focus:border-none'
                    border={error && touched ? '1px solid red' : 'none'}
                    focusBorderColor="none"
                    bg="#fdf6eb"
                    outline="none"
                />
                {error && touched && (
                    <Text mt={1} fontSize="sm" color="red.500">
                        {error}
                    </Text>
                )}
            </FormControl>
        </div>
    );
};

export const Textarea = ({ minLength = '', maxLength = '50', type, name, id, placeholder, required, label = null, value = '', onChange = () => { }, onBlur = () => { }, error = null }) => {
    const [touched, setTouched] = useState(false);

    const handleBlur = (e) => {
        setTouched(true);
        onBlur(e);
    };

    return (
        <div className="relative z-0 w-full mb-5 group">
            <FormControl isRequired={required}>
                <FormLabel fontWeight={400} fontFamily={'Outfit'} textColor={'rgba(51, 51, 51, 1)'} fontSize={'14px'}>{label}</FormLabel>
                <Textareaa
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    type={type}
                    id={id}
                    minLength={minLength}
                    maxLength={type === "tel" || type === 'number' ? 10 : maxLength}
                    textColor={'rgba(0, 0, 0, 1)'}
                    outlineColor={'transparent'}
                    name={name}
                    h={12}
                    fontFamily={'Outfit'}
                    fontWeight={500}
                    fontSize={'16px'}
                    required={required}
                    placeholder={placeholder}
                    className=' focus:ring-transparent focus:outline-none focus:border-r-indigo-950  focus:border-none'
                    border={error && touched ? '1px solid red' : 'none'}
                    focusBorderColor="none"
                    bg="#fdf6eb"
                    outline="none"
                />
                {error && touched && (
                    <Text mt={1} fontSize="sm" color="red.500">
                        {error}
                    </Text>
                )}
            </FormControl>
        </div>
    );
};
export const Select = ({ required = null, value = '', label = '', onChange = () => { }, onBlur = () => { }, options, placeholder, error = null }) => {
    return (
        <FormControl isRequired={required}>
            <FormLabel fontWeight={400} fontFamily={'Outfit'} textColor={'rgba(51, 51, 51, 1)'} fontSize={'14px'}>{label}</FormLabel>
            <Selects
                className=' focus:ring-transparent focus:outline-none focus:border-r-indigo-950  focus:border-none'
                value={value}
                h={12}
                fontFamily={'Outfit'}
                onChange={onChange}
                textColor={'rgba(0, 0, 0, 1)'}
                fontWeight={500}
                fontSize={'16px'}
                onBlur={onBlur}
                focusBorderColor="none"
                bg="#fdf6eb"
                outline="none"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </Selects>
            {error && (
                <p className="text-red-500">{error}</p>
            )}
        </FormControl>
    );
};

export const Button = ({ type = 'sumbit', isLoading = false, onClick = () => { }, children = '' }) => {
    return (
        <Buttons
            w={{ base: "80", md: "md" }}
            m={'auto'}
            type={type}
            isLoading={isLoading}
            bg={'rgba(233, 165, 55, 1)'}
            _hover={{ bg: "#e5a23d" }}
            textColor={'white'}
            onClick={onClick}
        >
            {children}
        </Buttons>
    );
};
export const Checkbox = ({ label = '', isChecked = false, onChange = () => { } }) => {
    return (
        <div htmlFor="check-apple" className=" text-black mb-4 font-medium gap-0 cursor-pointer flex-col flex items-center">
            {label}
            <div className="checkbox-apple">
                <input
                    className="!bg-[#F9F9F9] focus:ring-transparent"
                    id="check-apple"
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                />
                <label htmlFor="check-apple"></label>
            </div>
        </div>
    )
}

