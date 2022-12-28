import React from 'react'
import { Avatar, Box, Button, FormControl, Grid, GridItem, Input, Text, useToast } from '@chakra-ui/react'
import profilePic from '../Images/profilePic.png'
import { ContextState } from '../Context/ContextProvider'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const FollowCard = ({ people }) => {

    const toast = useToast();

    const { user,userToken, fetchAgain, setFetchAgain } = ContextState();
    const [peopleFollowers,setPeopleFollowers] = useState([{}]);
    // console.log(people);

    const hasFollowUser = () => {
        // return people.followers.find((p) => p._id === user?._id)
        return peopleFollowers.find((people) => people._id === user?._id)
    }

    const followHandler = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
            }
        };
        try {
            if (hasFollowUser()) {
                const {data} = await axios.post(`/api/users/${people.user._id}/unfollow`, {}, config);
                // console.log('unfollowed');
                // console.log(data);
                setPeopleFollowers(data.followers);
                setFetchAgain(!fetchAgain);
            } else {
                const { data } = await axios.post(`/api/users/${people.user._id}/follow`, {}, config);
                // console.log('followed');
                // console.log(data);
                setPeopleFollowers(data.followers);
                setFetchAgain(!fetchAgain);
            }
        } catch (error) {
            toast({
                title: `Error Occured`,
                description: `${error.message}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            });
        }
    }

    useEffect(() => {
        setPeopleFollowers(people.followers);
    },[])

    return (
        <GridItem w='15rem' display={'flex'} flexDir='column'
            alignItems={'center'}
            borderRadius='xl'
            padding={'5'}
            gap={3}
            boxShadow={'5px 5px 20px #bcb5b5'}
        >
            <Avatar size={'xl'} name={'Profile'} src={profilePic} />

            <Text fontWeight={'bold'} fontSize='lg' marginTop={'0.7rem'} >
                {people.user.username}
            </Text>

            <Box display={'flex'} gap='3'>
                <Box display={'flex'} flexDir='column' justifyContent='center' alignItems={'center'}>
                    <Text fontWeight={'bold'}>
                        {peopleFollowers.length}
                    </Text>
                    <Text fontWeight={'500'} color='gray' >Follower</Text>
                </Box>
                <Box display={'flex'} flexDir='column' justifyContent='center' alignItems={'center'}>
                    <Text fontWeight={'bold'}>
                        {people.following.length}
                    </Text>
                    <Text fontWeight={'500'} color='gray' >Following</Text>
                </Box>
            </Box>
            <Box display={'flex'} gap={3}>
                <Button colorScheme='purple' variant='solid'
                    onClick={() => { followHandler() }}
                >
                    {hasFollowUser() ? 'Unfollow' : 'Follow'}
                </Button>
                <Button colorScheme='purple' variant='solid'>
                    View User
                </Button>
            </Box>
        </GridItem>
    )
}

export default FollowCard
