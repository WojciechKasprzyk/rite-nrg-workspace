import { getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Department, Entry, User } from "../models";
import { HttpRequest } from "@angular/common/http";

interface Db {
  users: User[];
  departments: Department[]
}

type Collections = keyof Db;
type CollectionsTypes = typeof DB[Collections];

const DB: Db = {
  // api/departments
  departments: [
    {
      "id": 1,
      "name": "Marketing",
      "users": [1, 2]
    },
    {
      "id": 2,
      "name": "Sales",
      "users": [3, 4]
    }
  ],
  // api/users
  users: [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@company.com"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "janesmith@company.com"
    },
    {
      "id": 3,
      "name": "Bob Johnson",
      "email": "bobjohnson@company.com"
    },
    {
      "id": 4,
      "name": "Alice Brown",
      "email": "alicebrown@company.com"
    }
  ]
}

export class InMemoryDataService<T extends Partial<CollectionsTypes> & Entry> implements InMemoryDbService {
  createDb(): Db {
    const {departments, users} = DB;
    return {departments, users};
  }

  patch(reqInfo: RequestInfo) {
    const collectionName= reqInfo.collectionName as keyof Db;
    const body: T = (reqInfo.req as HttpRequest<T>).body as T;

    const patchedValue = this.patchValue(body, collectionName);

    if (collectionName === 'users') {
      const departmentId = this.getDepartmentId(reqInfo);
      this.swapUserDepartment(body, +departmentId);
    }

    return reqInfo.utils.createResponse$(() => {

      const options = {
        body: patchedValue,
        status: STATUS.OK
      } as ResponseOptions;

      return this.finishOptions(options, reqInfo);
    })
  }

  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status as number);
    options.headers = headers;
    options.url = url;
    return options;
  }

  private patchValue(entry: T, collectionName: keyof Db) {
    const collection = DB[collectionName];
    const index = collection.findIndex(e => e.id === entry.id);
    return collection[index] = {
      ...collection[index],
      ...entry
    }
  }

  private swapUserDepartment(user: T, departmentId: number) {
    const {id: userId} = user;
    const departments = DB.departments;
    const currentDepartmentIndex = departments.findIndex(d => d.users.includes(userId));
    const currentDepartment = departments[currentDepartmentIndex];

    if (departmentId === currentDepartment.id) {
      return;
    }

    const newDepartmentIndex = departments.findIndex(d => d.id === departmentId);
    const newDepartment = departments[newDepartmentIndex];

    departments[currentDepartmentIndex] = {
      ...currentDepartment,
      users: currentDepartment.users.filter(id => id !== userId)
    }

    departments[newDepartmentIndex] = {
      ...newDepartment,
      users: [...newDepartment.users, userId]
    }

  }

  private getDepartmentId(reqInfo: RequestInfo): string {
    return (reqInfo.query.get('departmentId') as string[])[0]
  }
}
