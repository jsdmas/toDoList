import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE"
}

export interface IToDo {
    text: string,
    id: number,
    category: Categories
};

const { persistAtom } = recoilPersist();

// IToDo 객체로 이루어진 배열이라는 뜻.
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom]
});

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO
})

// selector는 atom의 output을 변형시키는 도구입니다. atom은 단순히 배열만 줄 뿐입니다.
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter(toDo => toDo.category === category);
    }
})