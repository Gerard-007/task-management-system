import {Text, Box, Container, Flex, useColorModeValue, useColorMode, Button} from "@chakra-ui/react";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";

export const Navbar = () => {
    const { colorMode, toggleColorMode} = useColorMode();

    return (
        <Container maxW={"900px"}>
            <Box bg={useColorModeValue("gray.400", "gray.700")} px={4} my={4} borderRadius={"5"}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    {/*LEFT SIDE*/}
                    <Flex justifyContent={"center"} alignItems={"center"} gap={3} display={{base: "none", sm: "flex"}}>
                        <Text fontSize={"40"}>
                            Daily Tasks
                        </Text>
                    </Flex>


                    {/*LEFT SIDE*/}
                    <Flex alignItems={"center"} gap={3}>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </Container>
    )
}