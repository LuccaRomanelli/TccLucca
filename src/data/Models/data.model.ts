
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class CreateDataDTO {  
    @IsNotEmpty()
    @ApiProperty()
    node: string;
  
    @IsNotEmpty()
    @ApiProperty()
    time_utc: Date;
  
    @IsNotEmpty()
    @ApiProperty()
    seqno: string;
  
    @IsNotEmpty()
    @ApiProperty()
    rssi: string;
  
    @IsNotEmpty()
    @ApiProperty()
    snr: string;
  
    @IsNotEmpty()
    @ApiProperty()
    senStatus: string;
  
    @IsNotEmpty()
    @ApiProperty()
    heart_Rate: string;
  
    @IsNotEmpty()
    @ApiProperty()
    temperature_degC: string;
  
    @IsNotEmpty()
    @ApiProperty()
    oximetry: string;
  
    @IsNotEmpty()
    @ApiProperty()
    position: string;
}

export class DataIdPath {
    @IsNotEmpty()
    @ApiProperty()
    node: string;
}