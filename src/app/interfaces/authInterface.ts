import { Request } from "express"


export interface UserRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

export interface CompanyRequest extends Request {
  body: {
    name: string;
    type: string;
    email: string;
    phone_number: string;
    login: string;
    password: string;
  };
}