import { Injectable } from "@angular/core";
import { Department } from "../../models";
import { HttpService } from "../_http/_http.service";

@Injectable()
export class DepartmentsService extends HttpService<Department>{
  protected override readonly url = 'api/departments';
}
