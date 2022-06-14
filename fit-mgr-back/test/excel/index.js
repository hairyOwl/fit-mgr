/*
 * @Description: 简单使用 node-xlsx 用于解析excel
 * @Author: hairyOwl
 * @Date: 2022-03-25 19:00:25
 * @LastEditors: hairyOwl
 * @LastEditTime: 2022-03-25 19:55:31
 */
const xlsx = require('node-xlsx');

// // Parse a buffer 缓冲区
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));

// Parse a file
const workSheets = xlsx.parse('./test.xlsx');

console.log(workSheets);
//[ { name: 'Sheet1', data: [ [Array], [Array], [Array] ] } ]

console.log(workSheets[0].data);
//[ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]