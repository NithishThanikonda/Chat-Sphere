import React, { useState, useEffect } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './chat/ChatLoading';
import { GetSender } from '../config/ChatLogic';
import GroupChatModal from './chat/GroupChatModal';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, chats, setChats, user, setSelectedChat } = ChatState();
  const toast = useToast();
  // const GetSender = (loggedUser, users) => {
  //   return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  // }
  const getChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error in getting the users",
        description: error,
        status: "errror",
        isClosable: true,
        position: "top",
        duration: 5000,
      })
    }

  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    getChats();

    // Polling: Fetch chats every 5 seconds
    const intervalId = setInterval(() => {
      getChats();
    }, 100);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchAgain])

  return <Box
    display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
    flexDir="column"
    alignItems="center"
    p={3}
    bg='rgba(0, 0, 0, 0.2)'
    boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
    backdropFilter='blur(25px)'
    border='1px solid rgba(0, 0, 0, 0.1)'
    justifyContent='space-between'
    w={{ base: "100%", md: "25%" }}
    borderRadius='lg'
    borderWidth='1px'
  >
    <Box
      pb={3}
      px={3}
      fontSize={{ base: "1rem", md: "1.5rem" }}
      display='flex'
      w='100%'
      color='white'
      justifyContent='space-between'
      alignItems='center'
    >
      My Chats
      <GroupChatModal>

        <Button
          display='flex'
          color='white'
          bg='rgba(0, 0, 0,0.1)'
          boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
          backdropFilter='blur(25px)'
          border='1px solid rgba(0, 0, 0, 0.1)'
          fontSize={{ base: "17px", md: "10px", lg: '17px' }}
          rightIcon={<AddIcon />}
          _hover={{ bg: 'rgba(0, 0, 0, 0.5)' }}
        >
          New Group Chat
        </Button>
      </GroupChatModal>
    </Box>
    <Box
      display='flex'
      flexDir='column'
      p={3}
      width='100%'
      h='100%'
      borderRadius='lg'
      overflowY='hidden'
    >
      {chats ? (
        <Stack overflowY='hidden'>
          {chats.map((chat) => (
            <Box
              onClick={() => setSelectedChat(chat)}
              cursor='pointer'
              w='100%'
              color={selectedChat === chat ? 'white' : 'white'}
              px={3}
              py={2}
              display='flex'
              flexDir='column'
              justifyContent='center'
              key={chat._id}
              borderRadius='lg'
              bg={selectedChat === chat ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0,0,0,0)'}
              backdropFilter='blur(25px)'
              border='1px solid rgba(0, 0, 0, 0.1)'
              _hover={{ bg: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
            >
              <Text>
                {!chat.isGroupChat ? user && GetSender(loggedUser, chat.users) : chat.chatName}

              </Text>
              {chat.latestMessages && (
                <Text fontSize="xs" display='flex'>
                  <b>
                    {chat.latestMessages.sender.name === user.name ? "You" : chat.latestMessages.sender.name}: </b>
                  {chat.latestMessages.content.length > 50
                    ? chat.latestMessages.content.substring(0, 51) + "..."
                    : chat.latestMessages.content}
                </Text>
              )}

            </Box>
          ))}
        </Stack>
      ) : (<ChatLoading />)}

    </Box>
  </Box>
}

export default MyChats
