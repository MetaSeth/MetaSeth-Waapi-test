import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export const ActionQueue: React.FC = () => {
  const [queue, setQueue] = useState<string[]>([]);

  useEffect(() => {
    const fetchQueue = async () => {
      const response = await axios.get('http://localhost:3000/actions/status');
      setQueue(response.data.queue);
    };

    fetchQueue();
  }, []);

  return (
    <div>
      <h2>Action Queue</h2>
      <ul>
        {queue.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    </div>
  );
};

