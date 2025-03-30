import AppErrors from './app.erros';

export default class Forbidden extends AppErrors {
	constructor() {
		super(403, 'You do not have permission to perform this action');
	}
}
