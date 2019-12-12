const fs = require('fs')
const csv = require('csv-parser')

const arrOfArgs = ['banknote_authentication', 'iris']

const parseCVStoJSO = (fileName) => {
    let result = []
        fs.createReadStream(fileName + '.csv')
            .pipe(csv({headers: false}))
            .on('data', (data) => result.push(data))
            .on('end', () => {
                const jsonfiy = JSON.stringify(result)
                fs.writeFile(fileName + '.json', jsonfiy, 'utf8', (err) => {
                    if (err) throw err
                    console.log('Json completely exported')
                })
            })
}
arrOfArgs.forEach(filename => {
    parseCVStoJSO(filename)
})