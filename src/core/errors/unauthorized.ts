import AppErrors from './app.erros';

export default class Unauthorized extends AppErrors {
	constructor() {
		super(401, 'Authentication required');
	}
}
