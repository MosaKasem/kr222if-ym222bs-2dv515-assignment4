const fs = require('fs')
const csv = require('csv-parser')

const arrOfArgs = ['banknote_authentication', 'iris']

const parseCVStoJSO = (fileName) => {
    let result = []
        fs.createReadStream(fileName + '.csv')
            .pipe(csv({headers: false}))
            .on('data', (data) => result.push(data))
            .on('end', () => {
                const convert = result.map(e => convertToNumber(e))
                const jsonfiy = JSON.stringify(convert)
                fs.writeFile(fileName + '.json', jsonfiy, 'utf8', (err) => {
                    if (err) throw err
                    console.log('Json completely exported')
                })
            })
}
arrOfArgs.forEach(filename => {
    parseCVStoJSO(filename)
})

const convertToNumber = (anObject) => {
    for (const key in anObject) {
        const objectValue = anObject[key];
        if (!isNaN(Number(objectValue))) {
            anObject[key] = Number(objectValue)
        }
    }
    return anObject
}