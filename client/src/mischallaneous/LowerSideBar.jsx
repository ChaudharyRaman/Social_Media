import React from 'react'
import { IoMdPhotos } from 'react-icons/io'
import { SlPeople } from 'react-icons/sl'
import { MdDynamicFeed } from 'react-icons/md'
import { BsNewspaper } from 'react-icons/bs'
import { TbPlayerPlay } from 'react-icons/tb'
import { AiOutlineUser } from 'react-icons/ai'
import { Avatar, Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


export default function LowerSideBar() {

    return (
        <Box display={'flex'} flexDir='column' justifyContent='center' alignContent={'center'} marginTop='50%' gap={'2rem'}>

            <Box display={'flex'} justifyContent='space-evenly' alignItems={'center'} >
                <Link to={'/user/activity'}>
                    <Box display={'flex'} justifyContent='center' alignItems='center' flexDir={'column'} cursor='pointer'
                        color='gray' _hover={{ color: '#8124e1' }}
                    >
                        <MdDynamicFeed size={'2rem'} />
                        <Text fontWeight={'300'} fontSize='lg' >Activity</Text>
                    </Box>
                </Link>

                <Link to={'/user/activity/photos'}>
                    <Box display={'flex'} justifyContent='center' alignItems='center' flexDir={'column'} cursor='pointer'
                        color='gray' _hover={{ color: '#8124e1' }}
                    >
                        <IoMdPhotos size={'2rem'} />
                        <Text fontWeight={'300'} fontSize='lg' >Photos</Text>
                    </Box>
                </Link>
            </Box>

            <Box display={'flex'} justifyContent='space-evenly' alignItems={'center'} >
                <Link to={'/user/activity/people'}>
                    <Box display={'flex'} justifyContent='center' alignItems='center' flexDir={'column'} cursor='pointer'
                        color='gray' _hover={{ color: '#8124e1' }}
                    >
                        <AiOutlineUser size={'2rem'} />
                        <Text fontWeight={'300'} fontSize='lg' >People</Text>
                    </Box>
                </Link>
                <Link to={'/user/activity/group'}>
                    <Box display={'flex'} justifyContent='center' alignItems='center' flexDir={'column'} cursor='pointer'
                        color='gray' _hover={{ color: '#8124e1' }}
                    >
                        <SlPeople size={'2rem'} />
                        <Text fontWeight={'300'} fontSize='lg' >Group</Text>
                    </Box>
                </Link>
            </Box>
            <Box display={'flex'} justifyContent='space-evenly' alignItems={'center'} >
                <Link to={'/user/activity/watch'}>

                    <Box display={'flex'} justifyContent='center' alignItems='center' flexDir={'column'} cursor='pointer'
                        color='gray' _hover={{ color: '#8124e1' }}
                    >
                        <TbPlayerPlay size={'2rem'} />
                        <Text fontWeight={'300'} fontSize='lg' >Watch</Text>
                    </Box>
                </Link>
                <Link to={'/user/activity/blog'}>

                    <Box display={'flex'} justifyContent='center' alignItems='center' flexDir={'column'} cursor='pointer'
                        color='gray' _hover={{ color: '#8124e1' }}
                    >
                        <BsNewspaper size={'2rem'} />
                        <Text fontWeight={'300'} fontSize='lg' >Blog</Text>
                    </Box>
                </Link>
            </Box>

        </Box>
    )
}
