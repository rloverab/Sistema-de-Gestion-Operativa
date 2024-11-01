import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../services/api.service';
import { FormOptions01 } from '../classes/form-options';
import { Municipio } from '../classes/municipio';
import { Estado } from '../classes/estado';
import { Parroquia } from '../classes/parroquia';
import { NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-go-insp-est-gnv',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatButtonModule
  ],
  templateUrl: './go-insp-est-gnv.component.html',
  styleUrl: './go-insp-est-gnv.component.css'
})
export class GoInspEstGnvComponent {
  private apiService: ApiService = inject(ApiService);
  formOptions: FormOptions01 | undefined;
  municipios: Municipio[] | undefined;
  parroquias: Parroquia[] | undefined;
  tipoConsumo = {}
  //Parte de esto va la base de datos
  respuestas = [{ value: true, nombre: 'Si' }, { value: false, nombre: 'No' }]
  tiposConsumo = [{ nombre: 'Público', requiereHorario: true }, { nombre: 'Privado', requiereHorario: false }]
  horarios = [{ nombre: 'Diurno' }, { nombre: 'Nocturno' }]
  identificacionesServicio = [{ nombre: 'Aire' }, { nombre: 'Agua' }, { nombre: 'Electricidad' }]
  senalesHorizontales = [
    { id: 0, nombre: 'Peligro' },
    { id: 0, nombre: 'No fume' },
    { id: 0, nombre: 'Gas inflamable' },
    { id: 0, nombre: 'Apague el motor' },
    { id: 0, nombre: 'Apague el celular' },
    { id: 0, nombre: 'Máxima altura' },
    { id: 0, nombre: 'Extintor' },
    { id: 0, nombre: 'No Pase. Sólo personal autorizado' },
    { id: 0, nombre: 'Gases inflamables' }
  ]
  senalesVerticales = [
    { id: 0, nombre: 'Flecha de salida' },
    { id: 0, nombre: 'Flecha de circulación interna' },
    { id: 0, nombre: 'Zonas peatonales' },
    { id: 0, nombre: 'Zona de descarga' },
    { id: 0, nombre: 'Obstáculos' },
    { id: 0, nombre: 'Zona de surtidores' }
  ]

  ubicaciones = [
    {id: 0, nombre:'Zona rural industrial'},
    {id: 0, nombre:'Zona comercial'},
    {id: 0, nombre:'Autopista'},
    {id: 0, nombre:'Vías expresas'}
  ]

  tiposEstacion = [
    {id: 0, nombre: 'Mixta'},
    {id: 0, nombre: 'Dedicada'}
  ]

  tiposIsla = [
    {id: 0, nombre: 'Sencilla'},
    {id: 0, nombre: 'Doble'}
  ]

  tiposPavimento = [
    {id: 0, nombre: 'Antideslizante'},
    {id: 0, nombre: 'Concreto'}
  ]

  condicionesIluminacion = [
    {id: 0, nombre: 'Correcta'},
    {id: 0, nombre: 'Incorrecta'}
  ]

  delimitacionesPerimetrales = [
    {id: 0, nombre: 'Franjas amarillas alternas'},
    {id: 0, nombre: 'Muro de 15 cm x 30 cm'}    
  ]

  infraestructuras = [
    {id: 0, nombre: 'Cercada'},
    {id: 0, nombre: 'Descubierta'}
  ]

  malezas = [
    {id: 0, nombre: 'No presente'},
    {id: 0, nombre: 'Escasa'},
    {id: 0, nombre: 'Abundante'}
  ]

  estadosPintura = [
    {id:0 ,nombre:'Pintada'},
    {id:0 ,nombre:'Carece de pintura'}
  ]

  diametroTuberias = [
    {id:0 ,nombre:'2"'},
    {id:0 ,nombre:'4"'}
  ]

  formStep01: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    rif: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    municipio: new FormControl({ value: '', disabled: true }, [Validators.required]),
    parroquia: new FormControl({ value: '', disabled: true }, [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    tipoEstacion: new FormControl('', [Validators.required]),
    horario: new FormControl('', [Validators.required])
  })

  formStep02: FormGroup = new FormGroup({
    tipoIsla: new FormControl('', [Validators.required]),
    iluminacion: new FormControl('', [Validators.required]),
    sh: new FormControl(''),
    sv: new FormControl(''),
    delimitacion: new FormControl(''),
    tipoPavimento: new FormControl(''),
  })

  formStep04: FormGroup = new FormGroup({

  })

  formStep03: FormGroup = new FormGroup({
    infraestructura: new FormControl(''),
    maleza: new FormControl(''),
    estadoPintura: new FormControl(''),
    accesibilidad: new FormControl(''),
    corrosion: new FormControl(''),
    diametroEntrada: new FormControl(''),
    diametroSalida: new FormControl('')
  })

  form01:FormGroup = new FormGroup({
    formStep01: this.formStep01,
    formStep02: this.formStep02,
    formStep03: this.formStep03,
    formStep04: this.formStep04
  })

  form00: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    rif: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    municipio: new FormControl({ value: '', disabled: true }, [Validators.required]),
    parroquia: new FormControl({ value: '', disabled: true }, [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    tipoEstacion: new FormControl('', [Validators.required]),
    tipoIsla: new FormControl('', [Validators.required]),
    iluminacion: new FormControl('', [Validators.required]),
    tipoConsumo: new FormControl('', [Validators.required]),
    horario: new FormControl('', [Validators.required]),
    identificacionServicios: new FormControl(''),
    sh: new FormControl(''),
    sv: new FormControl(''),
    delimitacion: new FormControl(''),
    tipoPavimento: new FormControl(''),
    aglomeracion: new FormControl(''),
    infraestructura: new FormControl(''),
    maleza: new FormControl(''),
    estadoPintura: new FormControl(''),
    accesibilidad: new FormControl(''),
    corrosion: new FormControl(''),
    diametroEntrada: new FormControl(''),
    diametroSalida: new FormControl('')
  });

  ngOnInit(): void {
    // this.addFormControlSenales()
    this.fillFormOptions()
    this.onSelectionChangeTipoConsumo()
  }

  async fillFormOptions() {
    this.formOptions = await this.apiService.getFormOptions01()
    // this.addFormControlSenales()
  }

  // addFormControlSenales() {
  //   this.senalesHorizontales.forEach(e => {
  //     const formControlName = `sh_${e.id}`
  //     this.form01.addControl(formControlName, new FormControl('', [Validators.required]))
  //   })

  //   this.senalesVerticales.forEach(e => {
  //     const formControlName = `sv_${e.id}`
  //     this.form01.addControl(formControlName, new FormControl('', [Validators.required]))
  //   })
  // }

  getFormControlName(prefix: string, id: number) {
    return `${prefix}${id}`
  }

  onSelectionChangeEstado() {
    let estado: Estado = this.form00.get('estado')?.value

    if (estado != undefined) {
      this.municipios = estado.municipios
      this.form00.get('municipio')?.enable()
    } else {
      this.municipios = []
      this.form00.get('municipio')?.disable()
    }

    this.form00.get('municipio')?.setValue(undefined)
  }

  onSelectionChangeMunicipio() {
    let municipio: Municipio = this.form00.get('municipio')?.value

    if (municipio != undefined) {
      this.parroquias = municipio.parroquias
      this.form00.get('parroquia')?.enable()
    } else {
      this.parroquias = []
      this.form00.get('parroquia')?.disable()
    }

    this.form00.get('parroquia')?.setValue(undefined)
  }

  onSelectionChangeTipoConsumo() {
    let tipoConsumo = this.form00.get('tipoConsumo')?.value
    let horario = this.form00.get('horario')

    if (tipoConsumo && tipoConsumo.requiereHorario) {
      horario?.enable()
    } else {
      horario?.reset()
      horario?.disable()
    }

  }
}
