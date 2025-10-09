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
