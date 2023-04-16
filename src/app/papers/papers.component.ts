import { Component, OnInit, ViewChild } from '@angular/core';
import { PapersService } from '../services/papers.service';
import { error } from 'console';
import { ColDef } from 'ag-grid-community';
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
      headerName: 'Title',
      field: 'title', 
      sortable: true, 
      filter: true,
      flex: 4,
      resizable: true
    },
    {
      headerName: 'View',
      field: 'title', 
      sortable: true, 
      filter: true,
      cellRenderer: AgRowComponent,
      cellRendererParams: {},
      flex: 1,
      resizable: true
    },
    {
      headerName: 'Recommend',
      field: 'title', 
      sortable: true, 
      filter: true,
      cellRenderer: AgRowComponent,
      cellRendererParams: {},
      flex: 1,
      resizable: true
    }

  ];

  defaultColDef = {
    sortable: true, filter: true
  };

  rowData = []

  ngOnInit(): void {
    this.paperService.getPapers().subscribe ( 
      data => {console.log(data); this.rowData = data;},
      error => {console.log("Error:", error);}
    );
  }

}
