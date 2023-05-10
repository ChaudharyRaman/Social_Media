import { Box, ListItem, UnorderedList } from '@chakra-ui/react'
import React from 'react'

const ProfileInfo = () => {
    return (
        <Box flex={2}
            borderRight='3px solid #F3F3F3'
            display={'flex'}
            flexDir='column'
            gap={'2rem'}
            marginTop='1rem'
        >
            <UnorderedList listStyleType={'none'} display='flex' gap='2rem'
                fontFamily='cursive'
                fontSize={'xl'}
                borderBottom='5px solid #F3F3F3'
                paddingBottom={'1rem'}
                justifyContent='space-between'
            >
                <ListItem cursor={'pointer'}>
                    View
                </ListItem>
                <ListItem cursor={'pointer'}>
                    Edit
                </ListItem>
                <ListItem cursor={'pointer'}>
                    Add Profile
                </ListItem>
                <ListItem cursor={'pointer'}>
                    Add Background Photo
                </ListItem>
            </UnorderedList>

            <Box>

            </Box>

        </Box>
    )
}

export default ProfileInfo
