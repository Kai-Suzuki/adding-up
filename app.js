'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({'input' : rs, 'output':{}});
const prefDataMap = new Map();
rl.on('line',(linestring)=> {
    const column = linestring.split(',');
    const year = parseInt(column[0]);
    const pref = column[1];
    const popu = parseInt(column[3]);

    if(year === 2015 || year === 2010){
        let value = prefDataMap.get(pref);
        if(!value){
            value = {
                popu10: 0,
                popu15: 0,
                change: null
            };
        }
        if(year === 2010){
            value.popu10 = popu;
        }
        if(year === 2015){
            value.popu15 = popu;
        }
        prefDataMap.set(pref,value);
    }
    
});
rl.on('close', ()=>{
    for (let [key,value] of prefDataMap){
        value.change = value.popu15 / value.popu10;
    };
    const rankArray = Array.from(prefDataMap).sort((a,b) => {
        return b[1].change - a[1].change;
    });
    console.log(rankArray);
});