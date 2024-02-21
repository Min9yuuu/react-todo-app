import { atom, selector } from 'recoil';

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string[]>({
  key: 'categories',
  default: ['TO_DO', 'DOING', 'DONE'],
});

export const addCategoryModalState = atom<Boolean>({
  key: 'addCategoryModal',
  default: false,
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const currentCategoryState = atom({
  key: 'category',
  default: 'TO_DO',
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(currentCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
