import featureToStrutturaMappings from "src/mappings/featureToStrutturaMappings";
import filtersFieldMappings from "../mappings/filtersFieldMappings";

export const environment = {
    production: true,
    fieldMappings: featureToStrutturaMappings,
    filtersFieldMappings: filtersFieldMappings,
    mapStyle: './assets/map-styles/roadmap-style.json'
};
