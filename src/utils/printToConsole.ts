import fs from 'fs';
import { parse } from '@fast-csv/parse';

export const printToConsole = (csvPath: string): void => {
	try {
		fs.createReadStream(csvPath)
			.pipe(
				parse({
					headers: false,
					ignoreEmpty: true,
				}),
			)
			.on('data', (row) => {
				console.log(`"${row.map(String).join('","')}"`);
			})
			.on('end', () => {})
			.on('error', (error) => {
				console.error(error);
			});
	} catch (error) {
		console.error(error);
	}
};
