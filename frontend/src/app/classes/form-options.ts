import { Estado } from "./estado";

/**
 * Contiene las opciones disponibles de los items de selección simple o múltiple del formulario de Inspección Técnica de Estación GNV.
 * @class
 */
export class FormOptions01 {
    constructor(
        public estados: Estado[]
    ){}
}
