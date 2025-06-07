
export interface IResponse<T> {
  data: string | Array<T>,
  error: string,
  message: string,
}
