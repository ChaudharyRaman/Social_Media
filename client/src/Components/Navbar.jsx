import { Avatar, Box, Button, Image, Input, ListItem, Menu, MenuButton, MenuList, Text, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineHeart,AiOutlineDown } from 'react-icons/ai'
import { GrNotification } from 'react-icons/gr'
import { BiMessageRounded } from 'react-icons/bi'
import { HiCubeTransparent } from 'react-icons/hi'
import websiteLogo from '../Images/websiteLogo.png'


export default function Navbar() {
    return (
        <Box display={'flex'} p={4} justifyContent='space-between' bgColor={'#e9d8fd'} >

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
                    <Input placeholder='Search' colorScheme={'purple'} />
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
                                src={'https://bit.ly/code-beast'}
                            />
                        </MenuButton>
                        {/* <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler} >Logout</MenuItem>
                        </MenuList> */}
                    </Menu>
                </Box>
            </Box>
        </Box>
    )
}
