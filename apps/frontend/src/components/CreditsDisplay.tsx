import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Credits {
  [key: string]: number;
}

export const CreditsDisplay: React.FC = () => {
  const [credits, setCredits] = useState<Credits>({});

  useEffect(() => {
    const fetchCredits = async () => {
      const response = await axios.get('http://localhost:3000/actions/status');
      setCredits(response.data.credits);
    };

    fetchCredits();
  }, []);

  return (
    <div>
      <h2>Credits Available</h2>
      {Object.entries(credits).map(([key, value]) => (
        <p key={key}>{`${key}: ${value}`}</p>
      ))}
    </div>
  );
};

