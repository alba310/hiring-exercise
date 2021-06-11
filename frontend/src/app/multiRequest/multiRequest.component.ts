import { Component, OnInit } from '@angular/core';
import { getQueryValue } from '@angular/core/src/view/query';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, concatMap, tap, } from 'rxjs/operators';
import { timer } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";


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
        public timer = 0;
        public requests = [];




    constructor(
      private spinner: NgxSpinnerService,
      private http: HttpClient
    ) {}

    ngOnInit() {
        this.fetchValue();
    }

     delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
      }


     public fetchValue(): void {

        const source = timer(0,3);
        const subscribe = source.subscribe(
            value => this.timer = value,
        );

        this.spinner.show();
        this.requests = [];
        this.http.get(this.backendUrl, { headers: new HttpHeaders({ 'X-Request-Type': 'A' }) })
            .pipe(delay(100),
                tap((res: ICounterDTO) => {
                    this.requests.push({ type: "A", value: res.value })
                }),
                concatMap(() => this.http.get(this.backendUrl, { headers: new HttpHeaders({ 'X-Request-Type': 'B' }) })
                    .pipe(delay(100))),
                tap((res: ICounterDTO) => {
                    this.requests.push({ type: "B", value: res.value })
                }),
                concatMap(() => this.http.get(this.backendUrl, { headers: new HttpHeaders({ 'X-Request-Type': 'C' }) })
                    .pipe(delay(100))),
                tap((res: ICounterDTO) => {
                    this.requests.push({ type: "C", value: res.value })
                    this.spinner.hide();
                    setTimeout(() => { subscribe.unsubscribe(); }, 0);
                }),
            ).subscribe();


      }



}
