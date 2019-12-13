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
let b = 0
const sum = (flower) => {
    let sum = 0;
    Object.keys(flower).reduce((sum, key) => {
        // console.log('flower[key]: ', flower[key])
        // console.log('flower[key]: ', typeof Number(flower[key]))
        if (Number(flower[key])) {
            sum += Number(flower[key])
            // console.log('Number(flower[key]): ', Number(flower[key]));
            
        }
    }, 0)
    b++
    // console.log(b);
    
}

summarize(iris, '4')