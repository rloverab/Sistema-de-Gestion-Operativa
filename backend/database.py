import pandas as pd
from pymongo import MongoClient
from classes.territorio import Estado,Municipio,Parroquia

client = MongoClient("mongodb://localhost:27017")

def insert_territorios(pathfile_csv:str) -> list[Estado]:
    df = pd.read_csv(pathfile_csv,delimiter=';')
    estados:list[Estado] = []

    for estado in df['Estado'].unique():        
        re = df[df['Estado'] == estado]
        e:Estado = Estado(**{"id":len(estados) + 1, "nombre":estado, "municipios":[]})
        estados.append(e)
        
        def get_municipios() -> list[Municipio]:
            nonlocal re
            municipios:list[Municipio] = []

            for municipio in re['Municipio'].unique():
                rm = re[re['Municipio'] == municipio]                
                m:Municipio = Municipio(**{"id":len(municipios) + 1, "nombre":municipio, "parroquias":[]})                        
                municipios.append(m)

                def get_parroquias() -> list[Parroquia]:
                    nonlocal rm
                    parroquias:list[Parroquia] = []

                    for parroquia in rm['Parroquia']:
                        p:Parroquia = Parroquia(**{"id":len(parroquias) + 1, "nombre":parroquia})
                        parroquias.append(p)

                    return parroquias
                
                m.parroquias = get_parroquias()

            return municipios
        
        e.municipios = get_municipios()

    return estados

def find_estados(filter = {}):
    db = client["sgo"]
    collection = db["estados"]
    results = collection.find(filter)
    estados = [Estado(**result) for result in results]
    return estados