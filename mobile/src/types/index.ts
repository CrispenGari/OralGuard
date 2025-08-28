export interface TPrediction {
  label: number;
  class_label: string;
  probability: number;
}

export interface TPredictionResponse {
  time: number;
  ok: boolean;
  status: string;
  prediction?: TPrediction;
  error?: string;
}

export type THistory = {
  id: string;
  date: Date;
  prediction: TPrediction;
  lesion: string;
};
