import {PrismaClient} from '@prisma/client';
import fp from "fastify-plugin";

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

export default fp(async (fastify) => {
    const prisma = new PrismaClient();
    prisma.$connect();
    fastify.decorate('prisma', prisma);
    fastify.addHook('onClose', async (instance) => {
        await instance.prisma.$disconnect();
    })
});
