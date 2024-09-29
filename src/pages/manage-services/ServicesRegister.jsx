import React, { useEffect, useState } from 'react';
import { Button, Input } from '../../components/Coustom';
import { Divider } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import FileUploader from '../../components/FileUploader';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ServicesApi from '../../apis/services.api';

function Register() {
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [files, setFiles] = useState([]);
    const [amount, setAmount] = useState('');

    const [amountError, setAmountError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [houseNumberError, setHouseNumberError] = useState('');
    const [streetNameError, setStreetNameError] = useState('');
    const [cityError, setCityError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [latitudeError, setLatitudeError] = useState('');
    const [longitudeError, setLongitudeError] = useState('');
    const navigate = useNavigate()
    const servicesnApiApi = new ServicesApi();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const validateEmail = () => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        setEmailError(isValid ? '' : 'Please enter a valid email address');
        return isValid;
    };

    const validateHouseNumber = () => {
        const isValid = houseNumber.trim() !== '';
        setHouseNumberError(isValid ? '' : 'House Number is required');
        return isValid;
    };
    const validateAmount = () => {
        const isValid = amount.trim() !== '';
        setAmountError(isValid ? '' : 'Amount is required');
        return isValid;
    };
    const validateStreetName = () => {
        const isValid = streetName.trim() !== '';
        setStreetNameError(isValid ? '' : 'Street Name is required');
        return isValid;
    };
    const validateCity = () => {
        const isValid = city.trim() !== '';
        setCityError(isValid ? '' : 'City is required');
        return isValid;
    };

    const validateCountry = () => {
        const isValid = country.trim() !== '';
        setCountryError(isValid ? '' : 'Country is required');
        return isValid;
    };
    const validateLatitude = () => {
        const isValid = latitude.trim() !== '' && /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(latitude);
        setLatitudeError(isValid ? '' : 'Latitude is required and must be a valid number');
        return isValid;
    };

    const validateLongitude = () => {
        const isValid = longitude.trim() !== '' && /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(longitude);
        setLongitudeError(isValid ? '' : 'Longitude is required and must be a valid number');
        return isValid;
    };

    const validate = () => {
        if (
            validateEmail() &&
            validateHouseNumber() &&
            validateCountry() &&
            validateLongitude() &&
            validateLatitude() &&
            validateCity() &&
            validateStreetName() &&
            validateAmount()

        ) {
            return true;
        }
    }
    const formData = new FormData();
    if (id) {
        formData.append('ServiceId', id)
    }
    formData.append('title', title);
    formData.append('email', email);
    formData.append('houseNumber', houseNumber);
    formData.append('streetName', streetName);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('price', amount);
    files.forEach((file, index) => {
        formData.append(`images`, file);
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const AddServiceResponse = await servicesnApiApi.addService(formData);
                if (AddServiceResponse.data.code === 200) {
                    toast.success(AddServiceResponse.data.message);
                    navigate('/services');
                } else {
                    toast.error(AddServiceResponse.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };
    const UpdatedService = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const AddServiceResponse = await servicesnApiApi.updateService(formData);
                if (AddServiceResponse.data.code === 200) {
                    toast.success(AddServiceResponse.data.message);
                    navigate('/services');
                } else {
                    toast.error(AddServiceResponse.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };
    const getServiceById = async (e) => {
        try {
            const getServiceByIdResponse = await servicesnApiApi.getServiceById({ serviceId: id });
            if (getServiceByIdResponse.data.code === 200) {
                const e = getServiceByIdResponse.data.data
                console.log(e);
                setEmail(e.email)
                setTitle(e.title)
                setAmount(e.price)
                setLatitude(e.location.latitude)
                setLongitude(e.location.longitude)
                setCountry(e.country)
                setCity(e.city)
                setStreetName(e.streetName)
                setHouseNumber(e.houseNumber)

            } else {
                toast.error(getServiceByIdResponse.data.message);

            }
        } catch (error) {
            toast.error("Something went wrong");
        }

    };
    useEffect(() => {
        if (id) {
            getServiceById()
        }
    }, [id])


    return (
        <form onSubmit={id ? UpdatedService : handleSubmit}>
            <div className="px-4 sm:px-6 lg:px-8  w-full max-w-9xl mx-auto">
                <h1 className=" text-xl text-black px-2 mt-4 mb-4 font-bold">
                    Add  Service
                </h1>
                <Divider border={'1px solid gay'} mt={2} mb={4} orientation='horizontal' />
                <div className='grid grid-cols-12 gap-2 pb-10 p-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200'>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Jack Sullivan'
                            label="Title"
                            value={title}
                            onBlur={() => setTitleError(title ? '' : 'Title is required')}
                            onChange={(e) => setTitle(e.target.value)}
                            error={titleError}
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
                            placeholder='23 House Number'
                            label="Plot No. / House No"
                            value={houseNumber}
                            onBlur={validateHouseNumber}
                            onChange={(e) => setHouseNumber(e.target.value)}
                            error={houseNumberError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='Indore'
                            label="Street Name"
                            value={streetName}
                            onBlur={validateStreetName}
                            onChange={(e) => setStreetName(e.target.value)}
                            error={streetNameError}
                        />
                    </div>

                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='NY'
                            label="City"
                            value={city}
                            onBlur={validateCity}
                            onChange={(e) => setCity(e.target.value)}
                            error={cityError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="text"
                            required
                            placeholder='NY'
                            label="Country"
                            value={country}
                            onBlur={validateCountry}
                            onChange={(e) => setCountry(e.target.value)}
                            error={countryError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="number"
                            required
                            placeholder='22.7141'
                            label="Latitude"
                            value={latitude}
                            onBlur={validateLatitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            error={latitudeError}
                        />
                    </div>
                    <div className="col-span-full xl:col-span-6">
                        <Input
                            type="number"
                            required
                            placeholder='22.7141'
                            maxLength='10'
                            label="Longitude"
                            value={longitude}
                            onBlur={validateLongitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            error={longitudeError}
                        />
                    </div>
                    <div className="col-span-full pb-4 ">
                        <FileUploader notRequired={!id ? false : true} label='Upload Product Images ' files={files} setFiles={setFiles} />
                    </div>
                    <div className="col-span-full xl:col-span-12">
                        <div className='mb-4' >
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14717.32925982634!2d75.9165736!3d22.7530455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa84286eb91cf5c45%3A0xd5d1e812a21d58a1!2sNext%20Gen%20Tech%20Services%20-%20Your%20Trusted%20Tech%20Partner!5e0!3m2!1sen!2sin!4v1708602069792!5m2!1sen!2sin'
                                width="100%" // Adjust the width as needed
                                height="450"
                                style={{ border: "0", borderRadius: "10px" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
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
