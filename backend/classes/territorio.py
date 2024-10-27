from pydantic import BaseModel

class Parroquia(BaseModel):
    id: int
    nombre: str

class Municipio(BaseModel):
    id: int
    nombre: str
    parroquias: list[Parroquia]

class Estado(BaseModel):
    id: int
    nombre: str
    municipios: list[Municipio]