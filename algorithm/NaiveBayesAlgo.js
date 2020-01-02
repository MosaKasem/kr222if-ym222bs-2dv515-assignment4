const iris = require('../iris.json')
const banknote_authentication = require('../banknote_authentication.json')

/**
 * keyValue is key name from the object: in this case, Movie or UserID
 * @param {*} keyValue
 * @returns a sorted array of arrays based on the parameter (Movie )
 */
const seperateByClass = (dataSet, keyValue) => {
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

        // console.log('Flower Type: ', currentFlowerType);
        // console.log('Flower Set Length: ', flowerType.length);

        const meanResult = calculate_mean(flowerType)
        // arrayOfMeansValue.push({ [currentFlowerType]: meanResult })
        arrayOfMeansValue.push(meanResult)
    }))
    console.table(arrayOfMeansValue);
    return arrayOfMeansValue
}

const iterate_and_calc_std = entireFlowerSet => {
    const avg = iterate_and_calc_mean(entireFlowerSet)
    entireFlowerSet.map((flowerSet, index) => {
        const avgSet = avg[index]
        const res = calculate_stdev(flowerSet, avgSet)
    })
}

const calculate_stdev = (flowerSet, mean) => {
    console.table(mean);
    const resultFromIterator = iterate_by_index(flowerSet, mean)
    mean.map((value, index) => {
        const stdResult = resultFromIterator.map(arrayOfValues => {
            // console.log(value)
            return Math.sqrt(
                arrayOfValues.map(x => Math.pow(x - value, 2)).reduce((a, b) => a + b) / arrayOfValues.length
                )
            })
        console.log('stdResult: ', stdResult);
    })
    // for (let i = 0; i < mean.length; i++) {
    //     for (let j = 0; j < resultFromIterator.length; j++) {
    //         console.log(resultFromIterator[i][j])
    //     }
    // }
}

const iterate_by_index = (flowerSet, avg) => {
    let indexArray = []
    for (let i = 0; i < 4; i++) {
        Object.keys(flowerSet).forEach(key => {
            indexArray.push(flowerSet[key][i])
        })
    }
    var finalResult = [], size = 50;
    
    while (indexArray.length > 0) {
        finalResult.push(indexArray.splice(0, size));
    }
    return finalResult
}

// const calculate_stdev = (flowerSet, avg) => {
//     const arrayOfAvg = avg[Object.keys(avg)] // extract the array
//     const finalRes = []
//     let total = 0
//     // console.log(flowerSet[0][4])
//     flowerSet.map((aFlower) => {

//             Object.keys(aFlower).forEach((key) => {
//                 console.log('aFlower: ', aFlower[key]);
//                 if (typeof aFlower[key] === 'number') { // if number, apply
//                     total += Math.pow(aFlower[key] - arrayOfAvg[key], 2) / flowerSet.length
//                 }
//             })

//     })
//     return Math.sqrt(total)
// }

const calculate_mean = (objectSet) => {
    let sum = []
    let total = 0
    for (let i = 0; i < 4; i++) {
        Object.keys(objectSet).forEach(key => {
            total += objectSet[key][i]
        })
        // console.log('result for index ', i, ': ', total / objectSet.length)
        sum.push(total / objectSet.length)
        total = 0
    }
    return sum
}
const numbers = seperateByClass(iris, '4')
const std = iterate_and_calc_std(numbers)
// const mean = iterate_and_calculate(numbers)
// const numbers2 = iterate_and_calc_std(numbers)
// console.log('numbers2: ', numbers2);