import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

const MESSAGES = {
	name: 'Укажите имя',
	review: 'Напишите отзыв',
	reviewLength: 'Максимум 500, минимум 30 символов',
	rating: 'Выберите оценку'
};

const stringRule = (msg: string) => yup.string().typeError(msg);

const validationSchema = yup.object({
	name: stringRule(MESSAGES.name).required(MESSAGES.name),
	review: stringRule(MESSAGES.review)
		.test('review', MESSAGES.reviewLength, (value: any) => {
			const parsed = (value as string).replaceAll(' ', '');

			return parsed.length >= 30 && parsed.length <= 500;
		})
		.required(MESSAGES.review),
	rating: yup
		.number()
		.required(MESSAGES.rating)
		.typeError(MESSAGES.rating)
		.default(5)
});

export function useReviewForm() {
	const { validate, handleReset } = useForm({
		validationSchema
	});

	const nameField = useField<string>('name');
	const reviewField = useField<string>('review');
	const ratingField = useField<number>('rating', [], { initialValue: 0 });

	return {
		validate,
		nameField,
		ratingField,
		reviewField,
		handleReset
	};
}
