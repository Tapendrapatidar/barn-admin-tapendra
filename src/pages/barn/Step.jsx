import React, { useState } from 'react';
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Box,
    Button,
    VStack, HStack,
    Divider,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Checkbox
} from '@chakra-ui/react';

export default function Example() {
    const steps = [
        { title: 'Step 1', description: 'Personal Details' },
        { title: 'Step 2', description: 'Amenities' },
        { title: 'Step 3', description: 'Additional-Information' },
        { title: 'Step 4', description: 'Making it User-Friendly' },
    ];

    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        website: '',
        phoneNumber: '',
        emailAddress: '',
        address: '',
        stallsAvailable: '',
        monthlyBoardRates: '',
        stallSizes: 6, // default value for stall sizes
        stallFeatures: [] // array to hold selected stall features
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = '';

        // Validation logic
        switch (name) {
            case 'website':
                error = value.trim() === '' ? 'Website URL is required' : '';
                break;
            case 'phoneNumber':
                error = value.trim() === '' ? 'Phone number is required' : '';
                break;
            case 'emailAddress':
                error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
                break;
            case 'address':
                error = value.trim() === '' ? 'Address is required' : '';
                break;
            case 'stallsAvailable':
                error = value.trim() === '' ? 'Number of stalls available is required' : '';
                break;
            case 'monthlyBoardRates':
                error = value.trim() === '' ? 'Monthly board rates are required' : '';
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            // Handle submit logic here
            console.log('Submitting form data:', formData);
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handlePrevious = () => {
        setActiveStep(activeStep - 1);
    };

    const handleFormDataChange = (data) => {
        ({ ...formData, ...data });
    };

    const renderForm = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <ContactInfoForm formData={formData} setFormData={setFormData} handleChange={handleChange} errors={errors} />;
            case 1:
                return <DateTimeForm />;
            case 2:
                return <SelectRoomsForm />;
            default:
                return null;
        }
    };



    const DateTimeForm = () => {
        return <Box>Date & Time Form</Box>;
    };

    const SelectRoomsForm = () => {
        return <Box>Select Rooms Form</Box>;
    };

    return (
        <HStack className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto" pos={'relative'} w={'100%'} h={'100%'} spacing={4}>
            <Box w={'20%'} rounded={'lg'} bg={'white'} p={4} border={'1px solid #D7DEDD'} h={'90%'}>
                <Stepper h={'100%'} index={activeStep} orientation="vertical" gap="0">
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator bg={'black'} textColor={'white'} border={'2px solid #DBDBDB'}>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink="0">
                                <StepTitle style={{ color: "#979797", fontSize: "14px", fontFamily: "Inter" }}>{step.title}</StepTitle>
                                <StepDescription style={{ color: "#000000", fontSize: "16px", fontWeight: "600", fontFamily: "Inter" }}>{step.description}</StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {/* Render form based on current step */}
            <Box h={'90%'} w={'80%'}>
                {renderForm(activeStep)}
            </Box>

            {/* Previous, Next, Submit Buttons */}
            <Box pos={'absolute'} bottom={'5%'} right={'5%'}>
                {activeStep > 0 && (
                    <Button onClick={handlePrevious} mr={2}>
                        Previous
                    </Button>
                )}
                <Button onClick={handleNext} colorScheme="blue">
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
            </Box>
        </HStack>
    );
}

const ContactInfoForm = ({ formData, setFormData, handleChange, errors }) => {


    return (
        <div>
            <h3 className='text-black font-[Inter] font-semibold text-[18px]'>
                Personal Details
            </h3>
            <Divider border={'1px solid #cccccc'} my={4} />
            <h4 className='text-black font-[Inter] font-semibold text-[16px]'>
                Contact
            </h4>
            <div className='grid grid-cols-12 gap-2 pb-10 p-2'>
                <div className="col-span-full xl:col-span-6">
                    <FormControl isInvalid={errors.website}>
                        <FormLabel textColor={'#333333'} fontWeight={'Outfit'} fontSize={'12px'}> Website (URL)</FormLabel>
                        <Input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            required
                            placeholder='Jack Sullivan'
                            border={'1px solid #D7DEDD'}
                            bg={'white'}
                        />
                        {errors.website && <FormErrorMessage>{errors.website}</FormErrorMessage>}
                    </FormControl>
                </div>
                <div className="col-span-full xl:col-span-6">
                    <FormControl isInvalid={errors.phoneNumber}>
                        <FormLabel textColor={'#333333'} fontWeight={'Outfit'} fontSize={'12px'}> Phone Number</FormLabel>
                        <Input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            placeholder=' Phone Number'
                            border={'1px solid #D7DEDD'}
                            bg={'white'}
                        />
                        {errors.phoneNumber && <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>}
                    </FormControl>
                </div>
                <div className="col-span-full xl:col-span-6">
                    <FormControl isInvalid={errors.emailAddress}>
                        <FormLabel textColor={'#333333'} fontWeight={'Outfit'} fontSize={'12px'}> Email Address</FormLabel>
                        <Input
                            type="email"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            required
                            placeholder=' Email Address'
                            border={'1px solid #D7DEDD'}
                            bg={'white'}
                        />
                        {errors.emailAddress && <FormErrorMessage>{errors.emailAddress}</FormErrorMessage>}
                    </FormControl>
                </div>
                <div className="col-span-full xl:col-span-6">
                    <FormControl isInvalid={errors.address}>
                        <FormLabel textColor={'#333333'} fontWeight={'Outfit'} fontSize={'12px'}> Address</FormLabel>
                        <Input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder=' Address'
                            border={'1px solid #D7DEDD'}
                            bg={'white'}
                        />
                        {errors.address && <FormErrorMessage>{errors.address}</FormErrorMessage>}
                    </FormControl>
                </div>
            </div>
            <h4 className='text-black font-[Inter] font-semibold text-[16px]'>
                Other Information
            </h4>
            <div className='grid grid-cols-12 gap-2 pb-10 p-2'>
                <div className="col-span-full xl:col-span-6">
                    <FormControl isInvalid={errors.stallsAvailable}>
                        <FormLabel textColor={'#333333'} fontWeight={'Outfit'} fontSize={'12px'}> Number of Stalls Available</FormLabel>
                        <Input
                            type="text"
                            name="stallsAvailable"
                            value={formData.stallsAvailable}
                            onChange={handleChange}
                            required
                            placeholder='Number of Stalls Available'
                            border={'1px solid #D7DEDD'}
                            bg={'white'}
                        />
                        {errors.stallsAvailable && <FormErrorMessage>{errors.stallsAvailable}</FormErrorMessage>}
                    </FormControl>
                </div>
                <div className="col-span-full xl:col-span-6">
                    <FormControl isInvalid={errors.monthlyBoardRates}>
                        <FormLabel textColor={'#333333'} fontWeight={'Outfit'} fontSize={'12px'}> Monthly Board Rates</FormLabel>
                        <Input
                            type="text"
                            name="monthlyBoardRates"
                            value={formData.monthlyBoardRates}
                            onChange={handleChange}
                            required
                            placeholder=' Monthly Board Rates'
                            border={'1px solid #D7DEDD'}
                            bg={'white'}
                        />
                        {errors.monthlyBoardRates && <FormErrorMessage>{errors.monthlyBoardRates}</FormErrorMessage>}
                    </FormControl>
                </div>
                <div className="col-span-full xl:col-span-6">
                    <FormControl isInvalid={errors.stallSizes}>
                        <FormLabel textColor={'#333333'} fontWeight={'Outfit'} fontSize={'12px'}> Stall Sizes</FormLabel>
                        <HStack>
                            <Box textAlign={'center'} bg={'white'} p={2} w={'32'} border={'1px solid #cccccc'} h={10}>
                                Size: {formData.stallSizes}
                            </Box>
                            <Slider defaultValue={6} min={0} max={100} step={1} aria-label='slider-ex-2' colorScheme='pink' name="stallSizes" onChange={(value) => setFormData(prevState => ({ ...prevState, stallSizes: value }))}>
                                <SliderTrack h={4} rounded={'full'}>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb h={5} w={5} />
                            </Slider>
                        </HStack>
                    </FormControl>
                </div>
                <div className="col-span-full xl:col-span-6">
                    <FormControl isInvalid={''}>
                        <FormLabel textColor={'#333333'} fontWeight={'Outfit'} fontSize={'12px'}> Stall Features</FormLabel>
                        <HStack mt={4}>
                            <Checkbox name="stallFeatures" value="Matted" onChange={handleChange}>Matted</Checkbox>
                            <Checkbox name="stallFeatures" value="Fans" onChange={handleChange}>Fans</Checkbox>
                            <Checkbox name="stallFeatures" value="Automatic Waterers" onChange={handleChange}>Automatic Waterers</Checkbox>
                            <Checkbox name="stallFeatures" value="Windows" onChange={handleChange}>Windows</Checkbox>
                        </HStack>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};