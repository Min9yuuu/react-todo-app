import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IToDo, categoryState, toDoState } from '../atoms';
import { styled } from 'styled-components';

const ToDoBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #efefef;
  box-sizing: border-box;
`;

const TextBox = styled.div`
  width: 100%;
  height: 50%;
  background-color: #929292;
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  font-weight: 600;
  font-size: 24px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Buttonbox = styled.div`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Btn = styled.button`
  border: none;
  border-radius: 30px;
  background-color: #d6d6d6;
  font-size: 12px;
  font-weight: 600;
  padding: 5px;
  color: #5c5c5c;
  cursor: pointer;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
    });
  };
  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex + 1)];
    });
  };

  return (
    <>
      <ToDoBox>
        <TextBox>
          <span>{text}</span>
        </TextBox>
        <Buttonbox>
          {categories.map(
            (categoryBtn) =>
              categoryBtn !== category && (
                <Btn name={categoryBtn} onClick={onClick}>
                  {categoryBtn}
                </Btn>
              )
          )}
          <Btn onClick={deleteToDo}>X</Btn>
        </Buttonbox>
      </ToDoBox>
    </>
  );
}

export default ToDo;
