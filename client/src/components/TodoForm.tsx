import { useState } from "react";
import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import Alert from "./Alert";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BASE_URL} from "../App.tsx"; // Import the Alert component

export const TodoForm = () => {
    const [newTodo, setNewTodo] = useState("");

    const queryClient = useQueryClient();

    const {mutate: createTodo, isPending:isCreating} = useMutation({
        mutationKey:["createTodo"],
        mutationFn: async (event: React.FormEvent) => {
            event.preventDefault()
            try {
                const res = await fetch(`${BASE_URL}/todos`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify({title:newTodo,  body: newTodo }),
                })
                const data = await res.json();
                if(!res.ok) {
                    Alert("error", "Something went wrong");
                    throw new Error(data.error || "Something went wrong")
                }
                setNewTodo("")
                Alert("success", "Task added successfully");
                return data;
            } catch (e:any) {
                Alert("error", `Something went wrong ${e}`);
                throw new Error(e);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });

        },
        onError: (error:any) => {
            throw new Error(error);
        }
    });

    return (
        <form onSubmit={createTodo}>
            <Flex>
                <Input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    // ref={(input) => input && input.focus()}
                    placeholder="Enter your task..."
                />

                <Button
                    mx={2}
                    type={"submit"}
                    _active={{
                        transform: "scale(.97)",
                    }}
                >
                    {isCreating ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
                </Button>
            </Flex>
        </form>
    );
};