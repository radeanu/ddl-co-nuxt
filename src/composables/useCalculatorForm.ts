import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

const MESSAGES = {
	area: 'Укажите метраж',
	type: 'Укажите вид уборки',
	place: 'Укажите тип помещения'
};

const stringRule = (msg: string) => yup.string().required(msg).typeError(msg);

const validationSchema = yup.object({
	type: yup.array().of(stringRule(MESSAGES.type)).min(1),
	place: yup.array().of(stringRule(MESSAGES.place)).min(1),
	area: yup.number().required(MESSAGES.area).typeError(MESSAGES.area)
});

export function useCalculatorForm() {
	const { handleSubmit, validate } = useForm({ validationSchema });

	const areaField = useField<number>('area');
	const placeTypeField = useField<string[]>('place', [], {
		initialValue: []
	});
	const cleaningTypeField = useField<string[]>('type', [], {
		initialValue: []
	});

	return {
		validate,
		areaField,
		placeTypeField,
		cleaningTypeField,
		handleSubmit
	};
}
