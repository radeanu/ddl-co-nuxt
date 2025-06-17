import { roundNumber } from '@/utils';
import {
	BASE_PRICE,
	CLEANING_TYPES,
	OTHER_SERVICES,
	PLACE_TYPES
} from '@/common/constants';

interface Calculator {
	cl_type: string;
	area_type: string;
	area: number;
	services: string[];
}

export function useCalculator() {
	function _getClTypeCoef(cl_type?: string) {
		const value = cl_type
			? CLEANING_TYPES.find((v) => v.value === cl_type)
			: null;

		if (!value) return 1;

		return value.price.coef > 0 ? value.price.coef : 1;
	}

	function _getPlaceTypeCoef(place_type?: string) {
		const value = place_type
			? PLACE_TYPES.find((v) => v.value === place_type)
			: null;

		if (!value) return 1;

		return value.coef > 0 ? value.coef : 1;
	}

	function _getServicesCoef(services: string[]) {
		let coef = 0;

		services.forEach((s) => {
			const s_coef = OTHER_SERVICES.find((i) => i.value === s)?.coef ?? 0;
			coef += s_coef;
		});

		return coef > 0 ? coef : 1;
	}

	async function calculate(values: Partial<Calculator>): Promise<number> {
		return new Promise((resolve) => {
			const area_val = values.area ?? 0;
			const cl_type_coef = _getClTypeCoef(values.cl_type);
			const place_coef = _getPlaceTypeCoef(values.area_type);

			const services_coef = _getServicesCoef(values.services ?? []);

			const servicesTotal = values.services?.length
				? (area_val / 2) * BASE_PRICE.service * services_coef
				: 0;

			const calcTotal =
				area_val * BASE_PRICE.area * cl_type_coef * place_coef;

			const total = roundNumber(servicesTotal + calcTotal);

			resolve(total);
		});
	}

	return {
		calculate
	};
}
