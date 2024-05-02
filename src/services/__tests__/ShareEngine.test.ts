import { describe, expect, it } from 'vitest';
import { ShareEngine } from 'src/services/ShareEngine';
import { Payment } from 'src/models/Payment';
import { Card } from 'src/models/Card';
import { PaymentCardStatus, PaymentSource } from 'src/types';

describe('ShareEngine', () => {
	it('should be able to generate shares orders for payments by different customers', () => {
		const shareEngine = new ShareEngine();
		const mockPayments: Array<Payment> = [
			new Payment(
				456,
				new Date('2019-01-12'),
				900,
				PaymentSource.card,
				new Card(919, PaymentCardStatus.processed),
				null,
			),
			new Payment(
				123,
				new Date('2019-02-27'),
				4200,
				PaymentSource.card,
				new Card(181, PaymentCardStatus.processed),
				null,
			),
		];

		const shareOrders = shareEngine.generateShareOrders(1.2, mockPayments);

		expect(shareOrders.length).toBe(2);

		expect(shareOrders[0].customerId).toEqual(456);
		expect(shareOrders[0].shares).toEqual(735);

		expect(shareOrders[1].customerId).toEqual(123);
		expect(shareOrders[1].shares).toEqual(3430);
	});

	it('should be able to handle share orders for multiple payments by the same customer', () => {
		const shareEngine = new ShareEngine();
		const mockPayments: Array<Payment> = [
			new Payment(
				123,
				new Date('2019-01-12'),
				900,
				PaymentSource.card,
				new Card(919, PaymentCardStatus.processed),
				null,
			),
			new Payment(
				123,
				new Date('2019-02-27'),
				900,
				PaymentSource.card,
				new Card(919, PaymentCardStatus.processed),
				null,
			),
		];

		const shareOrders = shareEngine.generateShareOrders(1.2, mockPayments);

		expect(shareOrders.length).toBe(1);

		expect(shareOrders[0].customerId).toEqual(123);
		expect(shareOrders[0].shares).toEqual(1470);
	});
});
