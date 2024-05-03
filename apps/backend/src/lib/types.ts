export interface Credits {
  [key: string]: number;
}

export interface Action {
  type: string;
}

export interface CreditConfig {
  maxCredits: Credits;
}
