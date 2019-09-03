import { Service } from './service';

export class Category {
    constructor(id: string, id_domaine: string,  libelle:string, image: string){
        this.id = id;
        this.id_domaine = id_domaine;
        this.id_domaine = this.id_domaine;
        this.libelle = libelle;
        this.image = image;
    }

    id: string;
    id_domaine: string;
    libelle: string;
    image: string;
    services: [Service];

}