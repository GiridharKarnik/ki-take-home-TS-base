import fs from 'fs';
import { parse } from '@fast-csv/parse';

export const readCsv = async <T>(csvPath: string): Promise<Array<T>> => {
	const rows = new Array<T>();

	return new Promise((resolve, reject) => {
		try {
			fs.createReadStream(csvPath)
				.pipe(
					parse({
						headers: true,
						ignoreEmpty: true,
					}),
				)
				.on('data', (row: T) => {
					rows.push(row);
				})
				.on('end', () => {
					resolve(rows);
				})
				.on('error', (error) => {
					reject(error);
				});
		} catch (error) {
			reject(error);
		}
	});
};
