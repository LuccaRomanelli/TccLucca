import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PulseiraDTO, Plataform, FilterOptions, DeleteModalDTO } from '../../../Models';
import { PulseiraService, PlataformService } from '../../../Services';
import { PulseiraStatusEnum } from '../../../Enumns';
import { TranslatePaginator } from '../../../Utils';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pulseira-list',
  templateUrl: './pulseira-list.component.html',
  styleUrls: ['./pulseira-list.component.scss']
})
export class PulseiraListComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['node', 'status','actions'];
  filterOptions: FilterOptions[] = [
    {
      key: 'node',
      label: 'Node'
    },
    {
      key: 'status',
      label: 'Status'
    }
  ]
  dataSource: MatTableDataSource<PulseiraDTO>;
  currentPlataform: string;
  PulseiraStatusEnum = PulseiraStatusEnum;
  Plataform = Plataform;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(
    private readonly pulseiraService:PulseiraService,
    private readonly plataformService:PlataformService,
    private readonly dialog:MatDialog,
    private readonly router:Router
  ) {
  }

  ngOnInit() {
    this.pulseiraService.getAllPulseiras();
    this.pulseiraService.getPulseirasList().subscribe(pulseiras=>{
      this.setDataSource(pulseiras);
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

  setDataSource(pulseiras:PulseiraDTO[]){
    this.dataSource = new MatTableDataSource<PulseiraDTO>(pulseiras);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterKey: string, filterValue: string) {
    this.dataSource.filterPredicate = (data: PulseiraDTO, filter: string) => !filter || (data[filterKey].indexOf(filter) != -1);
    this.dataSource.filter = filterValue.toLowerCase();
  }

  deletePulseira(id:string){
    const DeleteData: DeleteModalDTO = {
      entity: 'pulseira',
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
        this.pulseiraService.deletePulseira(idToDelete);
      }
    })
  }
  
  createPulseira(){
    this.router.navigate(['/home/pulseira/nova']);
  }

  editPulseira(id:string){
    this.router.navigate([`/home/pulseira/editar/${id}`]);
  }
}
