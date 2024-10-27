import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../services/api.service';
import { FormOptions01 } from '../classes/form-options';
import { Municipio } from '../classes/municipio';
import { Estado } from '../classes/estado';
import { Parroquia } from '../classes/parroquia';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-go-insp-est-gnv',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule,ReactiveFormsModule,NgFor],
  templateUrl: './go-insp-est-gnv.component.html',
  styleUrl: './go-insp-est-gnv.component.css'
})
export class GoInspEstGnvComponent {
  private apiService:ApiService = inject(ApiService);
  formOptions: FormOptions01 | undefined;
  municipios: Municipio[] | undefined;
  parroquias: Parroquia[] | undefined;

  form01:FormGroup = new FormGroup({
    estado: new FormControl(undefined,[Validators.required]),
    municipio: new FormControl({value:undefined, disabled:true},[Validators.required]),
    parroquia: new FormControl({value:undefined, disabled:true},[Validators.required])
  });

  ngOnInit(): void {
    this.fillFormOptions()
  }

  async fillFormOptions(){
    this.formOptions = await this.apiService.getFormOptions01()
  }
  
  onSelectionChangeEstado(){
    let estado:Estado = this.form01.get('estado')?.value
    
    if(estado != undefined){
      this.municipios = estado.municipios
      this.form01.get('municipio')?.enable()
    }else{
      this.municipios = []
      this.form01.get('municipio')?.disable()
    }

    this.form01.get('municipio')?.setValue(undefined)
  }

  onSelectionChangeMunicipio(){
    let municipio:Municipio = this.form01.get('municipio')?.value
    
    if(municipio != undefined){
      this.parroquias = municipio.parroquias
      this.form01.get('parroquia')?.enable()
    }else{
      this.parroquias = []
      this.form01.get('parroquia')?.disable()
    }

    this.form01.get('parroquia')?.setValue(undefined)
  }
}
