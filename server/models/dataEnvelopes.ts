export interface DataEnvelope<T> {
  data: T[];
  total: number
  skip: number
  limit: number
  };