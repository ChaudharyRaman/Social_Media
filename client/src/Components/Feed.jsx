import { Avatar, Box, Button, Input, Stack, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { ContextState } from '../Context/ContextProvider';
import Post from '../mischallaneous/Post'
import profilePic from '../Images/profilePic.png'


export default function Feed() {
  const toast = useToast();

  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [isWritingPost, setIsWritingPost] = useState(false);

  const [posts, setPosts] = useState();
  const [postLoading, setPostLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const { userToken, user } = ContextState();

  const fetchPosts = async () => {
    try {
      setPostLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      }
      const { data } = await axios.get('/api/allposts', config);
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
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      }
      const { data } = await axios.post('/api/posts', { title, description }, config);
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

  return (
    <Box w={'100%'}
      h={'100%'}
      display={'flex'}
      gap={'2rem'}
      flexDir='column'
      alignItems={'center'}
      overflowY='scroll'
      bg='#F8F8F8'
      p={'4rem'}>


      <Box display={'flex'} gap='2' w='90%' alignContent={'center'} p={'2rem 2rem'} bg={'white'} borderRadius='2xl'
        boxShadow={'2px 2px grey'}
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
              <Box>
                <Input type='file' variant={'flushed'} />
              </Box>
              <Box display={'flex'} justifyContent='end' gap={'1.5rem'}>
                <Button colorScheme='purple' variant='solid'
                  onClick={() => { setIsWritingPost(false) }}
                >
                  Cancel
                </Button>
                <Button colorScheme='purple' variant='solid'
                  onClick={() => { submitPost()}}
                >
                  Post
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

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
  )
}
