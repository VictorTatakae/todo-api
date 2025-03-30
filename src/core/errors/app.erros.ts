export default class AppErrors extends Error {
	constructor(
		public readonly code: number,
		public readonly message: string,
	) {
		super(message);
	}
}
