import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataDTO, Plataform, FilterOptions } from '../../Models';
import { DataService, PlataformService, PulseiraService } from '../../Services';
import { TranslatePaginator } from '../../Utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})
export class DadosComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['time_utc', 'heart_Rate','temperature_degC', 'oximetry', 'blood_pressure'];
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
  dataSource: MatTableDataSource<DataDTO>;
  currentPlataform: string;
  Plataform = Plataform;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(
    private readonly pulseiraService:PulseiraService,
    private readonly dataService:DataService,
    private readonly plataformService:PlataformService,
    private readonly router:Router
  ) {
  }

  ngOnInit() {
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

  setDataSource(dados:DataDTO[]){
    this.dataSource = new MatTableDataSource<DataDTO>(dados);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterKey: string, filterValue: string) {
    this.dataSource.filterPredicate = (data: DataDTO, filter: string) => !filter || (data[filterKey].indexOf(filter) != -1);
    this.dataSource.filter = filterValue.toLowerCase();
  }
  
  createPulseira(){
    this.router.navigate(['/home/pulseira/nova']);
  }

}
