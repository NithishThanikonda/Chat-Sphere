import React from 'react'
import { Avatar, Box, Text } from '@chakra-ui/react';

const UserListItem = ({ user,handleFunction }) => {
    if(!user) return (
        <div>
            <Text>No user found</Text>
        </div>
    );
    return (
        <div>
            <Box
                onClick={handleFunction}
                cursor="pointer"
                bg="rgba(0,0,0,0.2)"
                color='white'
                boxShadow='0 4px 30px rgba(0, 0, 0, 0.75)'
                backdropFilter='blur(30px)'
                _hover={{
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid white",
                    color: "white"
                }}
                w="100%"
                display="flex"
                px={3}
                py={2}
                mb={2}
                borderRadius="lg"
            >
                <Avatar
                    mr={2}
                    size="sm"
                    cursor="pointer"
                    name={user.name}
                    src={user.pic}
                />
                <Box>
                    <Text>{user.name}</Text>
                    <Text fontSize="xs">
                        {user.email}
                    </Text>
                </Box>
            </Box>
        </div>
    )
}

export default UserListItem
