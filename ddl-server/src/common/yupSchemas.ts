import * as yup from 'yup';

export const envSchema = yup.object({
	NODE_ENV: yup
		.string()
		.oneOf(['development', 'production'])
		.required('NODE_ENV not provided'),
	HOST: yup.string().trim().required(),
	PORT: yup.number().integer().positive().required(),
	DATABASE_URL: yup.string().trim().max(200).required()
});
