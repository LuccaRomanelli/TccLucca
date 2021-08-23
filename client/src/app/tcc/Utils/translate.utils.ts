import { MatPaginator } from '@angular/material/paginator';

export const TranslatePaginator = ( paginator: MatPaginator ) => {
  if(paginator){
    paginator._intl.firstPageLabel = 'Primeira página';
    paginator._intl.itemsPerPageLabel = 'Itens por página';
    paginator._intl.lastPageLabel = 'Última página';
    paginator._intl.nextPageLabel = 'Próxima página';
    paginator._intl.previousPageLabel = 'Página anterior';
  }
}