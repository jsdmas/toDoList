import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDoList from "./ToDoList";

const Router = () => {
    return (
        <BrowserRouter basename="/reacttodo">
            <Routes>
                <Route path="/" element={<ToDoList />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;