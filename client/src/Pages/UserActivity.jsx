import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

export default function UserActivity() {
  return (
    <Box maxW={'100vw'} height={'100vh'} display='flex' bgColor={'lightgreen'}>

      <Box flex={2} w={'100%'} backgroundColor='#f1f2f4'>
        {/* SIde BAR */}
        <Sidebar />
      </Box>
      {/* ---------------------------- */}
      {/* Right Side */}
      <Box flex={8} w='100%' h={'100%'} display='flex' flexDir={'column'} backgroundColor='#fefefe'>
        <Box flex={1}>
          {/* Navbar */}
          <Navbar />
        </Box>
        <Box display={'flex'} flex={9} w='100%' h={'80%'}>
          <Box flex={7} w='100%' h={'100%'}>
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
