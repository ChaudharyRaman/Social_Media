import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'

export default function UserActivity() {
  return (
    <Box maxW={'100vw'} height={'100vh'} display='flex' bgColor={'lightgreen'}>

      <Box flex={2} backgroundColor='#f1f2f4'>
        {/* SIde BAR */}
        <Box w={'100%'} backgroundColor='#3c3e4a' h={'40%'}></Box>
      </Box>
      {/* ---------------------------- */}
      {/* Right Side */}
      <Box flex={8} display='flex' flexDir={'column'} backgroundColor='#fefefe'>
        <Box flex={1}>
          {/* Navbar */}
          <Navbar />
        </Box>
        <Box display={'flex'} flex={9}>
          <Box flex={7}>
            <Feed />
          </Box>
          <Box flex={3}>
            Data
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
