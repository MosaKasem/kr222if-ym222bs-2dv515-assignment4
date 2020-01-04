const express = require('express')
const bodyParse = require('body-parser')
const { NaiveBayes } = require('./algorithm/NaiveBayesAlgo')
const x = require('./iris.json')
const y = '4'

// const 

const PORT = process.env.PORT || 8000
const app = express().use(bodyParse.json())
const test = require('./algorithm/NaiveBayesAlgo')

/**
 * Temporary route
 */
app.use('/', (req, res) => {
    const nb = new NaiveBayes()
    nb.fit(x, y)
})

app.listen(PORT, () => {console.log('Established connection: ' + PORT)} )