import AppErrors from './app.erros';

export default class InternalServer extends AppErrors {
	constructor(public readonly message: string = 'Internal server error') {
		super(500, message);
	}
}
