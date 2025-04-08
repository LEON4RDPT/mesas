import { Mesa } from "./mesas";
import { User } from "./users";

export interface Reserva {
    id: number,
    mesa: Mesa,
    user: User,
    dataReserva: string;
    dataInicio: string;
    dataFim: string;
}


export interface ReservaPost {
    mesaId: number;
    userId: number;
    dataInicio: string;
    dataFim: string;
  }