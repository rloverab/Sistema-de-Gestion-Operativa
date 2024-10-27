from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import find_estados
from classes.form_options import FormOptions01

app = FastAPI()
origins = [
    "http://localhost:4200"    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers={"*"}
)

@app.get("/api/form01")
async def get_fields():
    form_options = FormOptions01(**{
        'estados': find_estados()
    })

    return form_options