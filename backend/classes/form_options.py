from pydantic import BaseModel
from classes.territorio import Estado

class FormOptions01(BaseModel):
    estados: list[Estado]
