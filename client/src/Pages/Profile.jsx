import { Box, Image, Text, } from '@chakra-ui/react'
import profilePic from '../Images/profilePic.png'
import { useToast } from '@chakra-ui/react'

import axios from 'axios';
import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet, useParams } from 'react-router-dom'
import LoginBG from '../Images/LoginBG.jpg'

// Feed Navbar---
import { useEffect } from 'react';
import { useState } from 'react';

import ProfileNavbar from '../Components/ProfileComponents/ProfileNavbar';
import ProfileLeft from '../Components/ProfileComponents/ProfileLeft';
import ProfileSidebar from '../Components/ProfileComponents/ProfileSidebar';
import ProfileFeed from '../Components/ProfileComponents/ProfileFeed';
import { ContextState } from '../Context/ContextProvider';

const Profile = () => {

    const { id } = useParams();


    const toast = useToast();
    // --------------USER DATA
    const { userToken } = ContextState();
    const [user, setUser] = useState({});
    const [userLoading, setUserLoading] = useState(false);


    const fetchUser = async () => {
        setUserLoading(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
            }
        }
        try {
            const { data } =  await axios.get(`/api/user/${id}`, config);
            
            if (!data) {
                toast({
                    title: `Error Occured`,
                    description: 'Failed To Fetch User',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                });
                setUserLoading(false);
                return;
            }
            setUserLoading(false);
            setUser(data);
        } catch (error) {
            toast({
                title: `Error Occured`,
                description: 'Failed To Fetch User',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            });
            setUserLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])



    return (
        <Box w={'100%'}
            h='100vh'
            // bgColor={'#ebdddd'}
            display='flex'
        >
            {/* Profile SideBar */}
            <ProfileSidebar />
            {/* Profile Content */}

            <Box
                overflowY={'scroll'}
                overflowX='hidden'
                display={'flex'}
                flexDir='column'
                // bgColor={'lightblue'}
                w='100%'
                paddingLeft={'6rem'}
                h={'100%'}
            >
                <Box w={'100%'} h='4rem' position={'sticky'}
                    top='0'
                    zIndex={'99'}
                >
                    <Navbar />
                </Box>
                <Box w={'100%'} display='flex' flexDir={'column'} >
                    <Box w={'100%'} height='20rem' backgroundColor={'lightcoral'} backgroundImage={LoginBG} position={'relative'} backgroundSize='cover' bgRepeat={'no-repeat'} >
                        {/* Profile Image */}
                        <Box w={'12rem'}
                            h='12rem'
                            borderRadius={'2xl'}
                            bgColor={'#808187'}
                            color='white'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            fontSize={'2xl'}
                            position={'absolute'}
                            top={'90%'}
                            left={'20%'}
                            transform={'translate(-50%,-50%)'}

                        >
                            <Image src={user.profilePic===''? profilePic : user.profilePic} w={'96%'} borderRadius={'2xl'} />
                        </Box>
                        <Box position={'absolute'} bottom='2%' left={'30%'} >
                            <Text fontSize={'2xl'} color='white' >@user</Text>
                        </Box>
                    </Box>

                </Box>
                {/* Profile Navbar -------------------------*/}
                <ProfileNavbar user={user} userLoading ={userLoading} />
                {/* Profile Navbar -------------------------
                */}

                <Box
                    width={'100%'}
                    height='100%'
                    display={'flex'}
                    marginTop='3rem'
                >
                    {/* Profile Left COmponent ---------------------- */}
                    <ProfileLeft />
                    {/* Profile Left COmponent ---------------------- */}

                    {/*----------------------- PRofile Main componenet----------------------- */}
                    {/* <ProfileFeed /> */}
                    <Outlet />
                    {/*----------------------- PRofile Main componenet----------------------- */}
                    
                    <Box flex={1}>

                    </Box>
                </Box>


            </Box>
        </Box>
    )
}

export default Profile
