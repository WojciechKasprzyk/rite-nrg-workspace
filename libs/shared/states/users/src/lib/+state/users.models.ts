import { User } from "@rite-nrg-workspace/shared/api";

/**
 * Interface for the 'Users' data
 */
export type UsersEntity = User;

export type WriteUser = User & {departmentId: number}

