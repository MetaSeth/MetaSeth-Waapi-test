import { Action, Credits } from '@Waapi/types';
import { useEffect, useState } from 'react';
import { ActionQueue } from './ActionQueue';
import { AddActionForm } from './AddActionForm';
import { CreditsDisplay } from './CreditsDisplay';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';

export const ActionContainer = () => {
  const [queue, setQueue] = useState<Action[]>([]);
  const [credits, setCredits] = useState<Credits>({});
  const { socket } = useSocket();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/actions/status'
        );
        setCredits(response.data.credits);
        setQueue(response.data.queue);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    setCredits(credits);
  }, [credits]);

  useEffect(() => {
    if (!socket) {
      console.debug('Socket not initialized');
      return;
    }
    console.log('Connecting to socket');
    socket?.on('connect', () => {
      console.debug('Socket connected:', socket.id);
    });

    socket?.on('queue_updated', (data) => {
      console.log('### queue_updated ###', data);
      setQueue(data.queue);
      setCredits(data.credits);
    });

    // Clean up on unmount
    return () => {
      socket?.off('queue_updated');
      socket?.close();
    };
  }, [socket]);

  return (
    <div>
      <h2>Action Container</h2>
      <CreditsDisplay credits={credits} />
      <ActionQueue queue={queue} />
      <AddActionForm />
    </div>
  );
};
