import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtWebAdminAuthGuard extends AuthGuard('JwtWebAdminStrategy') {

    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new HttpException(info.message, 401);
        }
        return user;
    }
}