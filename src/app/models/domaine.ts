import { Category } from './category';

export class Domaine {
    constructor(id: string, libelle:string, image: string){
        this.id = id;
        this.libelle = libelle;
        this.image = image;
        this.categories = []
    }

    id: string;
    libelle: string;
    image: string;
    categories:any;
}