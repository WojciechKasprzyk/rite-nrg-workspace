import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class HttpService<T> {
  protected readonly url!: string;
  private readonly http = inject(HttpClient);

  fetchAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  create(entry: Partial<T>) {
    return this.http.post(this.url, entry);
  }

  update(entry: Partial<T> & {id: number}) {
    return this.http.put(`${this.url}/${entry.id}`, entry);
  }
}
