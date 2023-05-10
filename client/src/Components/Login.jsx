import { Button, FormControl, FormLabel, Input, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const submitHandler = async () => {
        setIsLoading(true);
        if (!email || !password) {
            toast({
                title: 'Alert',
                description: "Email and Passoword Required!!",
                status: 'error',
                position: 'bottom-right',
                variant: 'subtle',
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }

        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            console.log(email, password);
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_BASE_ADDR}/api/authenticate`, {
                email,
                password
            }, config);

            setEmail('');
            setPassword('');

            localStorage.setItem('userToken', data.token);
            setIsLoading(false);
            navigate('/user/activity')
        } catch (error) {
            toast({
                title: 'Error',
                description: "Enter valid Email OR Password",
                status: 'error',
                position: 'bottom-right',
                variant: 'subtle',
                duration: 3000,
                isClosable: true,
            });
            setEmail("")
            setPassword("")
            setIsLoading(false);
        }
    }

    return (
        <VStack spacing={'25px'} >
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    rounded={'2xl'}
                    placeholder='Email Here!'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    type={'password'}
                    rounded={'2xl'}
                    placeholder='Password Here!'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Button
                width={'100%'}
                rounded='2xl'
                colorScheme={'purple'}
                onClick={() => { submitHandler() }}
                isLoading={isLoading}
            >
                Login
            </Button>
        </VStack>
    )
}
