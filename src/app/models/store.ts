import { User } from "./user"

export interface Store {
    storeName: string
    managers: User[]
}