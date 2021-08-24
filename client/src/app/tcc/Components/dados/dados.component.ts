import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, Validators} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DataDTO, Plataform, PacienteDTO, ConexaoDTO } from '../../Models';
import { DataService, PlataformService, PacienteService, ConexaoService, FeedbackService } from '../../Services';
import { TranslatePaginator } from '../../Utils';
import { Router } from '@angular/router';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';

export const DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  }
};


@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ]
})
export class DadosComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['time_utc', 'heart_Rate','temperature_degC', 'oximetry', 'blood_pressure'];
  pacientesDataSource: MatTableDataSource<PacienteDTO>;
  tableDataSource: MatTableDataSource<DataDTO>;
  currentPlataform: string;
  Plataform = Plataform;
  showAditionalPacienteInfo: boolean = false;
  showDataTable: boolean = false;
  minDate: Date;
  maxDate: Date = new Date();
  currentConexion: ConexaoDTO;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  dataForm = this.fb.group({
    paciente: [null,[Validators.required]],
    dataInicio: [null,[Validators.required]],
    dataFim: [null]
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly pacienteService: PacienteService,
    private readonly dataService: DataService,
    private readonly conexaoService: ConexaoService,
    private readonly plataformService: PlataformService,
    private readonly feedbackService: FeedbackService,
    public adapter: DateAdapter<Date>
  ) {}

  ngOnInit() {
    this.adapter.setLocale('pt-br');

    this.plataformService.getPlataform().subscribe(currentPlataform=>{
      this.currentPlataform = currentPlataform;
      if(this.currentPlataform !== Plataform.Mobile){
        setTimeout(() => {
          this.tableDataSource.paginator = this.paginator
        }, 200);
      }
    })

    this.pacienteService.getAllPacientes();
    this.pacienteService.getPacientesList().subscribe(pacientes => {
      this.setPacientesDataSource(pacientes);
    })

    this.dataService.getDadosList().subscribe(data => {
      this.setDataDataSource(data)
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataForm.controls.dataFim.setValue(this.maxDate);
    });
  }

  setPacientesDataSource(pacientes:PacienteDTO[]){
    this.pacientesDataSource = new MatTableDataSource<PacienteDTO>(pacientes);
    this.pacientesDataSource.filteredData = [];
  }

  setDataDataSource(dados:DataDTO[]){
    this.tableDataSource = new MatTableDataSource<DataDTO>(dados);
    this.tableDataSource.sort = this.sort;
    setTimeout(() => {
      TranslatePaginator(this.paginator);
      this.tableDataSource.paginator = this.paginator;
    });
  }

  displayFn(paciente?: PacienteDTO): string | undefined {
    return paciente ? paciente.nome : undefined;
  }

  applyFilterPaciente(filterValue: string) {
    if(filterValue.length >= 3){
      this.pacientesDataSource.filterPredicate = (data: PacienteDTO, filter: string) => !filter || (data.nome.includes(filter));
      this.pacientesDataSource.filter = filterValue;
      if(this.pacientesDataSource.filteredData.length > 10){
        this.pacientesDataSource.filteredData.splice(10);
      }
    }
    else{
      this.pacientesDataSource.filteredData = [];
    }
  }

  async getConexion(searchByName : boolean){
    this.showDataTable = false;
    let selectedPaciente: PacienteDTO;

    if(searchByName){
      const FoundedPaciente = this.pacientesDataSource.data.filter(paciente => paciente.nome.includes(this.dataForm.controls.paciente.value))
      if(FoundedPaciente.length){
        selectedPaciente = FoundedPaciente[0];
      }
      else{
        this.showAditionalPacienteInfo = false;
        this.feedbackService.showAlert('Paciente não encontrado', `danger`)
        return
      }
    }
    else{
      selectedPaciente = this.dataForm.controls.paciente.value as PacienteDTO;
    }

    this.pacientesDataSource.filteredData = [];
    const Conexion = await this.conexaoService.getConexionByPacienteId(selectedPaciente.id);
    if(Conexion){
      this.minDate = new Date(Conexion.dataInicio);
      this.dataForm.controls.dataInicio.setValue(this.minDate);
      this.showAditionalPacienteInfo = true;
      this.currentConexion = Conexion;
    }
  }

  applyFilter(filterKey: string, filterValue: string) {
    this.tableDataSource.filterPredicate = (data: DataDTO, filter: string) => !filter || (data[filterKey].indexOf(filter) != -1);
    this.tableDataSource.filter = filterValue.toLowerCase();
  }

  formatDate(stringDate: string){
    const NewDate = new Date(stringDate);
    const Year = NewDate.getFullYear();
    const Month = NewDate.getMonth() < 9 ? `0${NewDate.getMonth() + 1}` : NewDate.getMonth() + 1;
    const Day = NewDate.getDate() < 10 ? `0${NewDate.getDate()}` : NewDate.getDate();

    return `${Day}/${Month}/${Year}`
  }
  
  getData(){
    if(this.dataForm.valid){
      const ConexionData = this.getDataFormAsConexao();
      this.dataService.getData(ConexionData.pulseiraFkId, ConexionData.dataInicio.getTime(), ConexionData.dataFim.getTime());
      this.showDataTable = true;
    }
  }

  getDataFormAsConexao(){
    const ConexionData:ConexaoDTO = {
      pulseiraFkId: this.currentConexion.pulseiraFkId,
      pacienteFk: this.currentConexion.pacienteFk,
      dataInicio: this.dataForm.controls.dataInicio.value,
      dataFim: this.dataForm.controls.dataFim.value,
    } 

    return ConexionData
  }

}
