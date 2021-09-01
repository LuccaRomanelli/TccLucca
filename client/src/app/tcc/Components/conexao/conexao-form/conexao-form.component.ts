import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConexaoDTO, PacienteDTO, PulseiraDTO } from '../../../Models';
import { PulseiraService, PacienteService, ConexaoService, FeedbackService } from '../../../Services';

@Component({
  selector: 'app-conexao-form',
  templateUrl: './conexao-form.component.html',
  styleUrls: ['./conexao-form.component.scss']
})
export class ConexaoFormComponent implements OnInit {

  conexionForm = this.fb.group({
    paciente: [null,[Validators.required]],
    pulseira: [null,[Validators.required]],
  })

  pacientesDataSource: MatTableDataSource<PacienteDTO>;
  pulseirasDataSource: MatTableDataSource<PulseiraDTO>;
  disableButton: boolean = false;
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly pacienteService: PacienteService,
    private readonly pulseiraService: PulseiraService,
    private readonly conexaoService: ConexaoService,
    private readonly feedbackService:FeedbackService,
    private readonly router:Router
  ) { }

  ngOnInit() {
    this.pacienteService.getAllPacientes();
    this.pulseiraService.getAllAvailablePulseiras();

    this,this.pacienteService.getPacientesList().subscribe(pacientes => {
      this.setPacientesDataSource(pacientes)
    })

    this.pulseiraService.getPulseirasList().subscribe(pulseiras => {
      this.setPulseirasDataSource(pulseiras)
    })
  }

  setPacientesDataSource(pacientes:PacienteDTO[]){
    this.pacientesDataSource = new MatTableDataSource<PacienteDTO>(pacientes);
    this.pacientesDataSource.filteredData = this.pacientesDataSource.data.slice(0,10);
  }

  setPulseirasDataSource(pulseiras:PulseiraDTO[]){
    this.pulseirasDataSource = new MatTableDataSource<PulseiraDTO>(pulseiras);
    this.pulseirasDataSource.filteredData = this.pulseirasDataSource.data.slice(0,10);
  }

  applyFilterPaciente(filterValue: string) {
    if(filterValue.length >= 3){
      this.pacientesDataSource.filterPredicate = (data: PacienteDTO, filter: string) => !filter || (data.nome.includes(filter));
      this.pacientesDataSource.filter = filterValue;
      if(this.pacientesDataSource.filteredData.length > 10){
        this.pacientesDataSource.filteredData.slice(0,10);
      }
    }
    else{
      this.pacientesDataSource.filteredData = this.pacientesDataSource.data.slice(0,10);
    }
  }

  applyFilterPulseira(filterValue: string) {
    if(filterValue.length){
      this.pulseirasDataSource.filterPredicate = (data: PulseiraDTO, filter: string) => !filter || (data.node.includes(filter));
      this.pulseirasDataSource.filter = filterValue;
      if(this.pulseirasDataSource.filteredData.length > 10){
        this.pulseirasDataSource.filteredData.slice(0,10);
      }
    }
    else{
      this.pulseirasDataSource.filteredData = this.pulseirasDataSource.data.slice(0,10);
    }
  }

  displayFnPaciente(paciente?: PacienteDTO) : string | undefined{
    return paciente ? paciente.nome : undefined;
  }

  displayFnPulseira(pulseira?: PulseiraDTO) : string | undefined{
    return pulseira ? pulseira.node : undefined;
  }

  cancel(){
    this.router.navigate(['/home/conexao']);
  }

  disableButtons(status: boolean){
    this.disableButton = status;
  }

  async save(){
    if(this.conexionForm.valid){
      if(!this.conexionForm.controls.paciente.value.nome && !this.checkIfPacienteExists(this.conexionForm.controls.paciente.value)){
        return
      }
      if(!this.conexionForm.controls.pulseira.value.node && !this.checkIfPulseiraExists(this.conexionForm.controls.pulseira.value)){
        return
      }
      this.disableButtons(true);
      const NewConexao = this.getFormAsConexao();
      const ResponseConexao = await this.conexaoService.crateConexao(NewConexao);
      if(ResponseConexao){
        this.cancel();
      }
      this.disableButtons(false);
    }
  }

  checkIfPacienteExists(pacienteName: string): boolean{
    const FoundedPaciente = this.pacientesDataSource.data.filter(paciente => paciente.nome === pacienteName);
    if(FoundedPaciente.length){
      this.conexionForm.controls.paciente.setValue(FoundedPaciente[0])
      return true;
    }
    this.feedbackService.showAlert('Paciente não encontrado', `danger`)
    return false;
  }

  checkIfPulseiraExists(pulseiraNode: string): boolean{
    const FoundedPulseira = this.pulseirasDataSource.data.filter(pulseira => pulseira.node === pulseiraNode);
    if(FoundedPulseira.length){
      this.conexionForm.controls.pulseira.setValue(FoundedPulseira[0])
      return true;
    }
    this.feedbackService.showAlert('Pulseira não encontrada', `danger`)
    return false;
  }

  getFormAsConexao(): ConexaoDTO{
    const NewConexao: ConexaoDTO ={
      pulseiraFkId: this.conexionForm.controls.pulseira.value.id,
      pacienteFk: this.conexionForm.controls.paciente.value.id
    }

    return NewConexao
  }
}
