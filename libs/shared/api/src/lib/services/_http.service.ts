import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Entry } from "@rite-nrg-workspace/shared/api";

export abstract class HttpService<T extends Entry> {
  protected readonly url!: string;
  private readonly http = inject(HttpClient);

  fetchAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  delete(id: number): Observable<T>{
    return this.http.delete(`${this.url}/${id}`) as Observable<T>;
  }

  create(entry: Partial<T>): Observable<T> {
    return this.http.post(this.url, entry) as Observable<T>;
  }

  update(entry: T): Observable<T> {
    return this.http.patch(`${this.url}/${entry.id}`, entry) as Observable<T>;
  }
}
