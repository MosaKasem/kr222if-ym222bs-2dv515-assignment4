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

/**
 * 
 * @param {json file} file 
 * @param {} id 
 */
const summarize = (sorted) => {
    const arrayOfMeansValue = []
    sorted.forEach((flowerType => {
        const currentFlowerType = flowerType[0][4]
        
        console.log('Flower Type: ', currentFlowerType);
        console.log('Flower Set Length: ', flowerType.length);

        const meanResult = mean(flowerType)
        arrayOfMeansValue.push({[currentFlowerType]: meanResult})
    }))
    return arrayOfMeansValue
}

const stdev = () => {

}

const mean = (objectSet) => {
    let sum = []
    let total = 0
    for (let i = 0; i < 4; i++) {
        Object.keys(objectSet).forEach(key => {
            total += objectSet[key][i]
        })
        console.log('result for index ', i, ': ', total/objectSet.length)
        sum.push(total/objectSet.length)
        total = 0
    }
    return sum
}
const sorted = seperateByClass(iris, '4')
summarize(sorted)