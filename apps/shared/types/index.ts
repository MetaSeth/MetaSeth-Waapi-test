export type Credits = {
  [key: string]: number;
};

export type Action = {
  type: string;
};

export type CreditConfig = {
  maxCredits: Credits;
};
