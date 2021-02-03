const axios= require('axios')
const config= require('../config/aws-config.json')

const COGNITO_URL = `https://cognito-idp.${config.cognito.REGION}.amazonaws.com/`

const AdminAuthMiddleware = async (req, res, next) => {
    const userType= req.headers.usertype

    if(userType === 'admin'){
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
    
            const { data } = await axios.post(
                COGNITO_URL,
                {
                    AccessToken: accessToken
                },
                {
                    headers: {
                        "Content-Type": "application/x-amz-json-1.1",
                        "X-Amz-Target": "AWSCognitoIdentityProviderService.GetUser"
                    }
                }
            )
    
            req.user = data;
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    }

    else {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

module.exports= AdminAuthMiddleware