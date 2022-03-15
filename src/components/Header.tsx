import { Text, useColorModeValue, useBreakpointValue } from '@chakra-ui/react'

const Header = () => {
  return (
    <Text
      color={useColorModeValue('purple.700', 'purple.100')}
      fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
      fontWeight='extrabold'
      pb={3}
    >
      Rocket Lab tasks
    </Text>
  )
}

export default Header
