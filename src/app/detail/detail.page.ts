import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StrutturaService } from '../services/api/struttura.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

    constructor(private strutturaService: StrutturaService, private actRoute: ActivatedRoute) {
        
    }

    ngOnInit() {
        this.actRoute.params.subscribe(params => {
            console.log('The id of this route is: ', params.id);
            console.log(this.strutturaService.getDetail(params.id));
        });
    }

}
