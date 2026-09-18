// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ApiResponse {
 export interface apiresponse<T> {
    ok : boolean,
    status: number;
    message?: string;
    data?: T;
  }
}
