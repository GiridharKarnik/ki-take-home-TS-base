export class ShareOrder {
	public customerId: number;
	public shares: number;

	constructor(customerId: number, shares: number) {
		this.customerId = customerId;
		this.shares = shares;
	}
}
