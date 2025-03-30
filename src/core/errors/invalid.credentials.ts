import AppErrors from './app.erros';

export default class InvalidCredentials extends AppErrors {
	constructor() {
		super(401, 'Invalid Credentials');
	}
}
