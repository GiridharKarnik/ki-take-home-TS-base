import { describe, expect, it } from 'vitest';
import { PaymentProcessor } from 'src/services/PaymentProcessor';
import { PaymentCardStatus, PaymentSource } from 'src/types';
import { Card } from 'src/models/Card';
import { Payment } from 'src/models/Payment';
import path from 'path';

describe('PaymentProcessor', () => {
	it('should be able to generate the payments based on the csv file', async () => {
		const paymentProcessor = new PaymentProcessor();

		const payments = await paymentProcessor.getPayments(
			path.resolve(__dirname, './fixtures/card_payments_mixed.csv'),
			PaymentSource.card,
		);
		expect(payments.length).toBe(3);
		expect(payments).toStrictEqual([
			new Payment(
				123,
				new Date('2019-01-12T00:00:00.000Z'),
				900,
				new Card(30, PaymentCardStatus.processed),
			),
			new Payment(
				123,
				new Date('2019-02-10T00:00:00.000Z'),
				900,
				new Card(45, PaymentCardStatus.declined),
			),
			new Payment(
				456,
				new Date('2019-01-20T00:00:00.000Z'),
				4200,
				new Card(10, PaymentCardStatus.processed),
			),
		]);
	});

	it('should be able to handle empty payments csv files', async () => {
		const paymentProcessor = new PaymentProcessor();

		const payments = await paymentProcessor.getPayments(
			path.resolve(__dirname, './fixtures/card_payments_empty.csv'),
			PaymentSource.card,
		);
		expect(payments.length).toBe(0);
	});

	it('should be able to verify payments', () => {
		const mockPayments: Array<Payment> = [
			new Payment(
				123,
				new Date('2019-01-12'),
				100,
				new Card(919, PaymentCardStatus.processed),
			),
			new Payment(
				123,
				new Date('2019-02-20'),
				100,
				new Card(919, PaymentCardStatus.declined),
			),
			new Payment(
				345,
				new Date('2019-02-27'),
				100,
				new Card(919, PaymentCardStatus.processed),
			),
		];

		const paymentProcessor = new PaymentProcessor();
		const verifiedPayments = paymentProcessor.verifyPayments(mockPayments);

		expect(verifiedPayments).toHaveLength(2);
		expect(verifiedPayments).toStrictEqual([
			new Payment(
				123,
				new Date('2019-01-12'),
				100,
				new Card(919, PaymentCardStatus.processed),
			),
			new Payment(
				345,
				new Date('2019-02-27'),
				100,
				new Card(919, PaymentCardStatus.processed),
			),
		]);
	});
});
