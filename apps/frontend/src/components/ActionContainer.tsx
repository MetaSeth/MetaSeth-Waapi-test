import { Action, Credits } from '@Waapi/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { ActionQueue } from './ActionQueue';
import { ActionsDisplay } from './ActionsDisplay';
import { PageContainer, Title } from './styled/styledComponents';

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

    return () => {
      socket?.off('queue_updated');
      socket?.close();
    };
  }, [socket]);

  const handleAddAction = (actionType: string) => {
    socket?.emit('add_action', { type: actionType });
  };

  return (
    <PageContainer>
      <Title>Actions</Title>
      <ActionsDisplay credits={credits} onAddAction={handleAddAction} />
      <ActionQueue credits={credits} queue={queue} />
    </PageContainer>
  );
};
