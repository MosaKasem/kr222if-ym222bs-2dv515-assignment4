const iris = require('../iris.json')
const bnote = require('../banknote_authentication.json')
const banknote_authentication = require('../banknote_authentication.json')

class NaiveBayes{
    constructor() {
        this.trainingModel = []
        this.predictions = []
        this.labels = []
    }
    fit(x, y) {
        this.labels = y
        this.trainingModel = x
        this.trainingModel['mean'] = iterate_and_calc_mean(x)
        this.trainingModel['std'] = iterate_and_calc_std(x)
    }
    predict(x) {
        const res = iterate_and_calc_probability(x, this.trainingModel.mean, this.trainingModel.std)
        
    }
}

const iterate_and_calc_probability = (dataSet, mean, std) => {
    let prob_result = []
    dataSet.forEach((data, i) => {
        const result = calculate_probability(data, mean[i], std[i])
        prob_result.push(result)
    })
    return prob_result
}
const calculate_probability = (dataSet, mean, std) => {
    let tmpArr = []
    let endResult = []
    // console.log('dataSet: ', dataSet);
    Object.values(dataSet).forEach((val, i) => {
        Object.keys(val).forEach(key => {
            if (key !== '4') {
                const exponent = Math.exp(-((val[key] - mean[key])**2 / (2 * std[key]**2)))
                const res = (1 / (Math.sqrt(2 * Math.PI) * std[key]) * exponent)
                tmpArr.push(res)
            }
        })
        const result = tmpArr.reduce((a, b) => a * b)
        endResult.push(tmpArr)
        endResult[i][4] = result
        tmpArr = []
    })
    return endResult
    // const indexArray = []
    // for (let i = 0; i < 4; i++) {
    //     Object.keys(dataSet).forEach(key => {
    //         let exponent = Math.exp(-((dataSet[key][i] - mean[0][i])**2 / (2 * std[0][i]**2)))
    //         let res = (1 / (Math.sqrt(2 * Math.PI) * std[0][i]) * exponent)
    //         indexArray.push(res)
    //     })
    // }
    // var finalResult = [], size = dataSet.length;
    // finalResult.push(indexArray.splice(0, size));
    // while (indexArray.length > 0) {
    //     finalResult.push(indexArray.splice(0, size));
    // }
    // return finalResult
}



/**
 * 	exponent = exp(-((x-mean)**2 / (2 * stdev**2 )))
	return (1 / (sqrt(2 * pi) * stdev)) * exponent
 */
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
    // console.table(arrayOfMeansValue);
    return arrayOfMeansValue
}

const iterate_and_calc_std = entireFlowerSet => {
    const avg = iterate_and_calc_mean(entireFlowerSet)
    const stdResult = []
    entireFlowerSet.map((flowerSet, index) => {
        const avgSet = avg[index]
        stdResult.push(calculate_stdev(flowerSet, avgSet))
    })
    return stdResult
}
// 50 st blommor
const calculate_stdev = (flowerSet, mean) => {
    const resultforStd = []
    const resultFromIterator = iterate_by_index(flowerSet, mean)
    mean.map((value, meanIndex) => {
        const stdResult = resultFromIterator.map((arrayOfValues, stdIndex) => {
            if (meanIndex === stdIndex) {
                return Math.sqrt(
                    arrayOfValues.map(x => Math.pow(x - value, 2)).reduce((a, b) => a + b) / arrayOfValues.length
                )
            }
        })
        resultforStd.push(stdResult.filter(e => e !== undefined))
    })

    return flatten(resultforStd)
}
function flatten(arr) {
    return [].concat(...arr)
}


const iterate_by_index = (flowerSet, avg) => {
    let indexArray = []
    for (let i = 0; i < 4; i++) {
        Object.keys(flowerSet).forEach(key => {
            indexArray.push(flowerSet[key][i])
        })
    }
    var finalResult = [], size = flowerSet.length;
    
    while (indexArray.length > 0) {
        finalResult.push(indexArray.splice(0, size));
    }
    return finalResult
}

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

const theXandY = () => {
    let x = seperateByClass(iris, '4')
    let y = []
    x.map((setOfData) => {
        Object.values(setOfData).forEach((key, index) => {
            y.push(key[4])
        })
    })
    return {x, y}
}
const {x, y} = theXandY() // data and labels

const nb = new NaiveBayes()
nb.fit(x, y)
nb.predict(x)
// const standardDeviation = iterate_and_calc_std(nb.trainingModel)
// const meanValues = iterate_and_calc_mean(nb.trainingModel)
// const probability = iterate_and_calc_probability(nb.trainingModel, meanValues, standardDeviation)
// console.table(meanValues);
// console.table(standardDeviation);


// const numbers = seperateByClass(iris, '4')
// const std = iterate_and_calc_std(numbers)
// const mean = iterate_and_calculate(numbers)
// const numbers2 = iterate_and_calc_std(numbers)
// console.log('numbers2: ', numbers2);

module.exports = {
    calculate_mean: calculate_mean,
    iterate_by_index: iterate_by_index,
    calculate_stdev: calculate_stdev,
    flatten: flatten,
    iterate_and_calc_std: iterate_and_calc_std,
    iterate_and_calc_mean: iterate_and_calc_mean,
    seperateByClass: seperateByClass,
    NaiveBayes: NaiveBayes
}