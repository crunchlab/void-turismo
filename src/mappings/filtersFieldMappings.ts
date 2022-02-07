import { FieldMapping } from "../app/interfaces/fieldMapping.interface";

const filtersFieldMappings: FieldMapping[] = [
    { "field": "tipologia", "properties": "tipologia", "type": "string" },
    { "field": "nuovaClassificazioneLR11", "properties": "nuovaClassificazioneLR11", "type": "string" },
    { "field": "posizione", "properties": "posizione", "type": "bool" },
    { "field": "trasporti", "properties": "trasporti", "type": "bool" },
    // { "field": "accoglienza", "properties": ["accessoDisabili", "giochiBimbi", "animaliAmmessi"], "type": "bool" },
    { "field": "lingue", "properties": "lingue", "type": "bool" },
    {
        "field": "accoglienza",
        "properties": "accoglienza",
        "type": "bool"
    },
];

export default filtersFieldMappings;
