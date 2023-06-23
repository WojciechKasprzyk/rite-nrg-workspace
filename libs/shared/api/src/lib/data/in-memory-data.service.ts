import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Department, User } from "../models";

interface Db {
  users: User[];
  departments: Department[]
}

export class InMemoryDataService implements InMemoryDbService {
  createDb(): Db {
    // api/departments
    const departments: Department[] = [
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
    ];
    // api/users
    const users: User[] = [
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
    return {departments, users};
  }
}
