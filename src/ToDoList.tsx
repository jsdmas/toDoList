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