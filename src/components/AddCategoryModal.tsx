import React, { useState } from 'react';
import { styled } from 'styled-components';
import { addCategoryModalState, categoryState, currentCategoryState } from '../atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';

interface ICateForm {
  newCategory: string;
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddCategoryBox = styled.div`
  width: 560px;
  border-radius: 10px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const AddCategoryHeader = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px 0;
  background-color: #929292;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const AddCategoryTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;
const CloseBtn = styled.div`
  cursor: pointer;
  text-align: center;
  position: absolute;
  font-size: 36px;
  right: 0;
  width: 36px;
  height: 36px;
  font-weight: bold;
`;
const AddForm = styled.form`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  background-color: white;
  padding: 0px 10px;
`;

const Input = styled.input`
  padding: 16px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 18px;
  border: none;
  height: 100%;
  border: 2px solid rgba(0, 0, 0, 0.3);
  width: 80%;
  &:focus {
    outline: none;
  }
`;

const Btn = styled.button`
  width: 20%;
  height: 100%;
  font-size: 17px;
  background-color: #929292;
  border: none;
  cursor: pointer;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  color: white;
  transition: all 0.1s ease-in-out;
`;

const ErrorMessage = styled.span`
  color: red;
  margin-bottom: 10px;
  font-weight: 400;
`;

function AddCategoryModal() {
  const [errorMessage, setErrorMessage] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<ICateForm>();
  const [addModal, setAddModal] = useRecoilState(addCategoryModalState);
  const [categories, setCategories] = useRecoilState(categoryState);
  const setCurrentCategory = useSetRecoilState(currentCategoryState);

  const closeModal = () => {
    setAddModal(false);
    setValue('newCategory', '');
    setErrorMessage(false);
  };

  const addCategory = ({ newCategory }: ICateForm) => {
    if (categories.includes(newCategory)) {
      setError('newCategory', { message: "It's a category that I already have" }, { shouldFocus: true });
      setErrorMessage(true);
    } else {
      setCategories((prev) => [...prev, newCategory]);
      setCurrentCategory(newCategory);
      setValue('newCategory', '');
      setAddModal(false);
    }
  };
  return (
    <>
      {addModal ? (
        <Container>
          <AddCategoryBox>
            <AddCategoryHeader>
              <AddCategoryTitle>Add Category</AddCategoryTitle>
              <CloseBtn onClick={closeModal}>X</CloseBtn>
            </AddCategoryHeader>
            <AddForm onSubmit={handleSubmit(addCategory)}>
              <Input {...register('newCategory', { required: true })} placeholder="카테고리 이름을 적어주세요" />
              <Btn>Add</Btn>
            </AddForm>
            {errorMessage ? <ErrorMessage>{errors?.newCategory?.message}</ErrorMessage> : null}
          </AddCategoryBox>
        </Container>
      ) : null}
    </>
  );
}

export default AddCategoryModal;
