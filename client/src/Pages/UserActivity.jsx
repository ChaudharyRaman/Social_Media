import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

export default function UserActivity() {
  return (
    <Box maxW={'100vw'} height={'100vh'} display='flex' bgColor={'lightgreen'}>

      {/* SIde BAR */}
      <Sidebar />
      {/* ---------------------------- */}


      {/* Right Side */}
      <Box flex={8} w='100%' h={'100%'} display='flex' flexDir={'column'} backgroundColor='#fefefe'>

        {/* Navbar */}
        <Navbar />
        {/* ---------------------------- */}
        <Box display={'flex'} flex={9} w='100%' h={'80%'}>

          <Box flex={7} w='100%' h={'100%'}>
            {/* THis is feed part.....  */}
            {/* <Feed /> */}
            <Outlet />
          </Box>

          <Box flex={3}>
            Data
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
