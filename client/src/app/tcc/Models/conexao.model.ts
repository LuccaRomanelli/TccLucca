export interface ConexaoDTO {
    id?: number;
    pulseiraFkId: string;
    pacienteFk: number;
    dataInicio?: Date;
    dataFim?: Date;
}