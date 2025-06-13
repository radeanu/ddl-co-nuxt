import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

import {
	CLEANING_TYPES,
	PLACE_TYPES,
	OTHER_SERVICES
} from '@/common/constants';

const MESSAGES = {
	area: 'Укажите метраж',
	type: 'Укажите вид уборки',
	place: 'Укажите тип помещения',
	other: 'Укажите дополнительные услуги'
};

const stringRule = (msg: string) => yup.string().required(msg).typeError(msg);
const selectRule = (msg: string) =>
	yup
		.object({
			name: stringRule(msg),
			value: stringRule(msg)
		})
		.required(msg)
		.typeError(msg);

const validationSchema = yup.object({
	type: yup
		.array()
		.of(selectRule(MESSAGES.type))
		.min(1, MESSAGES.type)
		.required(MESSAGES.type),
	place: yup
		.array()
		.of(selectRule(MESSAGES.place))
		.min(1, MESSAGES.place)
		.required(MESSAGES.place),
	area: yup.number().required(MESSAGES.area).typeError(MESSAGES.area),
	other: yup.array().of(selectRule(MESSAGES.other)).optional()
});

export function useCalculatorForm() {
	const { validate } = useForm({
		validationSchema
	});

	const areaField = useField<number>('area');
	const placeTypeField = useField<typeof PLACE_TYPES>('place');
	const cleaningTypeField = useField<typeof CLEANING_TYPES>('type');
	const otherField = useField<typeof OTHER_SERVICES>('other');

	return {
		validate,
		areaField,
		otherField,
		placeTypeField,
		cleaningTypeField
	};
}
