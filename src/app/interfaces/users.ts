export interface User {
    id?: number,
    email?: string,
    name?: string,
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