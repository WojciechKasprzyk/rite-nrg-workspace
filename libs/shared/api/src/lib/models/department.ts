import { Entry } from "./entry";

export interface Department extends Entry{
  id: number; // Primary ID
  name: string;
  users: number[];
}
