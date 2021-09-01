import { HttpException, Injectable } from '@nestjs/common';
import * as Sendgrid from '@sendgrid/mail';

interface SendGridEmailWithTemplate {
    to: string[];
    from: string;
    templateId: string;
    dynamicTemplateData: any;
}

interface SendGridNewUserEmailTemplate {
    email:string;
    password: string;
    name: string,
    apiUrl: string
}

@Injectable()
export class SendGridService {

    constructor() {
        Sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
    }

    async sendNewUserEmail(destinatario: string, newUserPassord: string) {
        try {

            const Data: SendGridNewUserEmailTemplate = {
                email:destinatario,
                password: newUserPassord,
                name: destinatario.split('@')[0],
                apiUrl: process.env.API_URL
            }

            const NewEmail: SendGridEmailWithTemplate = {
                to: [destinatario],
                from: process.env.SENDGRID_EMAIL_REMETENTE,
                templateId: process.env.SENDGRID_NEW_USER_TEMPLATE_ID,
                dynamicTemplateData: Data
            }

            const Response = await this.newUserEmailAPICall(NewEmail);
            return Response
        }
        catch (Error) {
            console.log(Error)
            throw Error
        }
    }

  private async newUserEmailAPICall(email: SendGridEmailWithTemplate) {
    try{
        const Response = await Sendgrid.send(email).then().catch(err => {
            throw new HttpException('Falha ao enviar email', err.code)
        })

        return Response
    }
    catch(err){
        if(err instanceof HttpException){
            throw err
        }

        throw new HttpException(err.message, 400)
    }
    return 
  }

}