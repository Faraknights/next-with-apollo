import { Basket } from "./basket";
import { Commerce } from "./commerce";
import { Address, ChangesAddress } from "./map";

export interface User {
	id?: string;
	createdAt?: Date;
	email?: string;
	role?: RoleUser;
	firstName?: string;
	lastName?: string;
	commerce?: Commerce;
	basket?: Basket;
	addresses?: Array<Address>;
	defaultAddress?: Address;
	registeredPaymentMethods?: Array<RegisteredPaymentMethod>;
	defaultPaymentMethod?: RegisteredPaymentMethod;
}

export interface RegisteredPaymentMethod{
	name?: string;
	stripeID?: string;
	cardBrand?: string;
	cardLast4Digits?: string;
}

export interface ChangesRegistedPaymentMethod{
	name?: string;
	stripeID?: string;
}

export enum RoleUser {
  ADMIN = "ADMIN",
  STOREKEEPER = "STOREKEEPER",
  USER = "USER",
}

export interface ChangesUser{
	gender?: string;
	firstName?: string;
	lastName?: string;
	birthdate?: Date;
	addresses?: Array<ChangesAddress>;
	registedPaymentMethods?: Array<ChangesRegistedPaymentMethod>;
	defaultPaymentMethod?: string;
}
