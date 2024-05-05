import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 20px;
  background-color: #fff; 
  width: 90%;
  max-width: 600px; 
  height: auto;
  margin: 40px auto; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  border-radius: 8px; 
  flex-direction: column
  align-items: center; // 
  justify-content: flex-start; 
`;

export const Section = styled.section`
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const ActionList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: space-around;
  margin: 20px 0;
`;

export const ActionItem = styled.li<{ value: number }>`
  cursor: pointer;
  padding: 5px 10px;
  font-size: 16px;
  background: #f8f9fa;
  border-radius: 4px;
  color: #1565c0;

  &:not(:last-child) {
    margin-right: 10px;
  }
  &:hover {
    background-color: #c7c7c7;
  }
`;

export const QueueList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const QueueItem = styled.li<{ isZeroCredit: boolean }>`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #eee;
  &not: (last-child) {
    border-bottom: none;
  }
  color: ${(props) => (props.isZeroCredit ? '#ff0000' : '#333')};
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #007bff;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  color: #333;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    border-color: #0056b3;
  }

  &:focus {
    border-color: #004085;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;
