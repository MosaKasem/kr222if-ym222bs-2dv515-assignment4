const iris = require('../iris.json')
const banknote_authentication = require('../banknote_authentication.json')

/**
 * keyValue is key name from the object: in this case, Movie or UserID
 * @param {*} keyValue
 * @returns a sorted array of arrays based on the parameter (Movie )
 */
const seperateByClass = (dataSet ,keyValue) => {
    const sorted = []
    dataSet.forEach(function (a) {
      this[a[keyValue]] || sorted.push(this[a[keyValue]] = [])
  
      this[a[keyValue]].push(a)
    }, Object.create(null))
    return sorted
}

const summarize = (file, id) => {
    const sorted = seperateByClass(file, id)
    sorted.forEach(flowerSet => {
        flowerSet.map((flower, i) => {
            sum(flower)
        })
    })

}
const sum = (flower) => {
    let sum = 0;
    let total = Object.values(flower).reduce((sum, key) => {
        console.log('sum: ', sum);
        console.log('Number(flower[key]): ', Number(key));
        // if (!isNaN(Number(flower[key]))) {
        //     let currentValue = Number(flower[key])
        //     sum += currentValue
        // }
    }, 0)
}
// const sum = (flower) => {
//     let sum = 0;
//     Object.keys(flower).reduce((sum, key) => {
//         if (!isNaN(Number(flower[key]))) {
//             let currentValue = Number(flower[key])
//             sum += currentValue
//         }
//     }, 0)
// }

summarize(iris, '4')