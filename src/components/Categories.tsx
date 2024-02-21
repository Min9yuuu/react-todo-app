import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { addCategoryModalState, categoryState, currentCategoryState } from '../atoms';

const CategoriesWrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 30px;
  width: 100%;
`;

const CategoriesBtnWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 288px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;
const CategoriesBtn = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.isActive ? '#535353' : '#929292')};
  color: white;
`;

function Categories() {
  const categories = useRecoilValue(categoryState);
  const [currentCategory, setCurrentCategory] = useRecoilState(currentCategoryState);
  const addCategoryModal = useSetRecoilState(addCategoryModalState);
  const addCategoryHandle = () => {
    addCategoryModal(true);
  };
  const selectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentCategory(e.currentTarget.innerText);
  };

  return (
    <>
      <CategoriesWrapper>
        {categories.map((category) => (
          <CategoriesBtnWrap key={category}>
            <CategoriesBtn isActive={currentCategory === category} onClick={selectCategory}>
              {category}
            </CategoriesBtn>
          </CategoriesBtnWrap>
        ))}
        <CategoriesBtnWrap>
          <CategoriesBtn isActive={false} onClick={addCategoryHandle}>
            +
          </CategoriesBtn>
        </CategoriesBtnWrap>
      </CategoriesWrapper>
    </>
  );
}

export default Categories;
