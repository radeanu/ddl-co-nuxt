module.exports = {
	apps: [
		{
			name: 'ddl-server',
			cwd: './ddl-server/',
			script: 'dist/index.js',
			env: {
				PORT: '4000',
				HOST: 'localhost',
				NODE_ENV: 'production',
				DATABASE_URL: 'mysql://root:1111@localhost:3306/ddl-co',
			},
		},
		{
			name: 'ddl-tg-bot',
			cwd: './ddl-tg-bot/',
			script: 'dist/index.js',
			env: {
				ADMIN_TG_ID: '800438908',
				NODE_ENV: 'production',
				BOT_TOKEN: '123',
				DATABASE_URL: 'mysql://root:1111@localhost:3306/ddl-co',
			},
		},
	],
};
