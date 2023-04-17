import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PapersService } from '../services/papers.service';
import { saveAs } from 'file-saver'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public paperId: number = 0
  public data: any

  constructor(
    private route: ActivatedRoute,
    private paperService: PapersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id') || '0')
    this.paperId = id
    
    this.loadData()
  }

  loadData() {
    this.paperService.getPaper(this.paperId).subscribe ( 
      data => {console.log(data); this.data = data;},
      error => {console.log("Get Paper Error:", error);}
    );
  }

  loadPdf() {
    this.paperService.getPaperPdf(this.paperId).subscribe ( 
      data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, `${this.data.title}.pdf`);

        // uncomment the following to open the pdf in a new tab
        // const url = window.URL.createObjectURL(blob);
        // window.open(url);
      },
      error => {console.log("Get Paper Pdf Error:", error);}
    );
  }

  onBack(event: any) {
    this.router.navigate(['/papers'])
  }

  onDownload(event: any) {
    this.loadPdf()
  }

}
