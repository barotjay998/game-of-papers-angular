import { Component, OnInit } from '@angular/core';
import { PapersService } from '../services/papers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public data: any;

  constructor(
    private paperService: PapersService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadFeaturedPapers();

  }

  loadFeaturedPapers() {
    const { sampleFrom, sampleTo } = this.getSampleRange(0, 1000, 5);

    this.paperService.getPapers(sampleFrom, sampleTo).subscribe ( 
      data => {this.data = data;},
      error => {console.log("Get Papers Error:", error);}
    );

  }

  getSampleRange(rangeFrom: number, rangeTo: number, sampleSize: number): { sampleFrom: number, sampleTo: number } {

    const sampleTo = Math.floor(Math.random() * (rangeTo - rangeFrom - sampleSize + 1)) + rangeFrom + sampleSize;
    const sampleFrom = sampleTo - sampleSize;

    return { sampleFrom, sampleTo };
  }

  onView(id: number) {
    this.router.navigate(['/papers', id])
  }

  onRecommend(id: number) {
    this.router.navigate(['/papers', id, {recommend: true}])
  }

}
