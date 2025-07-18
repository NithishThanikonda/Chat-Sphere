import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Toast, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { BellIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import ChatLoading from '../chat/ChatLoading';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import { GetSender } from '../../config/ChatLogic';
import NotificationBadge, { Effect } from 'react-notification-badge';

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const history = useHistory();
    const toast = useToast();
    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();

    // logout
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    // search Handler
    const searchHandler = async () => {
        setLoading(true);
        // search user
        if (!search) {
            toast({
                title: "Please enter a name or email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            };

            const { data } = await axios.get(`/api/user/?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error",
                description: error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            })
        }
        setLoading(false);
    }

    // access chat function
    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
            };
            const { data } = await axios.post("/api/chat", { userId }, config);
            if (!chats.find((chat) => chat._id === data._id)) {
                setChats([data, ...chats]);
            }
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error in accessing chat",
                description: error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        };
    };
    return <>
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            w='99%'
            borderWidth='0.5rem'
            borderRadius='lg'
            my={2}
            mx='0.5%'
            px={5}
            bg='rgba(0, 0, 0, 0)'
            boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
            backdropFilter='blur(25px)'
            border='1px solid rgba(0, 0, 0, 0.1)'
        >
            <Tooltip label="Search users to chat" hasArrow placement='bottom'>
                <Button ref={btnRef} color='white' onClick={onOpen} variant="ghost" _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <Text color='white' display={{ base: "none", md: "flex" }} px={4} fontSize='1.5xl'>Search User</Text> {/* in small screens Search will not be visible */}
                </Button>
            </Tooltip>

            <Text color='white' fontSize={{base:"1rem", md:"2rem"}} fontFamily='monoton'>
                Chat Sphere
            </Text>
            <div>
                <Menu>
                    <MenuButton
                        color='white'
                        p={2}>
                        <NotificationBadge count={notification.length} effect = {Effect.sclae} />
                        <BellIcon fontSize='2xl' m={2} />
                    </MenuButton>
                    <MenuList
                        style={{
                            position: 'relative',
                            top: '-3.5rem',
                            right: '2.5rem'
                        }}
                        pl={2}
                        bg='rgba(0, 0, 0, 0)'
                        boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
                        backdropFilter='blur(25px)'
                        border='1px solid rgba(0, 0, 0, 0.1)'
                        color='white'
                        display='flex'
                        flexDir='row'
                        overflowX={{ base: 'scroll', md: 'scroll' }}
                    >
                        {!notification.length && "No new message"}
                        {notification.map((notif) => (
                            <MenuItem
                                bg='rgba(0, 0, 0, 0)'
                                boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
                                backdropFilter='blur(25px)'
                                border='1px solid rgba(0, 0, 0, 0.1)'
                                color='white'
                                key={notif._id} onClick={() => {
                                    setSelectedChat(notif.chat);
                                    setNotification(notification.filter((n) => notif !== n));
                                }}>

                                {notif.chat.isGroupChat ? `${notif.chat.chatName}` : `${GetSender(user, notif.chat.users)}`}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton
                        as={Button}
                        bg='rgba(0, 0, 0, 0)'
                        boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
                        backdropFilter='blur(25px)'
                        border='1px solid rgba(0, 0, 0, 0.1)'
                        _hover={{ bg: 'rgba(0, 0, 0, 0.5)', border: '1px solid white' }}
                        rightIcon={<ChevronLeftIcon color='white' />}>
                        <Avatar size='sm' name={user.name} src={user.pic} />
                    </MenuButton>
                    <MenuList
                    >
                        <ProfileModal user={user} />
                        <MenuDivider />
                        <MenuItem backdropBlur={100} width='100%' fontWeight='500' justifyContent='center' onClick={logoutHandler}>LogOut</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>

        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent
                bg='rgba(0, 0, 0, 0)'
                boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
                backdropFilter='blur(50px)'
                border='1px solid rgba(0, 0, 0, 0.1)'>
                <DrawerCloseButton color='white' />
                <DrawerHeader color='white'>Search users</DrawerHeader>

                <DrawerBody>
                    <Box display='flex' pb={2}>
                        <Input bg='rgba(0,0,0,0.2)' boxShadow='0 4px 30px rgba(0, 0, 0, 1)' color='white' placeholder='Search by name or email' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Button border='1px solid white' bg='rgba(0,0,0,0.2)' boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
                            backdropFilter='blur(30px)' _hover={{ bg: 'rgba(0,0,0,0.3)' }} color='white' onClick={searchHandler}>Search</Button>
                    </Box>

                    {loading ? <ChatLoading /> : (
                        searchResult?.map(user => (
                            <UserListItem
                                key={user._id}
                                user={user}
                                handleFunction={() => accessChat(user._id)}
                            />
                        ))
                    )
                    }
                    {loadingChat && <Spinner ml='auto' display='flex' />}
                </DrawerBody>

                <DrawerFooter>
                    <Button backdropFilter='blur(30px)' _hover={{ bg: 'rgba(0,0,0,0.3)' }} color='white' variant='outline' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}

export default SideDrawer
