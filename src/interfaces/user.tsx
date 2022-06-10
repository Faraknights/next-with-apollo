import { Basket } from "./basket";
import { Commerce } from "./commerce";

export interface User {
	id?: string;
	createdAt?: Date;
	email?: string;
	role?: RoleUser;
	firstName?: string;
	lastName?: string;
	commerce?: Commerce;
	basket?: Basket;
}

export enum RoleUser {
  ADMIN = "ADMIN",
  STOREKEEPER = "STOREKEEPER",
  USER = "USER",
}
