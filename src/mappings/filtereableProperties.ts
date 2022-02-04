import { FieldMapping } from "src/app/interfaces/fieldMapping.interface";

const filterablePropertiesMapping: FieldMapping[] = [
    { "field": "tipologia", "properties": "tipologia", "type": "string" },
    { "field": "nuovaClassificazioneLR11", "properties": "nuovaClassificazioneLR11", "type": "string" },
    { "field": "trasporti", "properties": "posizione", "type": "bool" },
    { "field": "trasporti", "properties": "trasporti", "type": "bool" },
    { "field": "accoglienza", "properties": ["accessoDisabili", "giochiBimbi", "animaliAmmessi"], "type": "bool" },
    { "field": "lingue", "properties": "lingue", "type": "bool" },
];

export default filterablePropertiesMapping;
