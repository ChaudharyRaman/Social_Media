import { Avatar, AvatarBadge, Box, Grid, GridItem, Image, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { ContextState } from '../Context/ContextProvider'

import GalleryCard from '../mischallaneous/GalleryCard'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const Photos = () => {

  const toast = useToast()

  const { user, userToken } = ContextState();
  const [postImages, setPostImages] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);

  console.log(postImages);

  const fetchPhotos = async () => {
    try {
      setImgLoading(true)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      }
      const { data } = await axios.get('/api/allposts', config);
      console.log(data);
      data.forEach((d) => {
        if (d.postImages.length !== 0) {
          setPostImages(prevImg =>([
            ...prevImg,
            ...d.postImages
          ]))
          console.log([...d.postImages]);
          console.log('HII');
        }
      })

      setImgLoading(false)
    } catch (error) {
      toast({
        title: 'Error Occured',
        description: error.message,
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        duration: 3000,
        isClosable: true,
      });
      setImgLoading(false)
    }
  }
  useEffect(() => {
    fetchPhotos()
  }, []);
  return (
    <Box
      w={'100%'}
      h='100%'
      bgColor={'#F8F8F8'}
      display={'flex'}
      flexDir={'column'}
      overflowY='scroll'
    >

      <Box
        textAlign={'center'}
        marginTop='5rem'
        color={'#756de1'}
      >
        <Text fontSize={'2xl'} fontWeight={'bold'}>{user ? user.userName : ''}'s Gallery</Text>
      </Box>

      <Grid templateColumns={'repeat(2,2fr)'} gap='1'>
        {
          imgLoading
            ? <Text>Loading...</Text>
            : postImages.map((img, index) => {
              return (
                <GalleryCard
                  key={index}
                  imgUrl={img}
                />
              )
            }
            )

        }
      </Grid>
    </Box>
  )
}

export default Photos
