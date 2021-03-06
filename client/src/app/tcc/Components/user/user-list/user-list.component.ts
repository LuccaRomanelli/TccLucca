import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDTO, Plataform, FilterOptions, DeleteModalDTO } from '../../../Models';
import { UserService, PlataformService } from '../../../Services';
import { TranslatePaginator } from '../../../Utils';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['email', 'role','actions'];
  filterOptions: FilterOptions[] = [
    {
      key: 'email',
      label: 'E-mail'
    },
    {
      key: 'role',
      label: 'Função'
    }
  ]
  dataSource: MatTableDataSource<UserDTO>;
  currentPlataform: string;
  Plataform = Plataform;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(
    private readonly userService:UserService,
    private readonly plataformService:PlataformService,
    private readonly dialog:MatDialog,
    private readonly router:Router
  ) {
  }

  ngOnInit() {
    this.userService.getAllUsers();
    this.userService.getUsersList().subscribe(users=>{
      this.setDataSource(users);
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

  setDataSource(users:UserDTO[]){
    this.dataSource = new MatTableDataSource<UserDTO>(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterKey: string, filterValue: string) {
    this.dataSource.filterPredicate = (data: UserDTO, filter: string) => !filter || (data[filterKey].indexOf(filter) != -1);
    this.dataSource.filter = filterValue.toLowerCase();
  }

  deleteUser(id:string){
    const DeleteData: DeleteModalDTO = {
      entity: 'user',
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
        this.userService.deleteUser(idToDelete);
      }
    })
  }
  
  createUser(){
    this.router.navigate(['/home/user/nova']);
  }

  editUser(id:string){
    this.router.navigate([`/home/user/editar/${id}`]);
  }

}
