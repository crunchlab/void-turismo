import { TestBed } from '@angular/core/testing';
import { intersection } from 'lodash';
import { FilterOperator } from '../../enums/filterOperator.enum';
import { AttributeFilter } from '../../interfaces/attributeFilter.interface';
import { FieldMapping } from '../../interfaces/fieldMapping.interface';

import { StrutturaService } from './struttura.service';

describe('StrutturaService', () => {
  let service: StrutturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrutturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should create an Attribute Filter array with desired properties distinct values', () => {
      let filters:AttributeFilter[]=[];
      let mappings:FieldMapping[]=[
          {
              properties:"tipologia",
              field:"tipologia",
              type:"string"
          }
      ];
      let expectedValues = ["AFFITTACAMERE", "AGRITURISMO", "ALBERGO", "ALTRA RICETTIVITA'", "APPARTAMENTO", "BED AND BREAKFAST", "CAMPEGGIO", "COUNTRY HOUSE", "RESIDENCE"];
      filters = service.getFilterValues(mappings);
      let mapping :AttributeFilter = filters[0];
      expect(mapping.operator).toBe(FilterOperator.in);
      expect(mapping.property).toBe("tipologia");
      expect(intersection((mapping.value as string[]), expectedValues).length).toBe(expectedValues.length);
  });
  
});
