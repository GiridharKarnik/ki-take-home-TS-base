import { Card } from 'src/models/Card';
import { Payment } from 'src/models/Payment';
import { BankPaymentCsvRow, CardPaymentCsvRow, PaymentSource } from 'src/types';
import { readCsv } from 'src/utils/readCsv';
import { BankAccount } from 'src/models/BankAccount';

export class PaymentProcessor {
	public async getPayments(
		csvPath: string,
		paymentSource: PaymentSource,
	): Promise<Array<Payment>> {
		const readRows = await readCsv<CardPaymentCsvRow | BankPaymentCsvRow>(
			csvPath,
		);

		return readRows.map((row: CardPaymentCsvRow | BankPaymentCsvRow) => {
			const card =
				paymentSource === PaymentSource.card
					? new Card(
							parseInt((row as CardPaymentCsvRow).card_id),
							(row as CardPaymentCsvRow).card_status,
						)
					: null;

			const bankAccount =
				paymentSource === PaymentSource.bank
					? new BankAccount(
							parseInt(
								(row as BankPaymentCsvRow).bank_account_id,
							),
						)
					: null;

			return new Payment(
				parseInt(row.customer_id),
				new Date(row.date),
				parseFloat(row.amount),
				paymentSource,
				card,
				bankAccount,
			);
		});
	}

	public verifyPayments(payments: Array<Payment>): Array<Payment> {
		return payments.filter((payment) => payment.isSuccessful);
	}
}
