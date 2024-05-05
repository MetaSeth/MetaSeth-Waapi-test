import { Credits } from '@Waapi/types';

export const CreditsDisplay = ({ credits }: { credits: Credits }) => {
  return (
    <div>
      <h2>Credits Available</h2>
      {Object.entries(credits).map(([key, value]) => (
        <p key={key}>{`${key}: ${value}`}</p>
      ))}
    </div>
  );
};
