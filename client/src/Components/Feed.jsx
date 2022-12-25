import { Box } from '@chakra-ui/react'
import React from 'react'
import Post from '../mischallaneous/Post'

export default function Feed() {
  return (
    <Box w={'100%'} h={'100%'} display={'flex'}gap={'2rem'} flexDir='column' alignItems={'center'} p={'6rem'}>
        <Post />
        <Post />
        <Post />
    </Box>
  )
}
