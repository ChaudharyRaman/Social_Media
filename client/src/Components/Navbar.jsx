import { Avatar, Box, Button, Image, Input, ListItem, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineHeart, AiOutlineDown } from 'react-icons/ai'
import { GrNotification } from 'react-icons/gr'
import { BiMessageRounded } from 'react-icons/bi'
import { HiCubeTransparent } from 'react-icons/hi'
import websiteLogo from '../Images/websiteLogo.png'
import { useNavigate } from 'react-router-dom'
import { ContextState } from '../Context/ContextProvider'
import profilePic from '../Images/profilePic.png'



export default function Navbar() {

    const {user} = ContextState();

    const navigate = useNavigate();
    const logoutHandler = ()=>{
        localStorage.removeItem('userToken');
        navigate('/');
    }
    return (
        <Box flex={1} w='100%' h={'100%'} display={'flex'} pl={6} pr={6} justifyContent='space-between' bgColor={'#b99cdb'} >

            <Box display='flex' justifyContent={'center'} alignItems='center' gap={'1.5rem'}>
                <Box>
                    <Text fontSize={'4xl'}>ICON</Text>
                </Box>
                <Box>
                    <UnorderedList fontSize={'3xl'} listStyleType={'none'} display='flex' gap={'2.5rem'} justifyContent={'center'} alignItems='center'>
                        <ListItem><AiOutlineHeart /></ListItem>
                        <ListItem><GrNotification /></ListItem>
                        <ListItem><BiMessageRounded /></ListItem>
                        <ListItem><HiCubeTransparent /></ListItem>
                    </UnorderedList>
                </Box>
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems='center' gap={'1.5rem'} >
                <Box>
                    <Input placeholder='Search' colorScheme={'black'} />
                </Box>
                <Box>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rightIcon={<AiOutlineDown />} >
                            <Avatar
                                size={'sm'}
                                cursor={'pointer'}
                                name={'Raman'}
                                src={user?.profilePic ? user.profilePic : profilePic}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={()=>{navigate(`/user/${user._id}/profile`)}} >Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler} >Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Box>
        </Box>
    )
}
