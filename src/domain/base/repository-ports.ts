export interface FindOneById<I, T> {
  findOneById(id: I): Promise<T>;
}

export type PaginationParameters = {
  nextToken?: string;
  count: number;
};

export type PaginationResponse = {
  nextToken: string;
};

export type FindManyResponse<T> = {
  data: T[];
  pagination: PaginationResponse;
};
export interface FindMany<T> {
  findMany(pagination: PaginationParameters): Promise<FindManyResponse<T>>;
}

export interface Create<T, D> {
  create(data: T): Promise<D>;
}

export interface Remove<T, D> {
  remove(data: T): Promise<D>;
}
