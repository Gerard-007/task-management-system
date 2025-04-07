import {Container, Stack} from "@chakra-ui/react";
import {Navbar} from "./components/Navbar.tsx"
import {TodoForm} from "./components/TodoForm.tsx";
import {TodoList} from "./components/TodoList.tsx";
import {Bounce, ToastContainer} from "react-toastify";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://loalhost:3000/api" : "/api";

function App() {

  return (
    <Stack h="100vh">
        <Navbar/>
        <Container>
            <TodoForm/>
            <TodoList/>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </Container>
    </Stack>
  )
}

export default App
