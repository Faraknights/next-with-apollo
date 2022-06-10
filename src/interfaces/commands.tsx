import { Basket } from "./basket";
import { User } from "./user";
import { Commerce } from "./commerce";
import { CCProduct } from "./product";
import { PanierConnection } from "./panier";

export interface CommandConnection {
	edges: Array<CommandEdge>;
	pageInfo?: CommandPageInfo;
}

export interface CommandPageInfo {
	startCursor: string;
	endcursor: string;
	hadNexPage: Boolean;
}

export interface CommandEdge{
	cursor: string;
	node: Command;
}

export interface Command{
	id?: string;
	creationDate?: Date;
	user?: User;
	commerces?: Array<CommerceCommand>;
	status?: string;
}

export interface CommerceCommand{
	id?: string;
	commerce?: Commerce;
	cccommands?: Array<CCCommand>;
	paniers?: Array<PanierConnection>;
	pickupDate: Date;
	status?: StatusCommand;
	user?: User;
}

export enum StatusCommand {
  INPROGRESS = "INPROGRESS",
  READY = "READY",
  DONE = "DONE",
}

export interface CCCommand{
	id?: string;
	products: Array<CCProduct>;
}
