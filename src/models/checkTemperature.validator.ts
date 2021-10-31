import { Schema } from "jsonschema";

export const checkTemperatureValidator: Schema = {
    id: '/CheckTemperature',
    type: 'object',
    properties: {
        latitude: {
            type: 'string',
            description: 'Represents the latitude of the point to search.',
            pattern: '[+-]?([0-9]*[.])?[0-9]+$'
        },
        longitude: {
            type: 'string',
            description: 'Represents the longitude of the point to search.',
            pattern: '[+-]?([0-9]*[.])?[0-9]+$'
        },
        units: {
            type: 'string',
            description: 'Represent the unit in which the data from OneCall API will be returned',
            enum: ['metric', 'imperial', 'standard']
        }
    },
    required: ['latitude', 'longitude'],
    additionalProperties: false
};

export const checkDefaultTemperatureValidator: Schema = {
    id: '/CheckTemperature',
    type: 'object',
    properties: {
        latitude: {
            type: 'string',
            description: 'Represents the latitude of the point to search.',
            pattern: '[+-]?([0-9]*[.])?[0-9]+$'
        },
        longitude: {
            type: 'string',
            description: 'Represents the longitude of the point to search.',
            pattern: '[+-]?([0-9]*[.])?[0-9]+$'
        },
        units: {
            type: 'string',
            description: 'Represent the unit in which the data from OneCall API will be returned',
            enum: ['metric', 'imperial', 'standard']
        }
    },
    required: [],
    additionalProperties: false
};
