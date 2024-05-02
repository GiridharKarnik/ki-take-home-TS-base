import { describe, it, expect } from 'vitest';
import { BankAccount } from 'src/models/BankAccount';

describe('BankAccount', () => {
	it('should be able to create a share order object', () => {
		const shareOrder = new BankAccount(123);

		expect(shareOrder.accountId).toBe(123);
	});
});
