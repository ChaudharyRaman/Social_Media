import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const ProfileLeft = () => {
    return (
        <Box flex={1} alignItems='flex-end' display='flex' gap={'2rem'} flexDir={'column'}
            borderRight='3px solid #F3F3F3'
            paddingRight={'2rem'}
        >
            <Box display={'flex'} gap='2rem'
                paddingBottom={'2rem'}
                borderBottom='4px solid #F3F3F3'
            >
                <Box display={'flex'} flexDir='column' textAlign={'center'} >
                    <Text fontSize={'2xl'}  >1</Text>
                    <Text fontSize={'1xl'} >Followers</Text>
                </Box>
                <Box display={'flex'} flexDir='column' textAlign={'center'} >
                    <Text fontSize={'2xl'}  >1</Text>
                    <Text fontSize={'1xl'} >Followers</Text>
                </Box>
            </Box>
            <Box display={'flex'} flexDir='column' gap={'2rem'} justifyContent={'center'} alignItems='center'>
                <Text fontFamily={'cursive'} fontSize='1.5rem'>My Photos</Text>
                <Box width={'10rem'} height='10rem' backgroundColor={'red.300'}>

                </Box>
            </Box>
        </Box>
    )
}

export default ProfileLeft
