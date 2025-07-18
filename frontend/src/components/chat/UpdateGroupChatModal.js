import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain , fetchMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoad, setRenameLoad] = useState(false);
    const toast = useToast();
    const { selectedChat, setSelectedChat, selectedUsers, setSelectedUsers, user } = ChatState();

    const handleGroup = async (userToAdd) => {
        if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
            toast({
                title: 'User already added',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                position: 'top',
            });
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id && user._id !== userToAdd._id) {
            toast({
                title: 'Only admin can add user or user already added',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                position: 'top',
            });
            return;
        }
        try {
            setLoading(true);

            const config = {
                headers:
                {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.put('/api/chat/addToGroup',
                { chatId: selectedChat._id, userId: userToAdd._id }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: 'Error in adding user to group',
                description: error.message,
                status: 'error',
                position: 'top',
                isClosable: true,
                duration: 5000
            })
            setLoading(false);
        }
    }

    const handleRemove = async (deleteUser) => {
        if (selectedChat.groupAdmin._id !== user._id && user._id !== deleteUser._id) {
            toast({
                title: 'Only admin can remove user',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                position: 'top',
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers:
                {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.put('/api/chat/removeFromGroup',
                { chatId: selectedChat._id, userId: deleteUser._id }, config);

            deleteUser._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);

        } catch (error) {
            toast({
                title: 'Error in removing user from group',
                description: error.message,
                status: 'error',
                position: 'top',
                isClosable: true,
                duration: 5000
            })
            setLoading(false);
        }
    }

    const handleRename = async () => {
        if (!groupChatName) {
            toast({
                title: 'Group name cannot be empty',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                position: 'top',
            });
            return;
        }
        try {
            setRenameLoad(true);
            const config = {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put(`/api/chat/rename`, { chatId: selectedChat._id, chatName: groupChatName }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoad(false);
        } catch (error) {
            toast({
                title: 'Error in renaming group',
                description: error.message,
                status: 'error',
                position: 'top',
                isClosable: true,
                duration: 5000
            })

            setGroupChatName("");
        }
    }

    const handleSearch = async (query) => {
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

    return <div>
        <IconButton
            display={{ base: 'flex', md: 'flex' }}
            height='100%'
            bg='rgba(0, 0, 0,0)'
            color='white'
            _hover={{ bg: 'rgba(0, 0, 0, 0.5)' }}
            icon={<SettingsIcon />}
            onClick={onOpen}
        ></IconButton>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize='3xl' display='flex' justifyContent='center'>{selectedChat.chatName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box width='100%' display='flex' flexWrap='wrap' p={2}>
                        {selectedChat.users.map((u) => (
                            <UserBadgeItem key={user._id} user={u} handleFunction={() => handleRemove(u)} />
                        ))}
                    </Box>
                    <FormControl display='flex' my={3}>
                        <Input
                            placeholder='Enter new group name'
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)}
                        />
                        <Button
                            variant='solid'
                            bg='green.500'
                            ml={1}
                            _hover={{ bg: 'green.600' }}
                            isLoading={renameLoad}
                            onClick={handleRename}
                        >
                            Update
                        </Button>
                    </FormControl>
                    <FormControl display='flex'>
                        <Input
                            placeholder='Add user to group'
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </FormControl>
                    {loading ? (<Spinner ml='auto' display='flex' />) : (
                        searchResults?.slice(0, 3).map((user) => (
                            <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                        ))
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button bg='red' _hover={{ bg: 'red.500' }} mr={3} onClick={() => handleRemove(user)}>
                        Exit Group
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
}

export default UpdateGroupChatModal
