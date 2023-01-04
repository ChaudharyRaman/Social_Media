import { Avatar, Box, Button, FormControl, FormLabel, Image, Input, Stack, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { ContextState } from '../Context/ContextProvider';
import Post from '../mischallaneous/Post'
import profilePic from '../Images/profilePic.png'
import { AiOutlineClose, AiOutlinePaperClip } from 'react-icons/ai'


export default function Feed() {
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isWritingPost, setIsWritingPost] = useState(false);

  const [posts, setPosts] = useState();
  const [postLoading, setPostLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const [imageLoading, setImageLoading] = useState(false);
  const [postImageUrls, setPostImageUrls] = useState([]);

  const { userToken, user } = ContextState();

  const closeHandler = ()=>{
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
      const { data } = await axios.get('/api/getFollowingsPost', config);
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
                          <AiOutlineClose size={'1.5rem'} color='white'  />
                        </Box>
                      </Box>
                    ))
                  }
                </Box>


              </Box>
              <Box display={'flex'} justifyContent='end' gap={'1.5rem'}>
                <Button colorScheme='purple' variant='solid'
                  onClick={() => { closeHandler()}}
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
