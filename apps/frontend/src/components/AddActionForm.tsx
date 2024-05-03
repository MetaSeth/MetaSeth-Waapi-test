import React, { useState } from 'react';
import axios from 'axios';

export const AddActionForm: React.FC = () => {
  const [actionType, setActionType] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await axios.post('http://localhost:3000/actions/add', { type: actionType });
    setActionType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Action to Queue</h2>
      <input
        type="text"
        value={actionType}
        onChange={e => setActionType(e.target.value)}
        placeholder="Enter action type"
      />
      <button type="submit">Add Action</button>
    </form>
  );
};

