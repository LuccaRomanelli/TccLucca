
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';


export class CreateDataDTO {  
    @IsNotEmpty()
    node: string;
  
    @IsNotEmpty()
    time_utc: string;
  
    @IsNotEmpty()
    seqno: string;
  
    @IsNotEmpty()
    rssi: string;
  
    @IsNotEmpty()
    snr: string;
  
    @IsNotEmpty()
    senStatus: string;
  
    @IsNotEmpty()
    heart_Rate: string;
  
    @IsNotEmpty()
    temperature_degC: string;
  
    @IsNotEmpty()
    oximetry: string;
  
    @IsNotEmpty()
    respiratory_rate: string;
}

export class DataIdPath {
    @IsNotEmpty()
    node: string;
}