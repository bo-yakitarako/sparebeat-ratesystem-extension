import React from 'react';
import styled from 'styled-components';
import { calcPlayerRate } from '../utility';

const App = () => {
  const rate = calcPlayerRate();
  return (
    <Wrapper>
      <Title>Music List</Title>
      <div>Rate: {rate.toFixed(1)}</div>
    </Wrapper>
  );
};

export { App };

const Wrapper = styled.div`
  display: flex;
  margin-right: 0.8rem;
`;

const Title = styled.div`
  flex-grow: 1;
`;
