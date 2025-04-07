import {Flex, Spinner, Stack, Text} from "@chakra-ui/react";
import {TodoItem} from "./TodoItem.tsx";
import {useQuery} from "@tanstack/react-query";
import {FaCheckCircle} from "react-icons/fa";
import {BASE_URL} from "../App.tsx";

export type Todo = {
    _id: number;
    body: string;
    completed: boolean
}

export const TodoList = () => {
    const {data:todos, isLoading} = useQuery<Todo[]>({
        queryKey: ["todos"],

        queryFn: async () => {
            try {
                const res = await fetch(`${BASE_URL}/todos`)
                const data = await res.json()

                if(!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                return data || []
            } catch (error) {
                console.error(error)
            }
        }
    })
    return (
        <>
            <Text
                fontSize={"4xl"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                textAlign={"center"}
                my={2}
                bgGradient='linear(to-l, #0b85f8, #00ffff)'
                bgClip='text'
            >
                Today's Tasks
            </Text>

            {isLoading && (
                <Flex justifyContent={"center"} my={4}>
                    <Spinner size={"xl"} />
                </Flex>
            )}
            {!isLoading && todos?.length === 0 && (
                <Stack alignItems={"center"} gap={'3'}>
                    <Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
                        All tasks completed
                    </Text>
                    {/*<img src={''} alt={'Go logo'} width={70} height={70} />*/}
                    <FaCheckCircle size={30}/>
                </Stack>
            )}
            <Stack>
                {todos?.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </Stack>
        </>
    );
}