export interface User {
    id: number,
    email: string,
    nome: string,
}

export interface UserWithPassword {
    id: number,
    email: string,
    name: string,
    password: string,
    isAdmin: false,
}

export interface UserLogin {
    email: string,
    password: string,
}