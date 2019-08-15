export class Card {
    constructor(card_type: card_type, card_number: number, expiration_date?: Date, cvv?: number, password_edinar?: number){
        this.card_number = card_number;
        this.card_type = card_type;
        this.expiration_date = expiration_date;
        this.cvv = cvv;
        this.password_edinar = password_edinar;
    }
    private id: number;
    private card_number: number;
    private card_type: card_type;
    private expiration_date: Date;
    private cvv: number;
    private password_edinar: number;
}

enum card_type{
    edinar,
    credit_card
}

