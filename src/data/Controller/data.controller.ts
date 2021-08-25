import { 
    Controller, 
    Get,
    Post,
    Body,
    HttpException, 
    Param,
    UseGuards,
    Query
} from '@nestjs/common';
import { DataService } from '../Service';
import { CreateDataDTO, DataIdPath } from '../Models';
import { DataEntity } from '../Entity';
import { JwtBandAuthGuard, JwtWebAuthGuard } from 'src/auth/Guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
 
@Controller('data')
export class DataController {
    constructor(private readonly dataService:DataService ){ }

    @UseGuards(JwtBandAuthGuard)
    @ApiTags('data')
    @ApiResponse({ 
        status: 201, 
        description: 'Dado criado',
        type: DataEntity
        })
    @Post()
    async createData(@Body() newData:CreateDataDTO ):Promise<DataEntity>{
        try{
            const Response= await this.dataService.createData(newData);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAuthGuard)
    @ApiTags('data')
    @Get()
    async getAllData():Promise<DataEntity[]>{
        try{
            const Response= await this.dataService.getAllDatas();
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAuthGuard)
    @ApiTags('data')
    @Get(':node')
    async getDataById( @Param() dataId:DataIdPath, @Query('dataInicio') dataInicio:number, @Query('dataFim') dataFim:number  ):Promise<DataEntity[]>{
        try{
            console.log(dataInicio)
            if(!dataInicio || typeof(dataInicio) !== 'number'){
                dataInicio = new Date().getTime();
            }
            if(!dataFim || typeof(dataFim) !== 'number'){
                dataFim = new Date().getTime();
            }
            const Response = await this.dataService.getDataById(dataId,dataInicio,dataFim);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
}
