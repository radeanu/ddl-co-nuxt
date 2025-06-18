import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

const MESSAGES = {
	name: 'Укажите имя',
	phone: 'Укажите номер телефона',
	comment: 'Укажите комментарий'
};

const stringRule = (msg: string) => yup.string().typeError(msg);

const validationSchema = yup.object({
	name: stringRule(MESSAGES.name).required(MESSAGES.name),
	phone: stringRule(MESSAGES.phone).required(MESSAGES.phone),
	comment: stringRule(MESSAGES.comment).optional().defined('')
});

export function useCalcSubmitForm() {
	const { validate, handleReset } = useForm({
		validationSchema
	});

	const nameField = useField<string>('name');
	const phoneField = useField<string>('phone');
	const commentField = useField<string>('comment', [], { initialValue: '' });

	return {
		validate,
		nameField,
		phoneField,
		commentField,
		handleReset
	};
}
