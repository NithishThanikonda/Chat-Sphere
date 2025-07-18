import { useState, React } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; // Import the axios package

const Signup = () => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please select a valid image!.',
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg" || pics.type === "image/webp") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat_sphere");
      data.append("cloud_name", "chatsphere");
      fetch("https://api.cloudinary.com/v1_1/chatsphere/image/upload", {
        method: "post",
        body: data,
      }).then(res => res.json()).then((data) => {
        setPic(data.url.toString());
        setLoading(false);
        console.log(`Image uploaded successfully : ${data.url.toString()}`);
      }).catch(err => {
        console.log(err);
        setLoading(false);
      });
    } else {
      setLoading(false);
      toast({
        title: 'Please select a valid image!.',
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      return;
    };
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Please enter all the details!.',
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    //Check password match
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match!',
        isClosable: 'true',
        position: 'top',
        duration: 9000,
        status: 'warning',
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log(`Name : ${name} Email : ${email} Password : ${password} Pic : ${pic}`);
      try {
        const { data } = await axios.post("/api/user", { name, email, password, pic }, config); // Use axios to make the POST request    
        toast({
          title: 'Registration Successful!',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        // history.push('/chat');
        window.location.href = '/chat';
      } catch (error) {
        console.log(error);
        toast({
          title: 'Error occurred during signup! Please try again',
          description: `Error may occur due to the following reason: User with the same mail id exists${error}`,
          status: 'warning',
          position: 'top',
          isClosable: true,
          duration: 9000,
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: 'Error occured during sigup! Please try again',
        description: `${error}`,
        status: 'warning',
        position: 'top',
        isClosable: true,
        duration: 9000,
      });
      setLoading(false);
    };

  };

  return <VStack spacing='5px' color='white'>

    <FormControl id='name' isRequired>
      <FormLabel>Name</FormLabel>
      <Input
        placeholder='Enter your name'
        onChange={(e) => setName(e.target.value)}
      >
      </Input>
    </FormControl>


    <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        type='email'
        placeholder='Enter your email'
        onChange={(e) => setEmail(e.target.value)}
      >
      </Input>
    </FormControl>


    <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          type={show1 ? "text" : "password"}
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
        >
        </Input>
        <InputRightElement width='4.5rem'>
          <Button h="1.75rem" size="sm" onClick={handleClick1}>
            {show1 ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>


    <FormControl id='confirmPassword' isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
        <Input
          type={show2 ? "text" : "password"}
          placeholder='Re-enter your password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        >
        </Input>
        <InputRightElement width='4.5rem'>
          <Button h="1.75rem" size="sm" onClick={handleClick2}>
            {show2 ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>


    <FormControl id='pic'>
      <FormLabel>Upload your picture</FormLabel>
      <Input
        type='file'
        p={1.5}
        accept='image/*'
        onChange={(e) => postDetails(e.target.files[0])}
      >
      </Input>
    </FormControl>

    <Button
      width='100%'
      style={{ marginTop: 15 }}
      onClick={submitHandler}
      isLoading={loading}
      color='white'
      bg='rgba(0, 0, 0, 0)'
      boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
      backdropFilter='blur(25px)'
      border='1px solid rgba(0, 0, 0, 0.1)'
      _hover={{ bg: 'rgba(0, 0, 0, 0.5)' }}
    >
      Sign Up

    </Button>
  </VStack>
}

export default Signup
