import json
from pymongo import MongoClient
from pymongo.errors import BulkWriteError
from database import insert_territorios

client = MongoClient("mongodb://localhost:27017")

def load_territorios(pathfile_csv:str):
    estados = insert_territorios(pathfile_csv=pathfile_csv)
    db = client["sgo"]
    collection = db["estados"]    
    collection.create_index("id",unique=True)

    if len(estados) > 0:
        try:            
            collection.insert_many(json.loads(json.dumps(estados, default=lambda o: o.__dict__, ensure_ascii=False)))
        except BulkWriteError as bwe:
            print(bwe.details["writeConcernErrors"])

load_territorios('./backend/data/territorios.csv')