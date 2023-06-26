import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from "@rite-nrg-workspace/shared/api";
import { PaginatorState } from "primeng/paginator";

@Pipe({
  name: 'nrgPaginator',
  standalone: true,
})
export class PaginatorPipe<T extends Entry> implements PipeTransform {
  transform(data: T[], paginatorState: PaginatorState): T[] {
    const {first, rows} = paginatorState;
    if (typeof first === 'number' && typeof rows === 'number') {
      return data.slice(first, first + rows);
    }
    return data;
  }
}
