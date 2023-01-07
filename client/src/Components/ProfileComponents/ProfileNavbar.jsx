import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaUserFriends } from 'react-icons/fa'
import { GoFileMedia } from 'react-icons/go'
import { MdDynamicFeed } from 'react-icons/md'
import { TbFriends } from 'react-icons/tb'

const ProfileNavbar = ({user,userLoading}) => {

    return (
        <Box
            w={'100%'}
            display={'flex'}
            height='5rem'
            // bgColor={'lightblue'}
            marginTop='4rem'
            borderBottom={'5px solid #F3F3F3'}
            paddingBottom='1rem'
        >
            <Box width={'40%'} display='flex' justifyContent={'center'} alignItems='center' textAlign={'center'} >
                <Text fontSize={'2xl'} pl='4rem' fontFamily='cursive' >{userLoading?'Loading...':user.username}</Text>
            </Box>
            <Box w={'70%'} display={'flex'} gap='1rem' alignItems='center' >
                <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                    <MdDynamicFeed size={'2rem'} />
                </Box>
                <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                    <CgProfile size={'2rem'} />
                </Box>
                <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                    <FaUserFriends size={'2rem'} />
                </Box>
                <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                    <TbFriends size={'2rem'} />
                </Box>
                <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                    <GoFileMedia size={'2rem'} />
                </Box>
            </Box>
        </Box>
    )
}

export default ProfileNavbar
