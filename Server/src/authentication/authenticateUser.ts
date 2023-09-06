import { validatePublicToken, validateToken } from "../utils/validateToken";

export type UserAuthenticated = {
    id?: string,
    name: string,
    email: string,
    image: string, 
    emailIsVerified: boolean
}
export type UserWithPartialAccess = & UserAuthenticated 

export const authenticateUser = async (authorizationToken: string) => {

    let token = authorizationToken && authorizationToken.startsWith('bearer') && authorizationToken.split(' ')[1] ;
    let identifier = authorizationToken && authorizationToken.startsWith('publicIdentifier') && authorizationToken.split(' ')[1];
    let projectCode = '';
    let decodedAccesToken: unknown;
    let userIsAuthenticated: boolean;
    let userAuthenticated:UserAuthenticated;
    let userWithPartialAccess: UserWithPartialAccess;
    let userHasPartialAccess: boolean;
    let decodedPublicAccessToken: unknown;

    try {
        projectCode = '';
        decodedPublicAccessToken = identifier && await validatePublicToken(identifier)
        decodedAccesToken = token && await validateToken(token);

        userIsAuthenticated = decodedAccesToken ? true : false
        userHasPartialAccess = decodedPublicAccessToken ? true : false
        

        const {id, name, email, image, emailIsVerified} = 
        decodedAccesToken ? decodedAccesToken as UserAuthenticated:
        decodedPublicAccessToken as UserWithPartialAccess

        userAuthenticated = {id, name, email, image, emailIsVerified} 
        userWithPartialAccess = {id, name, email, image, emailIsVerified} 


        
    } catch (error) {
        console.error('Invalid user credentials. Invalid token.')
    }

    return { userAuthenticated, userWithPartialAccess, userHasPartialAccess, userIsAuthenticated }
}