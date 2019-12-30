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
 * @param {array of arrays with objects inside} sorted 
 */
const iterate_and_calc_mean = (sorted) => {
    const arrayOfMeansValue = []
    sorted.forEach((flowerType => {
        const currentFlowerType = flowerType[0]['4']
        
        console.log('Flower Type: ', currentFlowerType);
        console.log('Flower Set Length: ', flowerType.length);

        const meanResult = calculate_mean(flowerType)
        arrayOfMeansValue.push({[currentFlowerType]: meanResult})
    }))
    return arrayOfMeansValue
}

const iterate_and_calc_std = numbers => {
    const avg = iterate_and_calc_mean(numbers)
    numbers.forEach(flowerSet => {
        const res = calculate_stdev(flowerSet)
    })
}

const calculate_stdev = (flowerSet) => {
    let sum = []
    flowerSet.map(e => {
        console.log(flowerSet[0][4], e) // current iteration
    })
    // for (let i = 0; i < 4; i++) {
    //     Object.keys(flowerSet).forEach(key => {
    //         flowerSet[key][i]
    //     })
    // }
    return sum
}

const calculate_mean = (objectSet) => {
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
const numbers = seperateByClass(iris, '4')
// const mean = iterate_and_calculate(numbers)
iterate_and_calc_std(numbers)