import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import Post from '../mischallaneous/Post'

export default function Feed() {

  

  return (
    <Box w={'100%'} h={'100%'} display={'flex'}gap={'2rem'} flexDir='column' alignItems={'center'} overflowY='scroll' bg='#F8F8F8' p={'6rem'}>
        
        <Stack>
          <Post />
          <Post />
          <Post />
        </Stack>

    </Box>
  )
}
