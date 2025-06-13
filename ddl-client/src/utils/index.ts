export function formatDate(
	date: Date | string | number,
	defaultValue = '-'
): string {
	function format(val: Date) {
		return val.toLocaleDateString('ru-RU');
	}

	try {
		if (!date) return defaultValue;

		const dateVal = date instanceof Date ? date : new Date(date);

		const formatted = format(dateVal);
		if (formatted === 'Invalid Date') return defaultValue;

		return formatted;
	} catch (error) {
		return defaultValue;
	}
}

export function getRandomId() {
	return Date.now().toString(32) + Math.random().toString(36).slice(2, 9);
}

export function chunkArray<T>(array: T[], size: number) {
	const cSize = Math.abs(size ?? 1);

	if (!Array.isArray(array)) return [];

	const res: Array<T[]> = [];
	for (let i = 0; i < array.length; i += cSize) {
		const chunk = array.slice(i, i + cSize);
		res.push(chunk);
	}
	return res;
}

export function getWordByNumber(number: number, words: string[]) {
	const absValue = Math.abs(number);
	const match = absValue.toString().split('.')?.[1]?.match(/[1-9]/g);
	const fractional = match?.[match?.length - 1];

	const value = fractional ? +fractional : absValue;

	return words[
		value % 100 > 4 && value % 100 < 20
			? 2
			: [2, 0, 1, 1, 1, 2][value % 10 < 5 ? value % 10 : 5]
	];
}

export function isNumber(v: number) {
	return typeof v === 'number';
}

export function roundNumber(v: number, round = 100) {
	const isNum = isNumber(v);
	if (!isNum) return v;

	return Math.round((v + Number.EPSILON) * round) / round;
}

export function formatNumber(
	value: string | number,
	decimalLength: number = 2
): string {
	const parsedVal = parseFloat(value?.toString());

	return new Intl.NumberFormat('ru-RU', {
		maximumFractionDigits: decimalLength
	}).format(parsedVal);
}
