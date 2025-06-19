export const BASE_PRICE = {
	unit: 300,
	area: 120, // 120 руб/кв
	service: 60 // 60 руб/кв
};

export const MENUS = [
	{ link: '/#calculator', label: 'Калькулятор', header: false },
	{ link: '/#services', label: 'Услуги', header: true },
	{ link: '/#steps', label: 'Этапы работы', header: true },
	// { link: '/', label: 'Наши работы' },
	{ link: '/#contacts', label: 'Контакты', header: true }
];

export const TEXT = {
	time: 'ПН -ВС: круглосуточно'
};

export const CONTACTS = {
	phone: {
		link: 'tel:89290781517',
		label: '8 929 078-15-17'
	},
	tg: {
		link: 'https://t.me/ddlcleaning',
		label: ''
	}
};

export const STEPS = [
	{ name: 'Оставляете заявку', img: '/images/step-order.png' },
	{ name: 'Консультация', img: '/images/step-help.png' },
	{ name: 'Выполнение заказа', img: '/images/step-clean.png' },
	{ name: 'Оплата', img: '/images/step-pay.png' }
];

export const CLEANING_TYPES = [
	{
		value: 'express',
		name: 'Срочная уборка',
		description:
			'Нужно навести порядок уже сегодня?\n Мы приедем в течение часа и приведём ваш дом в идеальный вид.\n Уборка после ремонта, перед гостями или для сдачи квартиры — мы справимся со всем!',
		price: {
			coef: 1.2,
			unit: false
		}
	},
	{
		value: 'poderj',
		name: 'Поддерживающая',
		description:
			'Ежедневная или периодическая уборка\n для сохранения чистоты.\n\nБыстро, аккуратно, по фиксированной цене.',
		price: {
			coef: 1,
			unit: false
		}
	},
	{
		value: 'remont',
		name: 'После ремонта',
		description:
			'Тщательная очистка помещения от строительных загрязнений.\n\nВсе поверхности — без пыли, пятен и мусора.',
		price: {
			coef: 2,
			unit: false
		}
	},
	{
		value: 'gen',
		name: 'Генеральная',
		description:
			'Комплексная уборка помещения.\nИдеально подходит для подготовки к праздникам, переезду или долгожданному отдыху.',
		price: {
			coef: 1.4,
			unit: false
		}
	},
	{
		value: 'zapushenie',
		name: 'Запущенные',
		description:
			'Уборка сильно загрязнённых помещений.\nОчистка от старой пыли, пятен, налёта, мусора.\n Подходит для объектов после длительного простоя.',
		price: {
			coef: 0.5,
			unit: false
		}
	},
	{
		value: 'himcistka',
		name: 'Химчистка',
		description:
			'Удаление стойких загрязнений и въевшейся грязи.\nОбеззараживание и устранение неприятных запахов.',
		price: {
			coef: 0.2,
			unit: true
		}
	},
	{
		value: 'hipo',
		name: 'Гипоаллергенная',
		description:
			'Уборка с использованием безопасных средств.\nОсобое внимание уделяется удалению пыли, аллергенов и загрязнений в труднодоступных местах.\nПодходит для чувствительных людей и семей с детьми.',
		price: {
			coef: 0.3,
			unit: false
		}
	},
	{
		value: 'tuman',
		name: 'Сухой туман',
		description:
			'Инновационная технология глубокой очистки без разводов и длительного высыхания.\n\nИспользуется для дезинфекции и удаления сложных загрязнений в помещениях любого типа.',
		price: {
			coef: 0.2,
			unit: false
		}
	}
];

export const PLACE_TYPES = [
	{
		value: 'kvartira',
		name: 'Квартира',
		coef: 1
	},
	{
		value: 'dom',
		name: 'Дом/Коттедж/Таунхаус/Дача',
		coef: 1.3
	},
	{
		value: 'office',
		name: 'Офис',
		coef: 1.2
	},
	{
		value: 'targovii-centr',
		name: 'Бизнес/Торговый центр',
		coef: 1.6
	},
	{
		value: 'other',
		name: 'Другая',
		coef: 1
	}
];

export const OTHER_SERVICES = [
	{ name: 'Чистка кухонной техники', value: 'cuh-tehnika', coef: 1.1 },
	{ name: 'Мойка окон', value: 'okna', coef: 1.3 },
	{ name: 'Убрать шерсть животных', value: 'shersti', coef: 1.1 },
	{ name: 'Химчистка мягкой мебели', value: 'him-mebeli', coef: 1.2 },
	{ name: 'Химчистка ковров', value: 'him-kovri', coef: 1.2 },
	{ name: 'Стирка и глажка штор', value: 'stori', coef: 1.1 },
	{ name: 'Уборка внутри шкафов', value: 'skafi', coef: 1.1 },
	{ name: 'Удаление запахов в помещении', value: 'zapahi', coef: 1.1 }
];

export const API_RESPONSE = {
	success:
		'Ваша заявка принята в обработку. Наш менеджер свяжется с вами в ближайшее время.',
	error: 'В данный момент невозможно отправить заявку, мы уже решаем эту проблему, отправьте заявку позже.'
};

export const SEO = {
	title: 'Профессиональный клининг помещений',
	description:
		'Предлагаем профессиональные услуги по уборке жилых и коммерческих помещений.'
};

export const LOCATIONS = [
	{
		name: 'Москва',
		value: 'moscow'
	},
	{
		name: 'Ярославль',
		value: 'yaroslavl'
	},
	{
		name: 'Херсон',
		value: 'herson'
	}
];
