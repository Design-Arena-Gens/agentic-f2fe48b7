export interface Short {
  id: string;
  thumbnail: string;
  duration: number;
  startTime: string;
  endTime: string;
  title: string;
  score: number;
}

export interface GenerateOptions {
  duration: number;
  transition: string;
}
