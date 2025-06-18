import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

const MESSAGES = {
	name: 'Введите имя',
	phone: 'Введите телефон'
};

const stringRule = (msg: string) => yup.string().required(msg).typeError(msg);

const validationSchema = yup.object({
	name: stringRule(MESSAGES.name),
	phone: stringRule(MESSAGES.phone)
});

export function useServiceOrderForm() {
	const { handleSubmit, validate, handleReset } = useForm({
		validationSchema
	});

	const nameField = useField<string>('name');
	const phoneField = useField<string>('phone');

	return {
		validate,
		nameField,
		phoneField,
		handleSubmit,
		handleReset
	};
}
