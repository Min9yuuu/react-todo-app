import React from 'react';
import { styled } from 'styled-components';
import Categories from './Categories';
import AddCategoryModal from './AddCategoryModal';
import { toDoSelector, toDoState } from '../atoms';
import { useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

const Container = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid gray;
`;
const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
`;

const ToDoCntainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin-top: 40px;
  height: 30px;
  gap: 10px;
`;

function Home() {
  const toDos = useRecoilValue(toDoSelector);

  return (
    <>
      <Container>
        <Header>
          <Title>To Do List</Title>
          <Categories />
        </Header>
        <AddCategoryModal />
        <CreateToDo />
        <ToDoCntainer>
          {toDos.map((todo) => (
            <ToDo {...todo} />
          ))}
        </ToDoCntainer>
      </Container>
    </>
  );
}

export default Home;
