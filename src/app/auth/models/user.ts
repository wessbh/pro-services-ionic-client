import { Card } from "./card";

export class User {
    constructor(user_type: User_type, email: string, nom: string, prenom: string, num_portable: number, num_fixe: number, image: string){
        this.user_type = user_type;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.num_portable = num_portable;
        this.num_fixe = num_fixe;
        this.image = image;
    }

    id: number;
    user_type: User_type;
    email: string;
    nom: string;
    prenom: string;
    num_portable: number;
    num_fixe: number;
    image: string;
    cards: Card[];
}
enum User_type{
    client,
    pro
}