import { NgModule } from '@angular/core';
import { RatingPipe } from './rating.pipe';

@NgModule({
    imports: [],
    declarations: [RatingPipe],
    exports: [RatingPipe],
})

export class RatingPipeModule {

    static forRoot() {
        return {
            ngModule: RatingPipeModule,
            providers: [],
        };
    }
}