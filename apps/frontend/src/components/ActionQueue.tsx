import { Action, Credits } from '@Waapi/types';
import { QueueItem, QueueList } from './styled/styledComponents';

export const ActionQueue = ({
  queue,
  credits,
}: {
  queue: Action[];
  credits: Credits;
}) => {
  return (
    <QueueList>
      {queue.map((action: Action, index: number) => (
        <QueueItem isZeroCredit={credits[action.type] === 0} key={index}>
          {action.type}
        </QueueItem>
      ))}
    </QueueList>
  );
};
