import * as yup from 'yup';

const MSG = {
	name: 'Укажите имя',
	location: 'Укажите регион',
	review: 'Напишите отзыв',
	reviewLength: 'Максимум 500, минимум 30 символов',
	rating: 'Выберите оценку'
};

export const createReview = yup.object({
	key: yup.string().optional().typeError(MSG.rating),
	location: yup.string().required(MSG.location).typeError(MSG.location),
	name: yup.string().required(MSG.name).typeError(MSG.name),
	rating: yup.number().required(MSG.rating).typeError(MSG.rating),
	review: yup
		.string()
		.required(MSG.review)
		.test('review', MSG.reviewLength, (value: any) => {
			const parsed = (value as string).replaceAll(' ', '');

			return parsed.length >= 30 && parsed.length <= 500;
		})
		.typeError(MSG.review)
});
