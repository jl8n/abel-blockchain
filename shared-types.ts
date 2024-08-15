export interface Metric {
  id: number;
  name: string;
  value: number;
}

export interface GetResponse {
  title: string;
  firstname: string;
  lastname: string;
  metrics: Metric[];
}