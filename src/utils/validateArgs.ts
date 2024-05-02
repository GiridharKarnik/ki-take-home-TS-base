import { PaymentSource } from 'src/types';

export const validateArgs = (
	filePath: string,
	paymentSource: string,
	sharePrice: number,
): boolean => {
	if (
		filePath === undefined ||
		paymentSource === undefined ||
		sharePrice === undefined
	) {
		return false;
	}

	if (filePath === '' || paymentSource === '' || sharePrice === 0) {
		return false;
	}

	return !(
		paymentSource !== PaymentSource.card &&
		paymentSource !== PaymentSource.bank
	);
};
