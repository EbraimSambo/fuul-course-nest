import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt} from "passport-jwt";
import { authConstant } from "../auth.constants";
import { PayloadType } from "../auth.types";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConstant.secret,
          });
    }

    async validate(payload: PayloadType) {
        return { 
          userId: payload.userId, 
          email: payload.email,
          artistId: payload.userId
        };
      }
}