import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function Usercard() {
  return (
    <Box
    display={'flex'}
    flexDir='column'
    alignItems={'center'}
    bgColor={'white'}
    marginTop='10'
    width={'70%'}
    height={'70%'}
    p='5'
    borderRadius={'xl'}
>
    <Avatar size={'lg'} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
    <Text fontWeight={'bold'} fontSize='lg' marginTop={'0.7rem'} > USER</Text>
    <Box display={'flex'} gap={'2rem'}
        margin='2rem 0'
    >
        <Box flex={1} display='flex' justifyContent={'center'} alignItems='center' flexDir={'column'}>
            <Text fontWeight={'bold'}>0</Text>
            <Text fontWeight={'300'} color='gray' >Friend</Text>
        </Box>
        <Box flex={1} display='flex' justifyContent={'center'} alignItems='center' flexDir={'column'}>
            <Text fontWeight={'bold'}>0</Text>
            <Text fontWeight={'300'} color='gray' >Group</Text>
        </Box>
    </Box>
</Box>

  )
}
