import { Card } from 'src/models/Card';
import { Payment } from 'src/models/Payment';
import { CardPaymentCsvRow, PaymentSource } from 'src/types';
import { readCsv } from 'src/utils/readCsv';

export class PaymentProcessor {
	public async getPayments(
		csvPath: string,
		paymentSource: PaymentSource,
	): Promise<Array<Payment>> {
		const rows = await readCsv<CardPaymentCsvRow>(csvPath);

		return rows.map((row) => {
			const card = new Card(parseInt(row.card_id), row.card_status);
			return new Payment(
				parseInt(row.customer_id),
				new Date(row.date),
				parseFloat(row.amount),
				card,
			);
		});
	}

	public verifyPayments(payments: Array<Payment>): Array<Payment> {
		return payments.filter((payment) => payment.isSuccessful());
	}
}
