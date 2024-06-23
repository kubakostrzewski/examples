// import {parse} from "csv-parse";
const {parse} = require('csv-parse')
const fs = require('fs')

const result = [];

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => result.push(data))
    .on('error', (e) => console.log(e))
    .on('end', () => console.log(result))
