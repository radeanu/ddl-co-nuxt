import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { isValidPhoneNumber } from 'libphonenumber-js';

const MESSAGES = {
	serviceType: 'Выберите вид услуги',
	name: 'Укажите имя',
	phone: 'Укажите номер телефона',
	phoneInvalid: 'Неверный номер телефона',
	comment: 'Укажите комментарий'
};

const stringRule = (msg: string) => yup.string().typeError(msg);

const validationSchema = yup.object({
	serviceType: stringRule(MESSAGES.serviceType).required(
		MESSAGES.serviceType
	),
	name: stringRule(MESSAGES.name).required(MESSAGES.name),
	phone: stringRule(MESSAGES.phone)
		.test('phone', MESSAGES.phoneInvalid, (value: any) => {
			return isValidPhoneNumber(value, 'RU');
		})
		.required(MESSAGES.phone),
	comment: stringRule(MESSAGES.comment).optional().defined('')
});

export function useOrderForm() {
	const { validate, handleReset } = useForm({
		validationSchema
	});

	const serviceTypeField = useField<string>('serviceType');
	const nameField = useField<string>('name');
	const phoneField = useField<string>('phone');
	const commentField = useField<string>('comment', [], { initialValue: '' });
	const honeypotField = useField<string>('website', [], { initialValue: '' });

	return {
		validate,
		serviceTypeField,
		nameField,
		phoneField,
		commentField,
		honeypotField,
		handleReset
	};
}
