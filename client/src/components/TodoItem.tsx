import {Badge, Flex, Text, Box, Spinner} from "@chakra-ui/react";
import {FaCheckCircle} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {Todo} from "./TodoList.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Alert from "./Alert.tsx";
import {BASE_URL} from "../App.tsx";


export const TodoItem = ({ todo }: {todo: Todo}) => {
    const queryClient = useQueryClient();

    const {mutate: updateTodo, isPending:isUpdating} = useMutation({
        mutationKey:["updateTodo"],
        mutationFn: async () => {
            if(todo.completed) return Alert("info", "Task Already completed");
            try {
                const res = await fetch(`${BASE_URL}/todos/${todo._id}`, {
                    method: "PATCH",
                })
                const data = await res.json();
                if(!res.ok) {
                    Alert("error", "Something went wrong");
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (err: any) {
                Alert("error", `Something went wrong ${err}`);
                throw new Error(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    })

    const {mutate: deleteTodo, isPending:isDeleting} = useMutation({
        mutationKey:["updateTodo"],
        mutationFn: async () => {
            try {
                const res = await fetch(`${BASE_URL}/todos/${todo._id}`, {
                    method: "DELETE",
                })
                const data = await res.json();
                if(!res.ok) {
                    Alert("error", "Something went wrong");
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (err: any) {
                Alert("error", `Something went wrong ${err}`);
                throw new Error(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },

    });
    return (
        <Flex gap={2} alignItems={"center"}>
            <Flex
                flex={1}
                alignItems={"center"}
                border={"1px"}
                borderColor={"gray.600"}
                p={2}
                borderRadius={"lg"}
                justifyContent={"space-between"}
            >
                <Text
                    color={todo.completed ? "green.200" : "yellow:100"}
                    textDecoration={todo.completed ? "line-through" : "none"}
                >
                    {todo.body}
                </Text>

                {todo.completed && (
                    <Badge ml="1" colorScheme='green'>
                        Done
                    </Badge>
                )}
                {!todo.completed && (
                    <Badge ml="1" colorScheme='yellow'>
                        In Progress
                    </Badge>
                )}
            </Flex>

            <Flex gap={2} alignItems={"center"}>
                <Box color={"green.500"} cursor={"pointer"} onClick={() => updateTodo()}>
                    {!isUpdating && <FaCheckCircle size={20} />}
                    {isUpdating && <Spinner size={"sm"} />}
                </Box>
                <Box color={"red.500"} cursor={"pointer"} onClick={() => deleteTodo()}>
                    {!isDeleting && <MdDelete size={25} />}
                    {isDeleting && <Spinner size={"sm"} />}
                </Box>
            </Flex>
        </Flex>
    );
}