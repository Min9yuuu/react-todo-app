import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, currentCategoryState, toDoState } from '../atoms';
import { styled } from 'styled-components';

interface IForm {
  toDo: string;
}

const InputContainer = styled.div`
  display: flex;
  margin-top: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 56px;
`;
const FormBox = styled.form`
  position: relative;
  margin-top: 10px;
  width: 100%;
  height: 100%;
`;
const Input = styled.input`
  padding: 16px;
  border-radius: 25px;
  font-size: 18px;
  border: none;
  height: 100%;
  border: 2px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const BrnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const Btn = styled.button`
  width: 33%;
  height: 30px;
  font-size: 14px;
  background-color: #929292;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  color: white;
  transition: all 0.1s ease-in-out;
`;

const AddBtn = styled.button`
  position: absolute;
  right: 0.5%;
  top: 50%;
  transform: translateY(-50%);
  background-color: #929292;
  border: none;
  cursor: pointer;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(currentCategoryState);
  const [categories, setCategories] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    console.log('add to do', toDo);
    setToDos((prevToDo) => [{ text: toDo, id: Date.now(), category }, ...prevToDo]);
    setValue('toDo', '');
  };

  const currentAllDelete = () => {
    setToDos((prevToDos) => {
      const target = prevToDos.filter((todo) => todo.category !== category);
      return [...target];
    });
  };

  const allDelete = () => {
    setToDos([]);
  };

  const categoryDelete = () => {
    setCategories((prevCategory) => {
      const targetCategory = prevCategory.filter((targetCategoris) => targetCategoris !== category);
      return [...targetCategory];
    });
    setToDos((prevToDos) => {
      const target = prevToDos.filter((todo) => todo.category !== category);
      return [...target];
    });
    setCategory(category === categories[0] ? categories[1] : categories[0]);
  };

  return (
    <InputContainer>
      <BrnWrap>
        <Btn onClick={currentAllDelete}>Current List Delete</Btn>
        <Btn onClick={allDelete}>List All Delete</Btn>
        <Btn onClick={categoryDelete}>Current Category Delete</Btn>
      </BrnWrap>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('toDo', {
            required: 'Please write a To Do',
          })}
          placeholder="Write To Do"
        />
        <AddBtn>Add</AddBtn>
      </FormBox>
    </InputContainer>
  );
}

export default CreateToDo;
