const {deterministicPartitionKey} = require("./dpk")
const {getShiftsByFacility,generateReport} = require('./ticketBreakdown')

console.log(deterministicPartitionKey())

console.log('-----------Ticket Breakdown-------------')
console.log('-----------Shifts By Facility-------------')
const shiftsByFac = getShiftsByFacility(1)
console.log(shiftsByFac)
console.log('-----------Report-------------')
console.log(generateReport(shiftsByFac))