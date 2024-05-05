import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

export const AddActionForm = () => {
  const [actionTypes, setActionTypes] = useState<{ type: string }[]>();
  const [selectedType, setSelectedType] = useState('');
  const { socket } = useSocket();

  useEffect(() => {
    axios
      .get('http://localhost:3000/actions/types')
      .then((response) => {
        setActionTypes(response.data);
        if (response.data.length > 0) {
          setSelectedType(response.data[0].type);
        }
      })
      .catch((error) => console.error('Error fetching action types:', error));
  }, []);

  const addAction = useCallback(() => {
    if (selectedType) {
      socket?.emit('add_action', { type: selectedType });
    }
  }, [[selectedType, actionTypes]]);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    addAction();
  };

  // TODO: add description on hover
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Action to Queue</h2>
      <select value={selectedType} onChange={handleChange}>
        {actionTypes?.map((action) => (
          <option key={action.type} value={action.type}>
            {action.type}
          </option>
        ))}
      </select>
      <button type="submit">Add Action</button>
    </form>
  );
};
