import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models";

@Injectable()
export class UsersService {
  private readonly url = 'api/users';
  private readonly http = inject(HttpClient);

  fetchAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}
