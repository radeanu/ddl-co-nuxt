import moment from 'moment';
import { createLogger, format, transports } from 'winston';

const LOG_MAX_SIZE = 5242880;

const delimiter = '===========================================================';

const errorFormat = format.printf(({ error, ...data }) => {
	const er = error as any;

	const payload = {
		date: moment().format('DD.MM.YYYY HH:mm'),
		...data,
		error: {
			message: er?.message ?? '',
			response: {
				data: er?.response?.data ?? {},
				body: er?.response?.body ?? {},
				status: er?.response?.status ?? null
			},
			stack: er?.stack?.split('\n') ?? []
		}
	};

	const textError = JSON.stringify(payload, null, '\t');

	return `${delimiter}\n${textError}`;
});

const infoFormat = format.printf((payload) => {
	const date = moment().format('DD.MM.YYYY HH:mm');
	const data = JSON.stringify({ date, ...payload }, null, '\t');

	return `${delimiter}\n${data}\n`;
});

const errorLogger = createLogger({
	level: 'error',
	format: errorFormat,
	transports: [
		new transports.File({
			filename: './logs/error.log',
			level: 'error',
			maxsize: LOG_MAX_SIZE
		})
	]
});

const infoLogger = createLogger({
	level: 'info',
	format: infoFormat,
	transports: [
		new transports.File({
			filename: './logs/info.log',
			level: 'info',
			maxsize: LOG_MAX_SIZE
		})
	]
});

const Logger = {
	error: (data: any) => errorLogger.log('error', data),
	info: (data: any) => infoLogger.log('info', data)
};

export default Logger;
