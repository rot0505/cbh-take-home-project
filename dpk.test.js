const crypto = require("crypto")
const { deterministicPartitionKey, refractoredDeterministicPartitionKey } = require("./dpk")

describe("deterministicPartitionKey", () => {

  it("Returns '0' when null event", () => {
    const nullEvent = null
    expect(deterministicPartitionKey(nullEvent)).toBe(refractoredDeterministicPartitionKey(nullEvent))
  })

  it("Returns 'partition key' for the event with partition key", () => {
    const eventWithPartitionKey = {
      partitionKey: 'partition key',
      name: 'example event'
    }
    expect(deterministicPartitionKey(eventWithPartitionKey)).toBe(refractoredDeterministicPartitionKey(eventWithPartitionKey))
  })

  it("Returns hash of event for the event without partition key", () => {
    const eventWithoutPartitionKey = {
      name: 'example event'
    }
    expect(deterministicPartitionKey(eventWithoutPartitionKey)).toBe(refractoredDeterministicPartitionKey(eventWithoutPartitionKey))
  })
})