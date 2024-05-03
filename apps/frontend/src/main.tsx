import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { CreditsDisplay } from './components/CreditsDisplay';
import { ActionQueue } from './components/ActionQueue';
import { AddActionForm } from './components/AddActionForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body
);

// @INFO: styled-components is installed, you can use it if you want ;)
const Container = styled.div``;

root.render(
  <StrictMode>
    <Container className="App"> 
      <h1>Action Management System</h1>
      <CreditsDisplay />
      <AddActionForm />
      <ActionQueue />
 </Container>
  </StrictMode>
);
