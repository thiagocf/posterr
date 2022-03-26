export interface FindOneById<I, T> {
  findOneById(id: I): Promise<T>;
}
