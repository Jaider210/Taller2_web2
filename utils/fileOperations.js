const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data.json");

function readData(){
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if(fileContent) {
            return JSON.parse(fileContent);
        }else {
            return [];
        }
    } catch (error) {
        console.error('Error reading file', error);
        return [];
    }
}   

function writeData(data){
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null,2),'utf8');
    } catch (error) {
        console.error('Error writing file', error);
    }
}

module.exports = {
    readData,
    writeData
};