import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Struttura } from '../../models/struttura/struttura';
import { StrutturaService } from '../../services/api/struttura.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    struttura: Struttura;

    constructor(private strutturaService: StrutturaService, private actRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.actRoute.params.subscribe(params => {
            this.struttura = this.strutturaService.getDetail(params.id);
            console.log(this.struttura);
        });
    }

}
