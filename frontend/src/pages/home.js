import React, { useEffect } from 'react';
import { Container, Box, Text, Button, useTab, useMultiStyleConfig, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Home = () => {
    const history = useHistory();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) {
            history.push("/chat");
        }
    }, [history]);

    const CustomTabs = () => {
        const CustomTab = React.forwardRef((props, ref) => {
            // 1. Reuse the `useTab` hook
            const tabProps = useTab({ ...props, ref });
            const isSelected = !!tabProps['aria-selected'];

            // 2. Hook into the Tabs `size`, `variant`, props
            const styles = useMultiStyleConfig('Tabs', tabProps);

            return (
                <Button __css={styles.tab} {...tabProps}>
                    <Box as='span' mr='2'>
                        {isSelected ? '😎' : '😃'}
                    </Box>
                    {tabProps.children}
                </Button>
            );
        });

        // Additional logic for rendering tabs and handling state can be added here

        return (
            <Box >
                <Tabs align='center' isFitted variant='' color='white'>
                    <TabList>
                        <CustomTab className="authButton">Log-in</CustomTab>
                        <CustomTab className="authButton">Sign-Up</CustomTab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {/* login */}
                            <Login></Login>
                        </TabPanel>
                        <TabPanel>
                            {/* signup */}
                            <Signup></Signup>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        );
    };

    return (
        <Container maxW='xl' centerContent>
            <Box
                bg='rgba(0, 0, 0, 0)'
                boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
                backdropFilter='blur(25px)'
                border='1px solid rgba(0, 0, 0, 0.1)'
                display="flex"
                justifyContent="center"
                p={3}
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="2rem" color='white' fontFamily="monoton">
                    Chat Sphere
                </Text>
            </Box>
            <Box
                bg='rgba(0, 0, 0, 0)'
                boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
                backdropFilter='blur(25px)'
                border='1px solid rgba(0, 0, 0, 0.1)'
                backdropBlur={5}
                w="100%"
                p={4}
                borderRadius="lg"
                borderWidth="1px"
                marginBottom='2rem'>
                {/* Render your custom tabs component */}
                <CustomTabs />
                {/* Add more content as needed */}
            </Box>
        </Container>
    );
};

export default Home;
