export interface User {
    id: number,
    email: string,
    nome: string,
}

export interface UserWithPassword {
    id: number,
    email: string,
    nome: string,
    password: string,
    isAdmin: boolean,
}
