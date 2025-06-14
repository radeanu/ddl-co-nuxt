import { PrismaClient } from '@prisma/client';

console.log('Create prisma client...');

const prisma = new PrismaClient({
	log: undefined
});

export type PrismaTransactionClient = Parameters<
	Parameters<PrismaClient['$transaction']>[0]
>[0];

export type PrismaTransaction = Omit<
	PrismaClient,
	'$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export default prisma;
