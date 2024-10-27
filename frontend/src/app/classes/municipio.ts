import { Parroquia } from "./parroquia";

export class Municipio {
    constructor(
        public id: number,
        public nombre: string,
        public parroquias: Parroquia[]
    ){}
}