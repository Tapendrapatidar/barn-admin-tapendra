import React, { useEffect, useState } from 'react';
import {
    Box, Text, FormControl, FormLabel, Input, Checkbox, InputGroup, InputRightElement, Button
} from '@chakra-ui/react';
import { EmailIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import DashboardLogin from '../../Assets/Images/DashboardLogin.png'
import { useNavigate } from 'react-router-dom';
import Auth from '../../apis/auth/auth.api';
import toast from 'react-hot-toast';
import { updateUser, updateToken } from "../../redux/redux-slice/user.slice";
import { useDispatch } from "react-redux";
import { useAuthenticated } from '../../hooks/useAuthenticated.hook';
import { Navigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const loginApi = new Auth()
    const navigate = useNavigate(); // Changed from useNavigation to useNavigate
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [emailError, setEmailError] = useState('');
    const validateEmail = () => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        setEmailError(isValid ? '' : 'Please enter a valid email address');
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        }
        if (validateEmail()) {
            setLoading(true);
            try {
                const loginResponse = await loginApi.login({
                    email,
                    password
                })
                // console.log(loginResponse.data.message);
                if (loginResponse.data.code === 200) {
                    dispatch(updateUser(loginResponse.data.data));
                    dispatch(updateToken(loginResponse.data.token));
                    toast.success("Login Successfull");
                    navigate('/dashboard');
                } else {
                    toast.error(loginResponse.data.message);
                    setLoading(false)
                }
            } catch (error) {
                toast.error("something went wrong");
                setLoading(false)


            }
        }
    };

    useEffect(() => {
        setEmail(localStorage.getItem('email'))
        setPassword(localStorage.getItem('password'))
    }, [])
    const handleClick = () => setShow(!show);
    const isAuth = useAuthenticated()
    if (!isAuth) {
        return (
            <Box display={'flex'} h={'100vh'} alignItems={'center'} backgroundImage={DashboardLogin} backgroundSize={'cover'} backgroundRepeat={'no-repeat'} >
                <Box px={2} m={'auto'}>
                    <Text textColor={'#313131'} fontWeight={'bold'} fontSize={36} textAlign="center">
                        Login
                    </Text>
                    <Text textAlign="center" fontSize="16px" textColor="#313131">
                        Login to access your travelwise account
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <FormControl mt={4} isRequired>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={validateEmail}
                                    type="email"
                                    placeholder="john.doe@gmail.com"
                                    border="1px solid #79747E"
                                    focusBorderColor="none"
                                    bg="white"
                                    color="black"
                                    outline="none"
                                    pr="3.5rem"
                                    w={{ base: "100%", md: "96" }}
                                />
                                <InputRightElement pointerEvents="none" pr={4}>
                                    <EmailIcon  />
                                </InputRightElement>
                            </InputGroup>
                            <Text mt={1} fontSize="sm" color="red.500">
                                {emailError}
                            </Text>
                        </FormControl>
                        <FormControl mt={4} isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={show ? 'text' : 'password'}
                                    placeholder="238usd@3nf23"
                                    border="1px solid #79747E"
                                    focusBorderColor="none"
                                    bg="white"
                                    color="black"
                                    outline="none"
                                    pr="3.5rem"
                                />
                                <InputRightElement cursor={'pointer'} pr={4} onClick={handleClick}>

                                    {show ? <ViewOffIcon /> : <ViewIcon />}
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Checkbox
                            mt={4}
                            fontWeight="400"
                            defaultChecked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        >
                            Remember me
                        </Checkbox>
                        <Button
                            mt={4}
                            w="100%"
                            colorScheme=""
                            bg={'rgba(233, 165, 55, 1)'}
                            variant="solid"
                            rounded="md"
                            isLoading={loading}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                </Box>
            </Box>
        );
    } else {
        return <Navigate to={'/dashboard'} />
    }

}

export default Login;
