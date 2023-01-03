import { Avatar, Box, color, Text } from '@chakra-ui/react'
import React from 'react'
import LowerSideBar from '../mischallaneous/LowerSideBar'
import Usercard from '../mischallaneous/Usercard'



export default function Sidebar() {
    return (
        <Box flex={2} w={'100%'} backgroundColor='#f1f2f4'>

            <Box w={'100%'} h='100%' overflowY={'scroll'}>
                {/* Brown part */}
                <Box w={'100%'} display='flex' flexDirection={'column'} alignItems={'center'} backgroundColor='#3c3e4a' h={'40%'}
                    overflow='visible'
                >
                    <Text color={'white'} fontSize={'3xl'} marginTop='40%'>LOGO</Text>
                    <Usercard />
                </Box>

                {/* White Part */}
                <LowerSideBar />
            </Box>
        </Box>

    )
}
