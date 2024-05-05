import { Action } from '@Waapi/types';

// TODO: Use env variable for API URL
// const socket = io('http://localhost:3000');

export const ActionQueue = ({ queue }: { queue: Action[] }) => {
  return (
    <div>
      <h2>Action Queue</h2>
      <ul>
        {queue.map((action: Action, index: number) => (
          <li key={index}>{action.type}</li>
        ))}
      </ul>
    </div>
  );
};
