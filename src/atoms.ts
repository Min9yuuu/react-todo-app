import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string[]>({
  key: 'categories',
  default: ['TO_DO', 'DOING', 'DONE'],
  effects_UNSTABLE: [persistAtom],
});

export const addCategoryModalState = atom<Boolean>({
  key: 'addCategoryModal',
  default: false,
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom],
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
