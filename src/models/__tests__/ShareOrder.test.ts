import { describe, it, expect } from 'vitest';
import { ShareOrder } from 'src/models/ShareOrder';

describe('ShareOrder', () => {
	it('should be able to create a share order object', () => {
		const shareOrder = new ShareOrder(1, 100);

		expect(shareOrder.customerId).toBe(1);
	});
});
