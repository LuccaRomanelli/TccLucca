import { 
    Controller, 
    Get,
    Post,
    Body,
    HttpException, 
    Param,
    UseGuards} from '@nestjs/common';
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
    @Get(':id')
    async getDataById( @Param() dataId:DataIdPath):Promise<DataEntity>{
        try{
            const Response= await this.dataService.getDataById(dataId);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
}
