import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { ContextState } from '../Context/ContextProvider';
import Post from '../mischallaneous/Post'

export default function Feed() {
  const toast = useToast();

  const [posts, setPosts] = useState();
  const [postLoading, setPostLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const { userToken } = ContextState();

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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box w={'100%'}
      h={'100%'}
      display={'flex'}
      gap={'2rem'}
      flexDir='column'
      alignItems={'center'}
      overflowY='scroll'
      bg='#F8F8F8'
      p={'6rem'}>

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
