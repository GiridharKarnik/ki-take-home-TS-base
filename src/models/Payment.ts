import { Card } from './Card';
import { config } from 'src/config';
import { PaymentCardStatus, PaymentSource } from 'src/types';
import { BankAccount } from 'src/models/BankAccount';

export class Payment {
	public customerId: number;
	public date: Date | null;
	public amount: number;
	public fee: number;
	public card: Card | null;
	public bankAccount: BankAccount | null;
	public isSuccessful: boolean;

	constructor(
		customerId: number,
		date: Date,
		amount: number,
		paymentSource: PaymentSource,
		card: Card | null,
		bankAccount: BankAccount | null,
	) {
		this.customerId = customerId;
		this.date = date;
		this.fee = config.paymentFeeRate * amount;
		this.amount = amount - this.fee;
		this.card = card;
		this.bankAccount = bankAccount;
		this.isSuccessful = this.isASuccessfulPayment(paymentSource, card);
	}

	private isASuccessfulPayment(
		paymentSource: PaymentSource,
		card: Card | null,
	): boolean {
		if (paymentSource === PaymentSource.bank) {
			return true;
		}

		return (
			paymentSource === PaymentSource.card &&
			card?.status === PaymentCardStatus.processed
		);
	}
}
