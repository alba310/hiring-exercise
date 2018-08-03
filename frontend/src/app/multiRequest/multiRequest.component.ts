import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getQueryValue } from '@angular/core/src/view/query';
import { Subscription } from 'rxjs';

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

    constructor(private http: HttpClient) {}

    ngOnInit() {
        console.log('Your code here');
        this.fetchValue();
    }

    fetchValue(): void {
        this.http.get(this.backendUrl).subscribe((result: ICounterDTO) => {
            console.log(result.value);
            this.lastValue = result.value;
        });
    }
}
