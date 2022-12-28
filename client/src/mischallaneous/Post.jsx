import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { BiChat, BiLike } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ContextState } from '../Context/ContextProvider'
import profilePic from '../Images/profilePic.png'


export default function Post({ post, setFetchAgain }) {
    const toast = useToast();

    const { user, userToken } = ContextState();
    const [userLike, setUserLike] = useState(false);
    const [likeCount, setLikeCount] = useState(post.like.length);

    const likedByUser = () => {
        return post.like.find((l) => l === (user?._id))
    }
    // console.log(post);
    const likeHandler = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
            }
        };
        try {
            if (likedByUser()) {
                await axios.post(`/api/posts/${post._id}/unlike`, {}, config);
                // await axios.post(`/api/unlike/${post._id}`, {}, config);
                setUserLike(false);
                setLikeCount(likeCount-1);
            } else {
                await axios.post(`/api/posts/${post._id}/like`, {}, config);
                // await axios.post(`/api/like/${post._id}`, {}, config);
                setUserLike(true);
                setLikeCount(likeCount+1);
            }

            setFetchAgain(prev => !prev);

        } catch (error) {
            toast({
                title: `Error Occured`,
                description: `${error.message}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            });
            
        }
    };

    useEffect(()=>{
        setUserLike(likedByUser());
    },[]);
    
    return (
        <Card maxW='md' width={'md'}>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={post.username} src={(post.user.profilePic ? post.user.profilePic : profilePic)} />

                        <Box>
                            <Heading size='sm'>{post.user.username}</Heading>
                            <Text>Uploaded - {post.user.updatedAt.slice(0, 10)}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Heading size='md' marginBottom={'2'} >{post.title}</Heading>
                <Text>
                    {post.description}
                </Text>
            </CardBody>

            {
                (post.image) ?
                    <Image
                        objectFit='cover'
                        src={post.image}
                        alt='Chakra UI'
                    />
                    : ''
            }

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}
            >
                <Button flex='1'
                    variant='ghost'
                    // 68d97e
                    leftIcon={<BiLike color={userLike ? '#68d97e' : ''} size={'1.5rem'} />}

                    onClick={likeHandler}  >
                    Like {(post.like !== 0) ? likeCount : ''}
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiChat size={'1.5rem'} />}>
                    Comment {(post.comments.length != 0) ? post.comments.length : ''}
                </Button>
            </CardFooter>
        </Card>
    )
}
