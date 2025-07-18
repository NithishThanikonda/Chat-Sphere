import { Box, Img } from '@chakra-ui/react'
import React from 'react'
import { CloseButton } from '@chakra-ui/react'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <Box
        px={2}
        py={2}
        borderRadius='lg'
        m={1}
        mb={2}
        fontSize={12}
        backgroundColor = 'cyan'
        cursor='pointer'
        onClick={handleFunction}
        display='flex'
        background=''
    >
        <Img borderRadius='lg' height='1.25rem' src={user.pic} marginRight={1}></Img>{user.name}
        <CloseButton height='1.2rem' fontSize='0.75rem' pl={2}/>
    </Box>
  )
}

export default UserBadgeItem
