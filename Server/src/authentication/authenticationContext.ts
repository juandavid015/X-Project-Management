import { Request } from "express";
import { generateUserModel } from "../models/User.js";
import { generateTaskModel } from "../models/Task.js";
import { generateProjectModel } from "../models/Project.js";
import { pubsub } from "../index.js";
import { authenticateUser } from "./authenticateUser.js";

interface HttpRequestContext {
    req: Request
  }
interface WebSocketContext {
    connectionParams?: {
        authentication?: string;
    };
}
type AuthenticationContext = HttpRequestContext | WebSocketContext;

export const globalContextAuthentication = async (ctx: AuthenticationContext ) => {

    let authorization: string = '';
    
    if ('req' in ctx) {
        // This is an HTTP request
        const { req } = ctx;
        authorization = req.headers.authorization || null;
        // Rest of authentication logic for HTTP
        // ...
    } else {
      
        // This is a WebSocket connection
        const { connectionParams } = ctx;
        authorization = connectionParams.authentication || null;
        // Rest of authentication logic for WebSocket
        // ...
    }
    
    const { 
        userAuthenticated,
        userHasPartialAccess,
        userWithPartialAccess,
        userIsAuthenticated
    } = await authenticateUser(authorization)

    return {
        userIsLoggedIn: userIsAuthenticated,
        userAuthenticated: userAuthenticated,
        userHasPartialAccess: userHasPartialAccess,
        userWithPartialAccess: userWithPartialAccess,
        models: {
            User: generateUserModel(userAuthenticated),
            Task: generateTaskModel({userIsAuthenticated, pubsub}),
            Project: generateProjectModel({userIsAuthenticated, userHasPartialAccess, userAuthenticated, userWithPartialAccess})
        }
    
    }
}