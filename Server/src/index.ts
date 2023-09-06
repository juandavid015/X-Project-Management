import { ApolloServer } from '@apollo/server';
import { UserDataSource, } from './models/User.js';
import { TaskDataSource,} from './models/Task.js';
import { ProjectDataSource, } from './models/Project.js';
import { authenticationAndAccessGuard } from './plugins/plugins.js';
import express from 'express';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
// import { PubSub } from 'graphql-subscriptions';
import { UserAuthenticated, UserWithPartialAccess} from './authentication/authenticateUser.js';
import { globalContextAuthentication } from './authentication/authenticationContext.js';
import { typeDefs } from './typeDefs/index.js';
import { resolvers } from './resolvers/index.js';
import { wsAccessGuardConnection } from './authentication/wsAuthenticationConnection.js';
import { MongoClient} from 'mongodb'
import { MongodbPubSub } from 'graphql-mongodb-subscriptions';
import dotenv from 'dotenv'
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
// model to track events that update active subscriptions
export const pubsub = new MongodbPubSub({connectionDb: mongoClient.db()});

export interface MyContext {
    userIsLoggedIn: boolean,
    userAuthenticated: UserAuthenticated
    userHasPartialAccess: boolean
    userWithPartialAccess: UserWithPartialAccess
    models: {
        User: UserDataSource,
        Project: ProjectDataSource,
        Task: TaskDataSource
    }
}
// Required logic for integrating with Express
const app = express();

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = createServer(app);

// Create schema, which will be used separately by ApolloServer and
// the WebSocket server.
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Set up WebSocket/subscription server for enable bi-directional comunnication
// for real time data transfer.
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer(
    {
        schema,
        context: async (ctx) => {
            return await globalContextAuthentication(ctx);
        },
        onConnect: async(ctx) => {
            // Check authentication every time a client connects.
            return await wsAccessGuardConnection(ctx);
        },
        onDisconnect() {
            console.log('Disconnected!');
        },
    },
    wsServer
);

// Same ApolloServer initialization as before, plus the drain plugins
// for our httpServer and for authentication.
const server = new ApolloServer<MyContext>({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({httpServer}),
        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
              return {
                async drainServer() {
                  await serverCleanup.dispose();
                },
              };
            },
        },
        // Handle the authentication flow
        authenticationAndAccessGuard
    ],
    
  });

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
        context: async ({req})=> {
            return await globalContextAuthentication({req})
         
        },
    })
)
const PORT = 4000;
// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/`);
  });