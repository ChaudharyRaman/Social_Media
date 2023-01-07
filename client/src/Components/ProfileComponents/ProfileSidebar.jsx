import { Box, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsNewspaper } from 'react-icons/bs'
import { IoMdPhotos } from 'react-icons/io'
import { MdDynamicFeed } from 'react-icons/md'
import { SlPeople } from 'react-icons/sl'
import { TbPlayerPlay } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const ProfileSidebar = () => {
    return (
        <Box
            display={'flex'}
            flexDir='column'
            w={'6rem'}
            h='100%'
            bgColor='#e4e7ef'
            position={'fixed'}
            zIndex='99'
        >
            <Box
                w={'100%'}
                h='6rem'
                bgColor={'#474a58'}
                color='white'
                display='flex'
                alignItems='center'
                justifyContent='center'
                fontSize={'2xl'}
            >
                {/* Profile Image */}
                LOGO
            </Box>
            <Box
                w={'100%'}
                height='100%'
                display={'flex'} flexDirection={'column'}
                justifyContent='space-evenly' alignItems={'center'}
            >
                <Tooltip hasArrow size={'2rem'} label='Feed' bg='gray.300' color='black' placement='right' >
                    <Link to={'/user/activity'} >
                        <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                            <MdDynamicFeed size={'2rem'} style={{}} />
                        </Box>
                    </Link>
                </Tooltip>
                <Tooltip hasArrow size={'2rem'} label='Photos' bg='gray.300' color='black' placement='right' >
                    <Link to={'/user/activity/photos'} >
                        <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                            <IoMdPhotos size={'2rem'} />
                        </Box>
                    </Link>
                </Tooltip>
                <Tooltip hasArrow size={'2rem'} label='Groups' bg='gray.300' color='black' placement='right' >
                    <Link to={'/user/activity/group'} >
                        <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                            <SlPeople size={'2rem'} />
                        </Box>
                    </Link>
                </Tooltip>
                <Tooltip hasArrow size={'2rem'} label='People' bg='gray.300' color='black' placement='right' >
                    <Link to={'/user/activity/people'} >
                        <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                            <AiOutlineUser size={'2rem'} />
                        </Box>
                    </Link>
                </Tooltip>
                <Tooltip hasArrow size={'2rem'} label='Watch' bg='gray.300' color='black' placement='right' >
                    <Link to={'/user/activity/watch'} >
                        <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                            <TbPlayerPlay size={'2rem'} />
                        </Box>
                    </Link>
                </Tooltip>
                <Tooltip hasArrow size={'2rem'} label='News' bg='gray.300' color='black' placement='right' >
                    <Link to={'/user/activity'} >
                        <Box padding={3} borderRadius='2xl' cursor={'pointer'} transition='0.3s' _hover={{ color: 'white', bgColor: '#9f56e9' }}>
                            <BsNewspaper size={'2rem'} />
                        </Box>
                    </Link>
                </Tooltip>

            </Box>
        </Box>
    )
}

export default ProfileSidebar
