import { GraphQLError } from "graphql"
import { authenticateUser } from "./authenticateUser.js";
import { Context as WsContext } from "graphql-ws";

export const wsAccessGuardConnection = async(ctx: WsContext) => {
     // Check authentication every time a client connects.
     if (ctx.connectionParams.authentication) {
        // You can return false to close the connection  or throw an explicit error
        let authorization = ctx.connectionParams.authentication as string;
        const {userAuthenticated, userWithPartialAccess} = await authenticateUser(authorization)
        
        return {
            userAuthenticated: userAuthenticated,
            userWithPartialAccess: userWithPartialAccess,
            
        }
    } else {
        throw new GraphQLError('Missing authentication credentials')
    }

}