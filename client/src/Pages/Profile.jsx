import { Box, Image, ListItem, Text, Tooltip, UnorderedList } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlinePaperClip } from 'react-icons/ai'
import profilePic from '../Images/profilePic.png'
import { Avatar, Button, FormControl, FormLabel, Input, Stack, Textarea, useToast } from '@chakra-ui/react'

import axios from 'axios';
import React from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'
import LoginBG from '../Images/LoginBG.jpg'

import { IoMdPhotos } from 'react-icons/io'
import { SlPeople } from 'react-icons/sl'
import { MdDynamicFeed } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { BsNewspaper } from 'react-icons/bs'
import { TbFriends, TbPlayerPlay } from 'react-icons/tb'
import { GoFileMedia } from 'react-icons/go'


// Feed Navbar---
import { CgProfile } from 'react-icons/cg'
import { FaUserFriends } from 'react-icons/fa'
import { useEffect } from 'react';
import { useState } from 'react';
import { ContextState } from '../Context/ContextProvider';
import ProfileSidebar from '../Components/ProfileSidebar';
import Post from '../mischallaneous/Post';
import ProfileNavbar from '../Components/ProfileComponents/ProfileNavbar';
import ProfileLeft from '../Components/ProfileComponents/ProfileLeft';

const Profile = () => {

    const { id } = useParams();


    const toast = useToast();
    // --------------USER DATA
    const { userToken } = ContextState();
    const [user, setUser] = useState({});


    // --------------POST CONTENT------------------
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isWritingPost, setIsWritingPost] = useState(false);

    const [posts, setPosts] = useState();

    const [postLoading, setPostLoading] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);

    const [imageLoading, setImageLoading] = useState(false);
    const [postImageUrls, setPostImageUrls] = useState([]);


    const fetchUser = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
            }
        }
        try {
            const { data } = axios.get(`/api/user/${id}`, config);
            
            console.log(data, 'data')
            if (!data) {
                toast({
                    title: `Error Occured`,
                    description: 'Failed To Fetch User',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                });
                return;
            }

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
        }
    }


    const closeHandler = () => {
        setIsWritingPost(false);
        setTitle('');
        setDescription('');
        setPostImageUrls([]);
    }

    const removeImage = (idx) => {
        const newUrls = postImageUrls.filter((url, index) => index !== idx);
        setPostImageUrls(newUrls);
    }

    const postImage = (pic) => {


        setImageLoading(true);
        if (pic === undefined) {
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        if (pic.type === 'image/jpeg' || pic.type === 'image/png' || pic.type === 'image/jpg') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'social-media');
            data.append('cloud_name', 'dczilkqlt');
            fetch('https://api.cloudinary.com/v1_1/dczilkqlt/image/upload', {
                method: 'post',
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    setPostImageUrls([...postImageUrls, data.url.toString()])
                    // console.log(data.url.toString());
                    setImageLoading(false);
                })
                .catch(err => {
                    toast({
                        title: `Error Occured`,
                        description: 'Failed To Upload Image',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'bottom-right'
                    });
                    setImageLoading(false);
                })
        }
    }

    const fetchPosts = async () => {
        try {
            setPostLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                }
            }
            const { data } = await axios.get(`/api/allposts/${id}`, config);
            setPosts(data);
            setPostLoading(false)
        } catch (error) {
            toast({
                title: `Error Occured`,
                description: 'Failed To Fetch Posts',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            });
            setPostLoading(false);
        }
    }

    const submitPost = async () => {

        if (title == '' && description == '' && postImageUrls.length == 0) {
            toast({
                title: 'Please Enter Something',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                }
            }
            const { data } = await axios.post('/api/posts', { title, description, postImageUrls }, config);
            toast({
                title: `Post Created`,
                description: 'Post Created Successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            });
            setFetchAgain(!fetchAgain);
            setIsWritingPost(false);
            setTitle('');
            setDescription('');
            setPostImageUrls([]);

        } catch (error) {

            toast({
                title: `Error Occured`,
                description: 'Failed To Create Post',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            });
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [fetchAgain]);

    useEffect(() => {
        fetchUser();
    }, [fetchAgain])



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
                            <Image src='https://randomuser.me/api/portraits/men/96.jpg' w={'96%'} borderRadius={'2xl'} />
                        </Box>
                        <Box position={'absolute'} bottom='2%' left={'30%'} >
                            <Text fontSize={'2xl'} color='white' >@user</Text>
                        </Box>
                    </Box>

                </Box>
                {/* Profile Navbar -------------------------*/}
                <ProfileNavbar />
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

                    <Box flex={2}
                        borderRight='3px solid #F3F3F3'
                        display={'flex'}
                        flexDir='column'
                        gap={'2rem'}
                        marginTop='1rem'
                    >
                        <UnorderedList listStyleType={'none'} display='flex' gap='2rem'
                            fontFamily='cursive'
                            fontSize={'xl'}
                            borderBottom='5px solid #F3F3F3'
                            paddingBottom={'1rem'}
                        >
                            <ListItem cursor={'pointer'}>
                                Personal
                            </ListItem>
                            <ListItem cursor={'pointer'}>
                                Favourite
                            </ListItem>
                            <ListItem cursor={'pointer'}>
                                Group
                            </ListItem>
                        </UnorderedList>

                        {/* -------------------------------- Create Post Box -------------------------------------------------- */}

                        <Box display={'flex'} gap='2' w='90%' justifyContent={'center'} alignItems='center' marginLeft={'2rem'} alignContent={'center'} p={'2rem 2rem'} bg={'white'} borderRadius='2xl'
                            boxShadow='0 0 10px 0 rgba(0,0,0,0.1)'
                            borderBottom={'5px solid #F3F3F3'}
                        >
                            <Avatar size={'md'} name={'Profile'} src={profilePic} />
                            <Box flex='1' width={'auto'}>
                                {!isWritingPost ? (
                                    <Input placeholder={`whats new? ${user?.userName}`} size='md' width={'100%'}
                                        onClick={() => { setIsWritingPost(true) }}
                                    />
                                ) : (
                                    <Box display={'flex'} flexDir='column' gap={'1rem'} >
                                        <Textarea
                                            insetX={'2'}
                                            placeholder={`whats new? ${user?.userName}`}
                                            value={description}
                                            onChange={(e) => { setDescription(e.target.value) }}
                                            variant={'flushed'}
                                        />
                                        <Input placeholder={`Topic Name`} size='md'
                                            width={'100%'}
                                            value={title}
                                            onChange={(e) => { setTitle(e.target.value) }}
                                            variant={'flushed'}
                                        />
                                        <Box display={'flex'} flexDir='column'>
                                            {/* file upload panel */}
                                            <FormControl>
                                                <FormLabel display={'flex'} alignItems='center' color={'#7818cc'} >
                                                    <Box bgColor={'#dbdbea'} borderRadius='3xl' cursor={'pointer'}>
                                                        <AiOutlinePaperClip size={'2rem'} color='#7818cc' />
                                                    </Box>
                                                    <Box cursor={'pointer'}>
                                                        <Text ml={'1rem'}>Add Image</Text>
                                                    </Box>
                                                </FormLabel>
                                                <Input type='file'
                                                    variant={'flushed'}
                                                    accept={'image/*'}
                                                    onChange={(e) => { postImage(e.target.files[0]) }}
                                                    hidden
                                                />
                                            </FormControl>
                                            {/* image preview */}
                                            <Box display={'flex'} flexWrap='wrap' gap={'1rem'} mt={'1rem'}>
                                                {
                                                    postImageUrls.map((url, index) => (
                                                        <Box key={index} position='relative'>
                                                            <Image src={url} w={'100%'} h={'7rem'} borderRadius='2xl' />
                                                            <Box position='absolute' top='-1' right='-1' cursor='pointer'
                                                                onClick={() => { removeImage(index) }}
                                                                borderRadius='full'
                                                                bgColor='red'
                                                            >
                                                                <AiOutlineClose size={'1.5rem'} color='white' />
                                                            </Box>
                                                        </Box>
                                                    ))
                                                }
                                            </Box>


                                        </Box>
                                        <Box display={'flex'} justifyContent='end' gap={'1.5rem'}>
                                            <Button colorScheme='purple' variant='solid'
                                                onClick={() => { closeHandler() }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button colorScheme='purple'
                                                variant='solid'
                                                isLoading={imageLoading}
                                                onClick={() => { submitPost() }}
                                            >
                                                Post
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        {/* -------------------------------- Create Post Box  END-------------------------------------------------- */}

                        {   /*------------------------------Posts HERE------------------------  */}
                        <Box display={'flex'} justifyContent='center'>
                            <Stack gap={'1.5rem'}>
                                {
                                    postLoading ? (
                                        <Text>Loading...</Text>
                                    ) : (
                                        posts?.map(post => (
                                            <Post key={post._id} post={post} setFetchAgain={setFetchAgain} />
                                        ))
                                    )
                                }
                            </Stack>
                        </Box>
                    </Box>
                    <Box flex={1}>

                    </Box>
                </Box>


            </Box>
        </Box>
    )
}

export default Profile
