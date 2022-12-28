import { Button, FormControl, FormLabel, Input, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setIsLoading(true);
    if (!email || !password || !username) {
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
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    const { data } = await axios.post('/api/user', {
      username,
      email,
      password,
    }, config);

    setEmail('');
    setPassword('');
    setUsername('');

    localStorage.setItem('userToken', data.token);
    setIsLoading(false);
    navigate('/user/activity')
  }

  return (
    <VStack spacing={'25px'} >
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          rounded={'2xl'}
          placeholder='Username Here!'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
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
        Signup
      </Button>
    </VStack>
  )
}
