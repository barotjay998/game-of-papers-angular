import { Component, OnInit, ViewChild } from '@angular/core';
import { PapersService } from '../services/papers.service';
import { error } from 'console';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgRowComponent } from '../ag-row/ag-row.component';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit {

  constructor(private paperService: PapersService) { }

  columnDefs: ColDef[] = [
    {
      headerName: 'Conference',
      field: 'conference', 
      sortable: true, 
      filter: true,
      flex: 2,
      resizable: true
    },
    { 
      headerName: 'Title',
      field: 'title', 
      sortable: true, 
      filter: true,
      flex: 8,
      resizable: true,
      cellRenderer: AgRowComponent,
      autoHeight: true
    }
    // {
    //   headerName: '',
    //   field: 'title', 
    //   sortable: true, 
    //   filter: true,
    //   cellRenderer: AgRowComponent,
    //   cellRendererParams: {btnName: "Recommend"},
    //   flex: 1,
    //   resizable: true
    // }

  ];

  defaultColDef = {
    sortable: true, filter: true
  };

  gridOptions: GridOptions = {
    // other grid options...
    suppressMenuHide: true
  };
  
  rowData = []

  ngOnInit(): void {
    this.paperService.getPapers().subscribe ( 
      data => {this.rowData = data;},
      error => {console.log("Get Papers Error:", error);}
    );
  }

}
