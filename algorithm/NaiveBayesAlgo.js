const iris = require('../iris.json')
const banknote_authentication = require('../banknote_authentication.json')

/**
 * keyValue is key name from the object: in this case, Movie or UserID
 * @param {*} keyValue
 * @returns a sorted array of arrays based on the parameter (Movie )
 */
const sortByKey = (dataSet ,keyValue) => {
    const sorted = []
    dataSet.forEach(function (a) {
      this[a[keyValue]] || sorted.push(this[a[keyValue]] = [])
  
      this[a[keyValue]].push(a)
    }, Object.create(null))
    return sorted
}

const seperateByClass = (file) => {
    const seperated = []
    // for (const key of files) {
    //     console.log('key: ', key)
    //     console.log(files.length)
    // }
    const sorted = sortByKey(file ,'4')
    console.log('sorted: ', sorted);
    // console.log('sorted: ', sorted);
}

seperateByClass(iris)