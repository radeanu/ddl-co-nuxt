export const validationOptions = {
	abortEarly: false,
	stripUnknown: true
};

export const LOCATIONS = {
	drains: [
		{
			name: 'Москва',
			value: 'moscow'
		},
		{
			name: 'Рязань',
			value: 'ryazan'
		},
		{
			name: 'Мытищи',
			value: 'mytischi'
		},
		{
			name: 'Королёв',
			value: 'korolev'
		}
	],
	cleaning: [
		{
			name: 'Москва',
			value: 'moscow'
		},
		{
			name: 'Рязань',
			value: 'ryazan'
		},
		{
			name: 'Королёв',
			value: 'korolev'
		},
		{
			name: 'Ростов-на-Дону',
			value: 'rostov-na-donu'
		},
		{
			name: 'Карелия',
			value: 'karelia'
		},
		{
			name: 'Санкт-Петербург',
			value: 'piter'
		},
		{
			name: 'Камчатка',
			value: 'camchatka'
		},
		{
			name: 'Воронеж',
			value: 'voronej'
		},
		{
			name: 'Нижний Новгород',
			value: 'nijnii novgorod'
		},
		{
			name: 'Липецк',
			value: 'lipetsc'
		},
		{
			name: 'Мегион',
			value: 'megion'
		},
		{
			name: 'Мурманск',
			value: 'murmansk'
		},
		{
			name: 'Краснодар',
			value: 'krasnodar'
		}
	]
};

export const ALL_LOCATIONS = Array.from(
	new Map(
		[...LOCATIONS.cleaning, ...LOCATIONS.drains].map((location) => [
			location.value,
			location
		])
	).values()
);

export const SERVICE_TYPES = {
	cleaning: {
		name: 'Клининг',
		value: 'cleaning'
	},
	drains: {
		name: 'Прочистка канализации',
		value: 'drains'
	}
};

export const SERVICE_LIST = Object.entries(SERVICE_TYPES).map(([key, value]) => [
	key,
	{ value: value.value, name: value.name }
]);
