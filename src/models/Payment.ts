import { Card } from './Card';
import { config } from 'src/config';

export class Payment {
	public customerId: number;
	public date: Date | null;
	public amount: number;
	public fee: number;
	public card: Card | null;

	constructor(
		customerId: number,
		date: Date,
		amount: number,
		card: Card | null,
	) {
		this.customerId = customerId;
		this.date = date;
		this.fee = config.paymentFeeRate * amount;
		this.amount = amount - this.fee;
		this.card = card;
	}

	public isSuccessful(): boolean {
		return this.card?.status == 'processed';
	}
}
