import { writeToStream, Row } from '@fast-csv/format';
import fs from 'fs';

export const generateCsv = (
	rows: Array<Row>,
	headers: Array<string>,
	csvPath: string,
): Promise<void> => {
	return new Promise((resolve, reject) => {
		try {
			writeToStream(fs.createWriteStream(csvPath), rows, { headers })
				.on('error', (error) => {
					reject(error);
				})
				.on('finish', () => {
					resolve();
				});
		} catch (error) {
			reject(error);
		}
	});
};
