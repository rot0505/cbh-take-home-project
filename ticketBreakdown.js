const shifts = require("./mock/shifts")
const agents = require("./mock/agents")

const getShiftsByFacility = id => {
    const agentsByFacility = agents.filter(agent => agent.facility_id === id)
    let shiftsByFacility = []
    agentsByFacility.map(agent => shiftsByFacility.push(...(shifts.filter(shift => shift.agent_id === agent.id))))
    return shiftsByFacility
}

const generateReport = shifts => {
    let reports = agents, i
    for (i = 0 ; i < reports.length ; ++i) {
        reports[i].shifts = shifts.filter(shift => shift.agent_id === reports[i].id)
        reports[i].workingHours = reports[i].shifts.reduce((total, shift) => total + shift.time_estimate, 0)
    }
    return reports
}

module.exports = {
    getShiftsByFacility,
    generateReport
}