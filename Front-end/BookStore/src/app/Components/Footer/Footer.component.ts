import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Footer',
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css']
})
export class FooterComponent implements OnInit {
  img1:string = "assets/images/download.jpg";
  img2:string = "assets/images/download1.jpg";
  img3:string = "assets/images/download2.jpg"; 
  img4:string = "assets/images/download3.jpg"; 
  img5:string = "assets/images/download4.jpg"; 
  img6:string = "assets/images/download5.jpg"; 

  constructor() { }

  ngOnInit() {
  }

}
