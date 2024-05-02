export enum PaymentSource {
	card = 'card',
	bank = 'bank',
}

export enum PaymentCardStatus {
	declined = 'declined',
	processed = 'processed',
	error = 'error',
}

export interface CardPaymentCsvRow {
	customer_id: string;
	date: string;
	amount: string;
	card_id: string;
	card_status: PaymentCardStatus;
}
