import { Injectable } from "@angular/core";
import { User } from "../../models";
import { HttpService } from "../_http/_http.service";

@Injectable()
export class UsersService extends HttpService<User>{
  protected override readonly url = 'api/users';
}
