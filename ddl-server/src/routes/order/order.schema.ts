import * as yup from 'yup';

const MSG = {
	cl_type: 'Укажите вид уборки',
	area_type: 'Укажите тип помещения',
	area: 'Укажите метраж',
	phone: 'Укажите номер телефона',
	name: 'Укажите имя',
	error: 'Неверный формат',
	location: 'Укажите регион'
};

export const createOrder = yup.object({
	location: yup.string().required(MSG.location).typeError(MSG.location),
	cl_type: yup.string().required(MSG.cl_type).typeError(MSG.cl_type),
	area_type: yup.string().required(MSG.area_type).typeError(MSG.area_type),
	area: yup.number().required(MSG.area).typeError(MSG.area),
	calc_sum: yup.number().optional().default(0),
	comment: yup.string().optional().default(''),
	name: yup.string().required(MSG.name).typeError(MSG.name),
	phone: yup.string().required(MSG.phone).typeError(MSG.phone),
	services: yup
		.array()
		.of(yup.string().required(MSG.error))
		.default([])
		.typeError(MSG.error)
});

export const createOrderCall = yup.object({
	name: yup.string().required(MSG.name).typeError(MSG.name),
	phone: yup.string().required(MSG.phone).typeError(MSG.phone),
	location: yup.string().required(MSG.location).typeError(MSG.location)
});
