export interface Mesa {
    id: number,
    timeLimit: number,
    localX: number,
    localY: number,
    capUsers: number,
    ativo: boolean
}
export interface MesaGetAll {
    mesas: Mesa[]
}