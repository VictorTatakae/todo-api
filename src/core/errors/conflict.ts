import AppErrors from './app.erros';

export default class Conflict extends AppErrors {
	constructor(public readonly message: string = 'Conflict') {
		super(409, message);
	}
}
