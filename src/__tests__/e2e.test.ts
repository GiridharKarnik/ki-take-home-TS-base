import { describe, it, expect } from 'vitest';
import path from 'path';
import { PaymentSource } from 'src/types';
import { simulatePlatform } from 'src/index';
import { readCsv } from 'src/utils/readCsv';

describe('Payment processing and share order generation', () => {
	it('should be able to process card payments and generate share orders', async () => {
		await simulatePlatform(
			path.resolve(__dirname, './fixtures/card_payments_mixed.csv'),
			PaymentSource.card,
			1.2,
		);

		//? check the generated csv file
		const generatedShareOrder = await readCsv(
			'./data/processed/share_orders.csv',
		);

		expect(generatedShareOrder).toStrictEqual([
			{
				customer_id: '123',
				shares: '735',
			},
			{
				customer_id: '456',
				shares: '3430',
			},
		]);
	});
});
