import { Cidade } from "src/app/cidade/model/cidade";

export interface Usuario {
    id: number;
    nome: string;
    login: string;
    senha: string;
    cidade: Cidade;
    imageFile: File;
    nomeFile: string;
}


