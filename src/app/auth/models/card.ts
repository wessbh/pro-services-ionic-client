export class Card {
    constructor(card_type: string, card_number: number, expiration_date?: Date, cvv?: number, password_edinar?: number){
        this.card_number = card_number;
        this.card_type = card_type;
        this.expiration_date = expiration_date;
        this.cvv = cvv;
        this.password_edinar = password_edinar;
    }
    id: number;
    card_number: number;
    card_type: string;
    expiration_date: Date;
    cvv: number;
    password_edinar: number;
}

export enum card_type{
    edinar = 'edinar',
    credit_card = 'credit'
}

