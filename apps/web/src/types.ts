export type RequestOptions<T = BodyInit> = Omit<RequestInit, "body"> & {
  params?: Record<string, string | number | undefined>;
  body?: T | BodyInit;
};

export type Response<T> = {
  data: T;
  status: number;
  statusText: string;
};
