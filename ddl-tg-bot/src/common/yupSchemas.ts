import * as yup from 'yup';

export const envSchema = yup.object({
	NODE_ENV: yup
		.string()
		.oneOf(['development', 'production'])
		.required('NODE_ENV not provided'),
	BOT_TOKEN: yup.string().required('BOT_TOKEN not provided'),
	ADMIN_TG_ID: yup.string().required('ADMIN_TG_ID not provided'),
	DATABASE_URL: yup.string().trim().max(200).required('DATABASE_URL not provided')
});
