import { Municipio } from "./municipio";

export class Estado {
    constructor(
        public id: number,
        public nombre: string,
        public municipios: Municipio[]
    ){}
}