import {createContext,useContext,useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';

const ChatContext = createContext();

// chat priovider which wraps all over the app
const ChatProvider = ({children}) => {
    const [user,setUser] = useState();
    const [selectedChat,setSelectedChat] = useState(); // to store selected chat [user or group chat
    const [chats,setChats] = useState([]);
    const [notification,setNotification] = useState([]);
    const history = useHistory(); // to navigate between pages
    

    useEffect(() => {
        const userData =  JSON.parse(localStorage.getItem("userInfo"));
        setUser(userData);

        if(!userData){
            history.push("/");
        }
    },[history]);
    return (
        <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats,notification,setNotification}}>
            {children}
        </ChatContext.Provider>
    );
};

// to make state accessible to other aaps
export const ChatState = () =>{
    return useContext(ChatContext);
}


export default ChatProvider;