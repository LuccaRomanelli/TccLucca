import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    teste():string{
        try {
            return 'Funciona, like magic'
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
}
