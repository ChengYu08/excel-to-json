var XLSX = require("xlsx");
var data = XLSX.readFile("./lang.xlsx");
const fs = require('fs-extra')
const Sheet = data.Sheets.Sheet1
const exportJsonMap = {}
const keyNumMap = {}
const langNumMap = {}

Object.keys(Sheet).forEach(key=>{
    if(key.indexOf("!")!=-1) {
        return ;
    }
    // 是主键 需要创建一个Map
    const value = Sheet[key];
    // 字母
    const s = key.slice(0,1);
    const v =  key.slice(1,key.length)*1;
    if(s=='A') {
        keyNumMap[v] =value.w.trim();
    }else {
        if(v==1) {
            exportJsonMap[value.w] = {}
            langNumMap[s] = value.w.trim();
        }else {
            const lang= langNumMap[s];
            exportJsonMap[lang][keyNumMap[v]] = value.w.trim();
        }
    }
});
fs.removeSync("./langs/");
fs.mkdirSync("./langs/");

Object.keys(exportJsonMap).forEach((key)=>{
    fs.writeFile(`./langs/${key}.arb`,JSON.stringify(exportJsonMap[key],null,4));
})