import { PaginatorPipe } from './paginator.pipe';
import { User } from "@rite-nrg-workspace/shared/api";

const data: User[] = [
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
    "email": "alicebrown@othercompany.com"
  }
];

const expected = [
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bobjohnson@company.com"
  },
  {
    "id": 4,
    "name": "Alice Brown",
    "email": "alicebrown@othercompany.com"
  }
]

describe('PaginatorPipe', () => {
  it('create an instance', () => {
    const pipe = new PaginatorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter list respectively to arguments', () => {
    const pipe = new PaginatorPipe();
    const result = pipe.transform(data, {
      first: 2,
      rows: 2
    })
    expect(result).toStrictEqual(expected);
  });
});
