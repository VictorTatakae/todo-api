import AppErrors from "./app.erros";

export default class BadRequest extends AppErrors {
	constructor(public readonly message: string) {
		super(400, message);
	}
}
