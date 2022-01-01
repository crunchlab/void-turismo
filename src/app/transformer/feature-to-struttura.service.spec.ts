import { TestBed } from '@angular/core/testing';

import { FeatureToStrutturaService } from './feature-to-struttura.service';

describe('FeatureToStrutturaService', () => {
    let transformer: FeatureToStrutturaService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        transformer = TestBed.inject(FeatureToStrutturaService);
    });

    it('should be created', () => {
        expect(transformer).toBeTruthy();
    });

    it('should have a mapping object', () => {
        expect(transformer.mappings).toBeDefined();
        
    });
});
