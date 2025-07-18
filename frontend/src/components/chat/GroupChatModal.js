import { Box, Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  const handelSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      toast({
        title: 'Error in searching user',
        description: error,
        status: 'warning',
        position: 'top',
        isClosable: true,
        duration: 5000,
      });
    }
  }

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title:  'User already added',
        status: 'warning',
        isClosable: true,
        duration: 5000,
        position: 'top',
      });
      return;
    }

    setSelectedUsers([...selectedUsers,userToAdd]);
  }

  const handleRemove = (deleteUser) => { 
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deleteUser._id))
  }

  const handleSubmit = async () => {
    if(!groupChatName || !selectedUsers){
      toast({
        title : 'Please fill all the fields',
        status : 'warning',
        duration : 5000,
        isClosable : true,
        position : 'top'
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.post('/api/chat/group',{
        name : groupChatName,
        users : JSON.stringify(selectedUsers.map((u)=>u._id)),
      },config);
      setChats([data,...chats]); //group will be added top of chats
      onClose();
      toast({
        title : 'New Group Chat created',
        status : 'success',
        duration : 5000,
        isClosable : true,
        position : 'top',
      })
    } catch (error) {
      console.log(error);
      toast({
        title : 'Group Chat not created',
        status : 'error',
        duration : 5000,
        isClosable : true,
        position : 'top',
      })
    }
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignItems='center' display='flex' w='100%' justifyContent='center' fontSize='1.5rem'>Create a group</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel >Group name</FormLabel>
              <Input placeholder='Group name' onChange={(e) => setGroupChatName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Users</FormLabel>
              <Input placeholder='Add users to group' onChange={(e) => handelSearch(e.target.value)} />
            </FormControl>
            {/* selected users */}
            <Box w='100%' display='flex' flexWrap='wrap'>

              {selectedUsers.map((u) => (
                <UserBadgeItem key={user._id} user={u} handleFunction={() => handleRemove(u)} />
              ))}
            </Box>
            {/* render searched useres */}
            {loading ? (<Spinner ml='auto' display='flex' />) : (
              searchResults?.slice(0, 3).map((user) => (
                <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Create Group
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal
