import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { ContextState } from '../Context/ContextProvider'
import { CgProfile } from 'react-icons/cg'
import profilePic from '../Images/profilePic.png'


export default function Usercard() {

    const { user } = ContextState();

    // console.log(user);

    return (
        <Box
            display={'flex'}
            flexDir='column'
            alignItems={'center'}
            bgColor={'white'}
            marginTop='10'
            width={'70%'}
            height={'70%'}
            p='5'
            borderRadius={'xl'}
        >
            <Avatar size={'lg'} name={user ? user.userName : 'Profile'} src={ profilePic } />

            <Text fontWeight={'bold'} fontSize='lg' marginTop={'0.7rem'} > {user ? user.userName : ''}</Text>
            <Box display={'flex'} gap={'1rem'}
                margin='2rem 0'
            >
                <Box flex={1} display='flex' justifyContent={'center'} alignItems='center' flexDir={'column'}>
                    <Text fontWeight={'bold'}>
                        {user ? user.followers.length : ''}
                    </Text>
                    <Text fontWeight={'500'} color='gray' >Follower</Text>
                </Box>
                <Box flex={1} display='flex' justifyContent={'center'} alignItems='center' flexDir={'column'}>
                    <Text fontWeight={'bold'}>
                        {user ? user.following.length : ''}
                    </Text>
                    <Text fontWeight={'500'} color='gray' >Following</Text>
                </Box>
            </Box>
        </Box>

    )
}
