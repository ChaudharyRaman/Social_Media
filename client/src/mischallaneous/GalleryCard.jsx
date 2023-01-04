import { Avatar, Box, GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'
import loginBG from '../Images/LoginBG.jpg'
import profilePic from '../Images/profilePic.png'
import { ContextState } from '../Context/ContextProvider'



const GalleryCard = ({ imgUrl }) => {

    const { user } = ContextState();

    return (
        <GridItem
            w={'15rem'}
            h={'15rem'}
            bgColor={'white'}
            borderRadius={'10px'}
            boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.1)'}
            marginTop='4rem'
            marginLeft={'4rem'}
        >
            <Box w={'100%'} h={'100%'} display='flex' flexDir={'column'} justifyContent='space-between' bgColor={'#dbdbea'} borderRadius={'10px'}>
                <Box
                    flex='6'
                    w={'100%'}
                    h={'70%'}
                    _hover={{transform:'scale(1.05)',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2)',borderRadius:'10px'}}
                    cursor='pointer'
                >
                    <Image w={'100%'} height='100%' src={imgUrl} flex='6' borderRadius={'10px'} objectFit='cover' transition={'0.3s'} />
                </Box>
                <Box
                    flex='4'
                    display={'flex'}
                    justifyContent='center'
                    alignItems={'center'}

                >
                    <Avatar size={'md'} name={user ? user.userName : 'Profile'} src={profilePic} />
                    <Box
                        display={'flex'}
                        flexDir={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        marginLeft={'1rem'}
                    >
                        <Text fontSize={'lg'} fontWeight={'500'}>{user ? user.userName : ''}</Text>
                    </Box>
                </Box>
            </Box>
        </GridItem>
    )
}

export default GalleryCard
