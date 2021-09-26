import { Response, Router } from 'express'
import twilio from 'twilio';
import { TokenSchema as TokenSchemaInterface } from '../interfaces';
import { TokenSchema } from '../schemas/token';
import { Req } from '../types/RequestInterface';
import validator from '../validator';

export const tokenRouter = Router()

const { AccessToken } = twilio.jwt;
const VideoGrant = AccessToken.VideoGrant

tokenRouter.get('/', validator.query(TokenSchema), (req: Req<TokenSchemaInterface>, res: Response) => {
  const accessToken = new AccessToken(
    process.env.ACCOUNT_SID,
    process.env.API_KEY_SID,
    process.env.API_KEY_SECRET,
  );

  // Set the Identity of this token
  accessToken.identity = req.query.username;

  // Grant access to Video
  const grant = new VideoGrant();
  accessToken.addGrant(grant);

  // Serialize the token as a JWT
  var jwt = accessToken.toJwt();
  return res.send({ jwt, code: 200 });
});