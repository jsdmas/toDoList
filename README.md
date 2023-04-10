`작동 방법`
```
npm run start
```
# description
react-hook-form, recoil 를 사용해 간단한 todoList를 만들어봤습니다.   
typescript의 방식을 익히고 enum 과 interface를 사용하는 방법을 배웠습니다.   

주요 코드는 아래와 같습니다.
`To Do component`
```jsx
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
```


`To Do List component`
```jsx
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Categories, categoryState, toDoSelector, toDoState } from './atoms';
import ToDo from './components/ToDo';

interface IForm {
    toDo: string
}

const ToDoList = () => {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const setToDo = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    // data.toDo를 구조분해 하여 받아옴.
    // form에서 받아온 toDo는 string타입이다.
    const handleValid = ({ toDo }: IForm) => {
        setToDo(prevToDo => [{ text: toDo, id: Date.now(), category }, ...prevToDo]);
        setValue("toDo", "");
    };

    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as Categories);
    }
    return (
        <>
            <h1>ToDo</h1>
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", { required: "Please write a To Do" })} placeholder="Write a to do..." />
                <button>Add</button>
            </form>
            <ul>
                {/* toDos 배열의 원소 하나하나가 ToDo컴포넌트에 필요한 props와 같은 모양이기때문에 아래처럼 사용가능하다. */}
                {/* 둘다 IToDo interface를 가지고 있기 때문에 가능. */}
                {toDos?.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
            </ul>
        </>
    );
};

export default ToDoList;
```