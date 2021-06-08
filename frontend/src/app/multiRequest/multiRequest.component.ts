import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getQueryValue } from '@angular/core/src/view/query';
//import { Subscription } from 'rxjs';
import {Injectable} from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {Http, Headers} from '@angular/http';


interface ICounterDTO {
    value: number;
}

@Component({
  selector: 'app-multi-request',
  templateUrl: './multiRequest.component.html',
  styleUrls: ['./multiRequest.component.css']
})
export class MultiRequestComponent implements OnInit {
    private backendUrl = 'http://localhost:8080/api/hiring/counter';
    public lastValue = 0;
    public lastValue2 = 0;
    public lastValue3 = 0;
    public resultat= 0;

    constructor(private spinner: NgxSpinnerService,private http: HttpClient) {}


    ngOnInit() {
       // this.spinner.show();
        console.log('Your code here');
        this.recalcular();

    }
     showSpinner() {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      }

     delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
      }

      async recalcular(){

       this.fetchValue('a');
       await this.delay(100);
       this.fetchValue('b');
       await this.delay(100);
       this.fetchValue('c');
      }
     public fetchValue(tipus:string): void {

       const headers = { 'X-Request-Type': tipus}

       this.http.get(this.backendUrl,{headers}).subscribe((result: ICounterDTO) => {

            console.log(result.value);
            if(tipus=='a'){
              this.lastValue= result.value;
              console.log(this.lastValue);
            }
            if(tipus=='b'){
              this.lastValue2= result.value;
            }
            if(tipus=='c'){
              this.lastValue3= result.value;
            }

        });


      }
}
