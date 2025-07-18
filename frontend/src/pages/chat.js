import React, {  useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import SideDrawer from '../components/chat/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import { Box } from '@chakra-ui/react';

const Chat = () => {
  // const [chats, setChats] = useState([]);
  // const fetchChats = async () => {
  //   try {
  //     const response = await axios.get('/api/chat');
  //     setChats(response.data); // Use response.data to set the state with the array of chats
  //   } catch (error) {
  //     console.error('Error fetching chats:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);
  const [fetchAgain,setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (

    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row-reverse"
        w="100%"
        h="90vh"
        p="10px"
        
      >
        {user && <ChatBox fetchAgain = {fetchAgain} setFetchAgain = {setFetchAgain} />}
        {user && <MyChats fetchAgain = {fetchAgain}  />}

      </Box>
    </div>

  );
};

export default Chat;
