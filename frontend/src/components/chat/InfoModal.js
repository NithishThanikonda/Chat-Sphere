import { InfoOutlineIcon, ViewIcon } from '@chakra-ui/icons';
import { ModalOverlay, useDisclosure, ModalBody, Button, Modal, ModalContent, ModalHeader, ModalCloseButton, Text, ModalFooter, Card, CardBody, Image, Stack, Heading, Divider, CardFooter, ButtonGroup, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react';

const InfoModal = ({ user, children }) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    return (
        <>
            {/* {children?(
                <span onClick={onOpen}>{children}</span>
            ):(
                <IconButton d={{base : "flex"}} icon = {<ViewIcon/>} onClick={onOpen} />
            )} */}

            <IconButton
                display={{ base: 'flex', md: 'flex' }}
                height='100%'
                bg='rgba(0, 0, 0,0.1)'
                color='white'
                _hover={{ bg: 'rgba(0, 0, 0, 1)' }}
                icon={<InfoOutlineIcon />}
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            ></IconButton>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <Card width='100%'>
                        <ModalCloseButton margin='-0.75rem -1rem' />
                        <CardBody>
                            <Image
                                src={user.pic}
                                alt='{user.name}'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>Name : {user.name}</Heading>
                                <Text>
                                    <b>Email : </b>{user.email}
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2' width='100%' justifyContent='end'>
                                <Button variant='solid' colorScheme='red' onClick={onClose}>
                                    Close
                                </Button>
                                {/* <Button variant='ghost' colorScheme='blue'>
                                    Add to cart
                                </Button> */}
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </ModalContent>
            </Modal>
        </>
    )
}


export default InfoModal;
