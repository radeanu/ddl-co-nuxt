export function parseNumber(value: string): number | null {
	try {
		return Number.isInteger(+value) ? +value : null;
	} catch (e) {
		return null;
	}
}

export function getRandomId() {
	return Date.now().toString(32) + Math.random().toString(36).slice(2, 9);
}

export function waitFor(ms = 2000) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(null);
		}, ms);
	});
}
