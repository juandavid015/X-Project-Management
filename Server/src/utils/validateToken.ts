import {verify, VerifyOptions} from 'jsonwebtoken';
import {JwksClient} from 'jwks-rsa';
import 'dotenv/config'


const client = new JwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})

const getKey = (header, callback)=> {

    client.getSigningKey(header.kid, function(err, key) {
        if (err) {
            console.log('err2', err.message)
            callback(err)
        } else {
            let signingKey = key.getPublicKey();
            callback(null, signingKey);
        }
    })
    
    
}
export const validateToken = (token: string) => {
    
    const options: VerifyOptions = { algorithms: ['RS256'] };
  
    // Once verified will return the decoded token
    return new Promise((resolve, reject) => {
        verify(token, getKey, options, function(err, decoded) {
    
            if(err) {
                console.log('err', err)
                reject(new Error(err.message))
            } else {
                console.log('es', decoded)
                resolve(decoded)
            }
        })      
    })
   
    
}