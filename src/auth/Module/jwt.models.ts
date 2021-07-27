export interface JWTWebPayload{
    id: number;
    email: string;
    password: string;
    role: string;
}
export interface JWTBandPayload{
    node: string;
    status: number;
}