import {
  Box,
  Flex,
  Avatar,
  Button,
  useColorModeValue,
  Stack,
  Tooltip,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text
          bgGradient='linear(to-l, #7928CA, #e9d8fd)'
          bgClip='text'
          fontSize='3xl'
          fontWeight='extrabold'
        >
          TO-DO
        </Text>
        <Stack direction={'row'} spacing={7} alignItems='center'>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          {/* TODO change user name */}
          <Tooltip label='Seba'>
            <Avatar
              size={'sm'}
              src={'https://avatars.dicebear.com/api/micah/sebast.svg'}
            />
          </Tooltip>
        </Stack>
      </Flex>
    </Box>
  )
}
