import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

const ToDo = ({ text, category, id }: IToDo) => {
    const setToDo = useSetRecoilState(toDoState);
    const onClick = (newCategory: IToDo["category"]) => {
        setToDo(prevToDos => {
            // atom 값의 이전 toDo 배열의 원소와 선택된 원소의 id값을 비교하여 위치를 찾아냅니다.
            const targetIndex = prevToDos.findIndex(toDo => toDo.id === id);

            const newToDo = { text, id, category: newCategory };
            const newToDos = [...prevToDos];
            newToDos.splice(targetIndex, 1, newToDo);
            return newToDos;
        });
    }
    return (
        <li>
            <span>{text}</span>
            {category !== Categories.TO_DO && (
                <button onClick={() => onClick(Categories.TO_DO)}>ToDo</button>
            )}
            {category !== Categories.DOING && (
                <button onClick={() => onClick(Categories.DOING)}>Doing</button>
            )}
            {category !== Categories.DONE && (
                <button onClick={() => onClick(Categories.DONE)}>Done</button>
            )}
        </li>
    );
};

export default ToDo;