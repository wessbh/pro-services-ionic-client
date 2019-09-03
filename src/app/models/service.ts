
export class Service {
    constructor(id: string, libelle:string, image: string, id_category: string){
        this.id = id;
        this.libelle = libelle;
        this.image = image;
        this.id_category = id_category;
    }

    id: string;
    libelle: string;
    image: string;
    id_category: string;

}