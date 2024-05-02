import {describe, it, expect} from 'vitest';
import { Card } from '../Card';
import { Payment } from '../Payment';
import { PaymentCardStatus } from 'src/types';

describe("Payment", () => {
	it("should be able to create a payment object with the correct fee", () => {
		const card = new Card(1, PaymentCardStatus.processed);
		const payment = new Payment(1, new Date(), 100, card);

		expect(payment.fee).toBe(2);
		expect(payment.amount).toBe(98);
	})

	it("should be able to create a processed payment object", () => {
		const card = new Card(1, PaymentCardStatus.processed);
		const payment = new Payment(1, new Date(), 100, card);

		expect(payment.isSuccessful()).toBe(true);
	});

	it("should be able to create a payment object with declined status", () => {
		const card = new Card(1, PaymentCardStatus.declined);
		const payment = new Payment(1, new Date(), 100, card);

		expect(payment.isSuccessful()).toBe(false);
		expect(payment.card?.status).toBe(PaymentCardStatus.declined);
	});

	it("should be able to create a payment object with errored status", () => {
		const card = new Card(1, PaymentCardStatus.error);
		const payment = new Payment(1, new Date(), 100, card);

		expect(payment.isSuccessful()).toBe(false);
		expect(payment.card?.status).toBe(PaymentCardStatus.error);
	});
});
