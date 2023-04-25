import { User } from "./user"

export interface Instrument {
    brand: string
    model: string
    serial_number: string
    store_name: string
    user: User
}