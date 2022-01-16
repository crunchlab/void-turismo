import { FilterOperator } from "../enums/filterOperator.enum";
import { Tipologia } from "../enums/tipologia.enum";

export interface AttributeFilter {
    property: string,
    operator: FilterOperator,
    value: string | number | boolean | Tipologia
}