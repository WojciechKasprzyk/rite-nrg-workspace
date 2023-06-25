import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
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

  //It's necessary to pass whole entry of type T
  update(entry: T): Observable<T> {
    //It's broken - While I send reduced users array, it does not update it and keeps "removed" user id
    console.log(entry)
    //PATCH method is not implemented
    //Need to use PUT instead
    return this.http.put(`${this.url}/${entry.id}`, entry) as Observable<T>;
  }
}
