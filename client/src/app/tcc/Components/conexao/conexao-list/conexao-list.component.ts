import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConexaoDTO, Plataform, FilterOptions, DeleteModalDTO } from '../../../Models';
import { ConexaoService, PlataformService } from '../../../Services';
import { TranslatePaginator } from '../../../Utils';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conexao-list',
  templateUrl: './conexao-list.component.html',
  styleUrls: ['./conexao-list.component.scss']
})
export class ConexaoListComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['pulseiraFkId', 'dataInicio', 'dataFim','actions'];
  filterOptions: FilterOptions[] = [
    {
      key: 'pulseiraFkId',
      label: 'Pulseira'
    },
    {
      key: 'dataInicio',
      label: 'Data Inicio'
    },
    {
      key: 'dataFim',
      label: 'Data Fim'
    }
  ]
  dataSource: MatTableDataSource<ConexaoDTO>;
  currentPlataform: string;
  Plataform = Plataform;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(
    private readonly conexaoService:ConexaoService,
    private readonly plataformService:PlataformService,
    private readonly dialog:MatDialog,
    private readonly router:Router
  ) {
  }

  ngOnInit() {
    this.conexaoService.getAllConexaos();
    this.conexaoService.getConexaosList().subscribe(conexaos=>{
      this.setDataSource(conexaos);
    })
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

  setDataSource(conexaos:ConexaoDTO[]){
    this.dataSource = new MatTableDataSource<ConexaoDTO>(conexaos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterKey: string, filterValue: string) {
    this.dataSource.filterPredicate = (data: ConexaoDTO, filter: string) => !filter || (data[filterKey].indexOf(filter) != -1);
    this.dataSource.filter = filterValue.toLowerCase();
  }

  deleteConexao(id:string){
    const DeleteData: DeleteModalDTO = {
      entity: 'conexao',
      value: id,
      femaleGender: true,
      property: 'id'
    }
    this.openDeleteModal(DeleteData,id);
  }

  openDeleteModal(data:DeleteModalDTO, idToDelete: string){
    const DialogRef = this.dialog.open(DeleteModalComponent,{data: data});
    DialogRef.afterClosed().subscribe((result: boolean)=>{
      if(result){
        this.conexaoService.deleteConexao(idToDelete);
      }
    })
  }
  
  createConexao(){
    this.router.navigate(['/home/conexao/nova']);
  }

  fimConexao(id:string){
    this.conexaoService.updateConexao(id,null);
  }

}
