import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import Login from '../Components/Login'

export default function HomePage() {
    return (
        
        <Box height='100vh' display={'flex'} justifyContent='center' >
            <Container maxW={'3xl'} centerContent justifyContent={'center'} height={'70%'} alignSelf={'center'} >
                <Box
                    width={'100%'}
                    display={'flex'}
                    justifyContent='center'
                    height={'100%'}
                >
                    <Box
                        backgroundColor={'rgba(105,32,186,0.8)'}
                        flex={1}
                        display={'flex'}
                        flexDir='column'
                        justifyContent='center'
                        // alignItems={'center'}
                        gap={'6'}
                        opacity={'0.7'}
                        color='white'
                        pl={6}
                    >
                            <Text fontSize={'2xl'} fontWeight='bold' >Join The Club</Text>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus
                            </Text>
                            <Box display={'flex'} flexDir='column' gap={1}>
                                <Box>Community</Box>
                                <Box>Chat With Friends</Box>
                                <Box>Make Groups</Box>
                            </Box>

                    </Box>
                    <Box
                        height={'100%'}
                        flex={1}
                        p={5}
                        display={'flex'}
                        flexDir={'column'}
                        w={'100%'}
                        backgroundColor='white'
                    >
                        <Tabs variant={'soft-rounded'} colorScheme='purple' >
                            <TabList>
                                <Tab w={'50%'} >Login</Tab>
                                <Tab w={'50%'}>SignUp</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {/* Login Component!!! */}
                                    <Login />
                                </TabPanel>
                                <TabPanel>
                                    {/* Signup Component!!! */}
                                    SignUp Panel
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
