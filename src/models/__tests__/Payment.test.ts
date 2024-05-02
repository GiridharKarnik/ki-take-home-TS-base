import { describe, expect, it } from 'vitest';
import { Card } from '../Card';
import { Payment } from '../Payment';
import { PaymentCardStatus, PaymentSource } from 'src/types';
import { BankAccount } from 'src/models/BankAccount';

describe('Payment', () => {
	it('should be able to create a payment object with the correct fee', () => {
		const card = new Card(1, PaymentCardStatus.processed);
		const payment = new Payment(
			1,
			new Date(),
			100,
			PaymentSource.card,
			card,
			null,
		);

		expect(payment.fee).toBe(2);
		expect(payment.amount).toBe(98);
	});

	it('should be able to create a processed payment object', () => {
		const card = new Card(1, PaymentCardStatus.processed);
		const payment = new Payment(
			1,
			new Date(),
			100,
			PaymentSource.card,
			card,
			null,
		);

		expect(payment.isSuccessful).toBe(true);
		expect(payment.bankAccount).toBeNull();
	});

	it('should be able to create a payment object with declined status', () => {
		const card = new Card(1, PaymentCardStatus.declined);
		const payment = new Payment(
			1,
			new Date(),
			100,
			PaymentSource.card,
			card,
			null,
		);

		expect(payment.isSuccessful).toBe(false);
		expect(payment.card?.status).toBe(PaymentCardStatus.declined);
	});

	it('should be able to create a payment object with errored status', () => {
		const card = new Card(1, PaymentCardStatus.error);
		const payment = new Payment(
			1,
			new Date(),
			100,
			PaymentSource.card,
			card,
			null,
		);

		expect(payment.isSuccessful).toBe(false);
		expect(payment.card?.status).toBe(PaymentCardStatus.error);
	});

	describe('payments with bank transfers', () => {
		it('should be able to create a payment object with bank transfer and should default to a successful payment', () => {
			const bankAccount = new BankAccount(1);
			const payment = new Payment(
				1,
				new Date(),
				100,
				PaymentSource.bank,
				null,
				bankAccount,
			);

			expect(payment.card).toBeNull();
			expect(payment.isSuccessful).toBe(true);
		});
	});
});
