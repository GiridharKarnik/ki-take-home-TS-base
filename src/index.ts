import commandLineArgs from 'command-line-args';
import { validateArgs } from './utils/validateArgs';
import { PaymentProcessor } from './services/PaymentProcessor';
import { ShareEngine } from 'src/services/ShareEngine';
import { generateCsv } from 'src/utils/generateCsv';
import { PaymentSource } from 'src/types';
import { printToConsole } from 'src/utils/printToConsole';

const argDefinitions = [
	{
		name: 'filePath',
		alias: 'f',
		type: String,
	},
	{
		name: 'paymentSource',
		alias: 'p',
		type: String,
	},
	{
		name: 'sharePrice',
		alias: 's',
		type: Number,
	},
];

export async function simulatePlatform(
	filePath: string,
	paymentSource: PaymentSource,
	sharePrice: number,
) {
	const paymentProcessor = new PaymentProcessor();
	const payments = await paymentProcessor.getPayments(
		filePath,
		paymentSource,
	);
	const verifiedPayments = paymentProcessor.verifyPayments(payments);

	const shareEngine = new ShareEngine();
	const shareOrders = shareEngine.generateShareOrders(
		sharePrice,
		verifiedPayments,
	);

	const shareOrderData = shareOrders.map((shareOrder) => {
		return [shareOrder.customerId.toString(), shareOrder.shares.toString()];
	});

	await generateCsv(
		shareOrderData,
		['customer_id', 'shares'],
		'./data/processed/share_orders.csv',
	);

	printToConsole('./data/processed/share_orders.csv');
}

(async () => {
	const args = commandLineArgs(argDefinitions);

	if (!validateArgs(args.filePath, args.paymentSource, args.sharePrice)) {
		console.log(
			`Invalid arguments. Please provide a valid file path, payment type, and share price.`,
		);
		return;
	}

	await simulatePlatform(args.filePath, args.paymentSource, args.sharePrice);
})();
