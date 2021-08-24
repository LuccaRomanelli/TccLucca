import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteDTO, Plataform, FilterOptions, DeleteModalDTO } from '../../../Models';
import { PulseiraService, PlataformService } from '../../../Services';  //paciente
import { TranslatePaginator } from '../../../Utils';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['nome', 'idade', 'sexo', 'telefone', 'contatoEmergencia', 'telefoneEmergencia', 'cpf',  'sintomas',  'historico', 'actions'];
  filterOptions: FilterOptions[] = [
    {
      key: 'nome',
      label: 'Nome'
    },
    {
      key: 'idade',
      label: 'Idade'
    },
    {
      key: 'sexo',
      label: 'Sexo'
    },
    {
      key: 'telefone',
      label: 'Telefone'
    },
    {
      key: 'contatoEmergencia',
      label: 'Contato Emergencia'
    },
    {
      key: 'telefoneEmergencia',
      label: 'Telefone Emergencia'
    },
    {
      key: 'cpf',
      label: 'Cpf'
    },
    {
      key: 'sintomas',
      label: 'Sintomas'
    },
    {
      key: 'historico',
      label: 'historico'
    }
  ]
  dataSource: MatTableDataSource<PacienteDTO>;
  currentPlataform: string;
  Plataform = Plataform;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(
    private readonly pulseiraService:PulseiraService,  //paciente
    private readonly plataformService:PlataformService,
    private readonly dialog:MatDialog,
    private readonly router:Router
  ) {
  }

  ngOnInit() {
    this.pulseiraService.getAllPulseiras();  //paciente
    // this.pulseiraService.getPacientList().subscribe(pulseiras=>{
    //   this.setDataSource(pulseiras);
    // })
    this.plataformService.getPlataform().subscribe(currentPlataform=>{
      this.currentPlataform = currentPlataform;
      if(this.currentPlataform !== Plataform.Mobile){
        setTimeout(() => {
          this.dataSource.paginator = this.paginator
        }, 200);
      }
    })
  }

  ngAfterViewInit() {
    TranslatePaginator(this.paginator);
  }

  setDataSource(pacientes:PacienteDTO[]){
    this.dataSource = new MatTableDataSource<PacienteDTO>(pacientes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterKey: string, filterValue: string) {
    this.dataSource.filterPredicate = (data: PacienteDTO, filter: string) => !filter || (data[filterKey].indexOf(filter) != -1);
    this.dataSource.filter = filterValue.toLowerCase();
  }

  deletePulseira(id:string){
    const DeleteData: DeleteModalDTO = {
      entity: 'pulseira',
      value: id,
      femaleGender: false,
      property: 'id'
    }
    this.openDeleteModal(DeleteData,id);
  }

  openDeleteModal(data:DeleteModalDTO, idToDelete: string){
    const DialogRef = this.dialog.open(DeleteModalComponent,{data: data});
    DialogRef.afterClosed().subscribe((result: boolean)=>{
      if(result){
        this.pulseiraService.deletePulseira(idToDelete); //paciente
      }
    })
  }
  
  createPaciente(){
    this.router.navigate(['/home/paciente/nova']);
  }

  editPaciente(id:string){
    this.router.navigate([`/home/paciente/editar/${id}`]);
  }

}
