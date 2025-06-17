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

		if (!value) return 0;

		return value.price.coef;
	}

	function _getPlaceTypeCoef(place_type?: string) {
		const value = place_type
			? PLACE_TYPES.find((v) => v.value === place_type)
			: null;

		if (!value) return 0;

		return value.coef;
	}

	function _calcServicesType(services: string[]) {
		let result = 0;

		services.forEach((s) => {
			const s_coef = OTHER_SERVICES.find((i) => i.value === s)?.coef ?? 0;
			console.log({ s_coef });

			result += s_coef * BASE_PRICE.service;
		});

		return result;
	}

	async function calculate(values: Partial<Calculator>): Promise<number> {
		return new Promise((resolve) => {
			const target_place_type = values.area_type
				? PLACE_TYPES.find((v) => v.value === values.area_type)
				: null;

			const area_val = values.area ?? 0;
			const cl_type_coef = _getClTypeCoef(values.cl_type);
			const place_coef = _getPlaceTypeCoef(values.area_type);

			// const services_price = _calcServicesType(values.services ?? []);

			console.log({
				area_val,
				cl_type_coef,
				place_coef,
				base: BASE_PRICE.area
			});

			const total = roundNumber(
				area_val * BASE_PRICE.area * cl_type_coef * place_coef
			);

			resolve(total);
		});
	}

	return {
		calculate
	};
}
