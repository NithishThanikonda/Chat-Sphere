import { useState, React } from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => {
    setShow(!show)
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please enter all the details!.',
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/user/login", { email, password }, config);

      toast({
        title: "Logged in successfully",
        description: `Welcome ${data.name}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // history.push('/chat');
      window.location.href = '/chat';
    } catch (error) {
      toast({
        title: "Invalid Credentials",
        description: `Error : ${error}`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const guestClick = () => {
    setEmail("guest@example.com");
    setPassword("12345");
  }


  return <VStack spacing='5px' color='white' >

    <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      >
      </Input>
    </FormControl>


    <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
        </Input>
        <InputRightElement width='4.5rem'>
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>

    <Button
      color='white'
      bg='rgba(0, 0, 0, 0)'
      boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
      backdropFilter='blur(25px)'
      border='1px solid rgba(0, 0, 0, 0.1)'
      _hover={{ bg: 'rgba(0, 0, 0, 0.5)' }}
      width='100%'
      style={{ marginTop: 15 }}
      onClick={submitHandler}
      isLoading={loading}
    >
      Login

    </Button>

    <Button
      color='white'
      width='100%'
      variant="solid"
      style={{ marginTop: 15 }}
      onClick={guestClick}
      _hover={{bg :"rgba(0, 0, 0, 0.5)"}}
      bg='rgba(0, 0, 0, 0)'
      boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
      backdropFilter='blur(25px)'
      border='1px solid rgba(0, 0, 0, 0.1)'
    >
      Get guest user credentials

    </Button>
  </VStack>
}


export default Login
