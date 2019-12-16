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
    sorted.forEach((flowerType => {
        console.log('flowerType: ', flowerType[0][4]);
        console.log('flowerType: ', flowerType.length);
        const avg = mean(flowerType)
    }))
}

const mean = (objectSet) => {
    let sum = []
    let total = 0
    for (let i = 0; i < 4; i++) {
        console.log('iterating index: ', i)
        Object.keys(objectSet).forEach(key => {
            total += objectSet[key][i]
        })
        sum.push({objectSet: objectSet[0][4], index: i, total: total/objectSet.length})
        total = 0
    }
    console.log(sum)
}

summarize(iris, '4')