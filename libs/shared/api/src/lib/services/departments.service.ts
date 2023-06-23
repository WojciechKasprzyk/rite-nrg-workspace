import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Department } from "../models";

@Injectable()
export class DepartmentsService {
  private readonly url = 'api/departments';
  private readonly http = inject(HttpClient);

  fetchAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }
}
