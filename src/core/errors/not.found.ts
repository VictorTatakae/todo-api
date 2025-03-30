import AppErrors from './app.erros';

export default class NotFound extends AppErrors {
	constructor(public readonly message: string) {
		super(404, message);
	}
}
