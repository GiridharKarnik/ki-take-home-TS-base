import { Payment } from '../models/Payment';
import { ShareOrder } from '../models/ShareOrder';

export class ShareEngine {
	public generateShareOrders(sharePrice: number, payments: Array<Payment>): Array<ShareOrder> {
		const shareOrders = Array<ShareOrder>();
		const paymentsByCustomer = this.groupPaymentsByCustomer(payments);

		paymentsByCustomer.forEach((customerPayments, customerId) => {
			let totalShares = 0;

			customerPayments.forEach((payment) => {
				const shares = payment.amount / sharePrice;
				totalShares += shares;
			});

			shareOrders.push(new ShareOrder(customerId, totalShares));
		});

		return shareOrders;
	}

	private groupPaymentsByCustomer(payments: Array<Payment>): Map<number, Array<Payment>> {
		const paymentsByCustomer = new Map<number, Array<Payment>>();

		payments.forEach((payment) => {
			if(!paymentsByCustomer.has(payment.customerId)) {
				paymentsByCustomer.set(payment.customerId, new Array<Payment>());
			}

			paymentsByCustomer.get(payment.customerId)!.push(payment);
		});

		return paymentsByCustomer;
	}
}
