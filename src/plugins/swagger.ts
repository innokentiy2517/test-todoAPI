import fp from "fastify-plugin";
import {SwaggerOptions, fastifySwagger} from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export default fp<SwaggerOptions>(async (fastify) => {
    await fastify.register(fastifySwagger, {
        openapi:{
            openapi: '3.0.0',
            info: {
                title: 'TODO API',
                version: '0.0.1',
            },
            components: {

            },
            tags: [
                {
                    name: 'todo',
                    description: 'Todo operations',
                },
            ],
        }
    })
    await fastify.register(fastifySwaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            deepLinking: false,
            docExpansion: 'full',
        },
        uiHooks: {
            onRequest: function (request, reply, next) {
                next()
            },
            preHandler: function (request, reply, next) {
                next()
            },
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => {return swaggerObject},
        transformSpecificationClone: true,
    })
})
