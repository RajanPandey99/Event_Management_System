/* eslint-disable @typescript-eslint/no-namespace */
export namespace UserNamespace {
  export interface User {
    id: number;
    name: string;
    email: string;
  }

  export interface loginRequest {
    email: string;
    password: string;
  }

  export interface RegisterRequest extends loginRequest{
    name : string;
  }
}
