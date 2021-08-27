import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TelefoneMask , CpfMask } from '../../../Utils';
import { FilterOptions, PacienteDTO } from '../../../Models';
import { PacienteService } from '../../../Services';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss']
})
export class PacienteFormComponent implements OnInit, AfterViewInit {

  TelefoneMask = TelefoneMask;
  CpfMask = CpfMask;
  statusOptions: FilterOptions[] = [];
  disableButton: boolean = false;
  pacienteId: number|null;
  title:string;

  pacienteForm = this.fb.group({
    nome: [null,[Validators.required]],
    idade:[null,[Validators.required]],
    sexo: [null,[Validators.required]],
    telefone: [null,[Validators.required]],
    contatoEmergencia: [null,[Validators.required]],
    telefoneEmergencia: [null,[Validators.required]],
    cpf: [null,[Validators.required]],
    sintomas: [null,[Validators.required]],
    historico: [null,[Validators.required]]
  })

  constructor(
    private readonly fb:FormBuilder,
    private readonly router:Router,
    private readonly pacienteService:PacienteService,
    private readonly route:ActivatedRoute
  ) { }

  ngOnInit() {
  }

  async ngAfterViewInit(){
    this.pacienteId = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : null;
    if(this.pacienteId){
      const Paciente = await this.pacienteService.getPacienteById(this.pacienteId);
      if (Paciente){
        this.pacienteForm.controls.nome.setValue(Paciente.nome);
        this.pacienteForm.controls.idade.setValue(Paciente.idade);
        this.pacienteForm.controls.sexo.setValue(Paciente.sexo);
        this.pacienteForm.controls.telefone.setValue(Paciente.telefone);
        this.pacienteForm.controls.contatoEmergencia.setValue(Paciente.contatoEmergencia);
        this.pacienteForm.controls.telefoneEmergencia.setValue(Paciente.telefoneEmergencia);
        this.pacienteForm.controls.cpf.setValue(Paciente.cpf);
        this.pacienteForm.controls.sintomas.setValue(Paciente.sintomas);
        this.pacienteForm.controls.historico.setValue(Paciente.historico);
      } else {
        this.cancel();
      }
    }
    setTimeout(() => {
      this.title = this.pacienteId ? 'Editar' : 'Criar';
    });
  }

  cancel(){
    this.router.navigate(['/home/paciente']);
  }

  disableButtons(status: boolean){
    this.disableButton = status;
  }

  async save(){
    if(this.pacienteForm.valid){
      this.disableButtons(true);
      const PacienteFromForm = this.getFormAsPacienteDTO();
      if(this.pacienteId){
        const EditResponse = await this.pacienteService.updatePaciente( this.pacienteId, PacienteFromForm);
        if(EditResponse){
          this.cancel();
        }
      }
      else{
        const CreateResponse = await this.pacienteService.cratePaciente(PacienteFromForm);
        if(CreateResponse){
          this.cancel();
        }
      }
      this.disableButtons(false);
    }
  }

  getFormAsPacienteDTO():PacienteDTO{
    const NewPaciente:PacienteDTO = {
      id: this.pacienteId,
      nome: this.pacienteForm.controls.nome.value,
      idade: this.pacienteForm.controls.idade.value,
      sexo: this.pacienteForm.controls.sexo.value,
      telefone: this.pacienteForm.controls.telefone.value,
      contatoEmergencia: this.pacienteForm.controls.contatoEmergencia.value,
      telefoneEmergencia: this.pacienteForm.controls.telefoneEmergencia.value,
      cpf: this.pacienteForm.controls.cpf.value,
      sintomas: this.pacienteForm.controls.sintomas.value,
      historico: this.pacienteForm.controls.historico.value

    }
    return NewPaciente;
  }

}
