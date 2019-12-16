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
    let sum = []
    

    sorted.forEach((flowerSet, i) => {

        let reduced= flowerSet.reduce((tot, arr) => {
            // return tot + arr[]
        }, 0)
        console.log(reduced)
    })
}

// ]4.9 4.7 4.6 5 5.44.654.44.95.44.84.84.35.85.75.45.15.75.15.45.14.65.14.8555.25.24.74.85.45.25.54.955.54.94.45.154.54.455.14.85.14.65.35
// [object Object]6.46.95.56.55.76.34.96.65.255.966.15.66.75.65.86.25.65.96.16.36.16.46.66.86.765.75.55.55.865.466.76.35.65.55.56.15.855.65.75.76.25.15.7
// [object Object]5.87.16.36.57.64.97.36.77.26.56.46.85.75.86.46.57.77.766.95.67.76.36.77.26.26.16.47.27.47.96.46.36.17.76.36.466.96.76.95.86.86.76.76.36.56.25.9

// const sum = (flower) => {
//     let sum = 0;
//     let total = Object.values(flower).reduce((sum, key) => {
//         console.log('sum: ', sum);
//         console.log('Number(flower[key]): ', Number(key));
//         // if (!isNaN(Number(flower[key]))) {
//         //     let currentValue = Number(flower[key])
//         //     sum += currentValue
//         // }
//     }, 0)
// }
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