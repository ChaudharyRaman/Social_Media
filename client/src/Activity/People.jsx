import { Avatar, Box, Button, FormControl, Grid, GridItem, Input, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { ContextState } from '../Context/ContextProvider'
import FollowCard from '../mischallaneous/FollowCard'


const People = () => {

  const toast = useToast();
  const { user, userToken } = ContextState();

  const [searchUser, setSearchUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [userLoading, setUserLoading] = useState(false);


  const searchHandler = () => { }

  const fetchUsers = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    };
    try {
      setUserLoading(true);

      const { data } = await axios.get('/api/allusers',config);

      setUsers(data);
      setUserLoading(false)
    } catch (error) {
      toast({
        title: `Error Occured`,
        description: 'Failed To Fetch Posts ' + error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right'
      });
      setUserLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <Box w={'100%'}
      h={'100%'}
      display='flex'
      flexDir='column'
      overflowY='scroll'
      bg='#F8F8F8'
      p={'5rem'}>

      <Box display={'flex'} gap={'3'} marginBottom={'3rem'} >
        <FormControl width={'40%'} >
          <Input
            rounded={'2xl'}
            placeholder='Search User Here!'
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </FormControl>
        <Button
          width={'10%'}
          rounded='full'
          colorScheme={'purple'}
          onClick={() => { searchHandler() }}
          isLoading={isLoading}
        >
          <BiSearchAlt2 size={'md'} />
        </Button>
      </Box>

      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        {/* <FollowCard /> */}
        {
          userLoading ? (
            <Text>Loading...</Text>
          ) : (
            users?.map((user) => (
              <FollowCard key={user._id} people={user} />
            ))
          )
        }
      </Grid>

    </Box>
  )
}

export default People
