const express = require('express')
const bodyParse = require('body-parser')
// const 

const PORT = process.env.PORT || 8000
const app = express().use(bodyParse.json())
const test = require('./algorithm/NaiveBayesAlgo')

/**
 * Temporary route
 */
app.use('/', (req, res) => {
    console.log("Yea")
})

app.listen(PORT, () => {console.log('Established connection: ' + PORT)} )