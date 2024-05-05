import { Credits } from '@Waapi/types';
import { ActionItem, ActionList } from './styled/styledComponents';

export const ActionsDisplay = ({
  credits,
  onAddAction,
}: {
  credits: Credits;
  onAddAction: (actionType: string) => void;
}) => {
  return (
    <ActionList>
      {Object.entries(credits).map(([key, value]) => (
        <ActionItem
          value={value}
          key={key}
          onClick={() => onAddAction(key)}
        >{`${key}: ${value}`}</ActionItem>
      ))}
    </ActionList>
  );
};
