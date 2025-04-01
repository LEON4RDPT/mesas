import { Mesa } from "./mesas";
import { User } from "./users";

export interface Reserva {
    id: number,
    mesa: Mesa,
    user: User,
    dataReserva: Date
    dataInico: Date;
    dataFim: Date;
}
