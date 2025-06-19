export function useLocalStorage() {
	function getItem(name: string) {
		if (import.meta.client) {
			return localStorage.getItem(name);
		}

		return null;
	}

	function setItem(name: string, value: any) {
		if (name === undefined || value === undefined || !import.meta.client) {
			return;
		}

		const val = typeof value === 'object' ? JSON.stringify(value) : value;

		localStorage.setItem(name, val);
	}

	function deleteItem(name: string) {
		if (import.meta.client) return;

		localStorage.removeItem(name);
	}

	return {
		getItem,
		setItem,
		deleteItem
	};
}
