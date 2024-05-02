import { PaymentCardStatus } from 'src/types';

export class Card {
	cardId: number = 0;
	status: PaymentCardStatus | null = null;

	constructor(cardId: number, status: PaymentCardStatus) {
		this.cardId = cardId;
		this.status = status;
	}
}
