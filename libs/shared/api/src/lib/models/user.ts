import { Entry } from "./entry";

export interface User extends Entry{
  id: number; // Primary ID
  name: string;
  email: string;
}
