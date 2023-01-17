const crypto = require("crypto")

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};

exports.refractoredDeterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0"
  const MAX_PARTITION_KEY_LENGTH = 256
  let candidate
  
  if (!event) {
    // return 0 when null event
    return TRIVIAL_PARTITION_KEY
  }

  if (event.partitionKey) {
    // return partitionKey when partitionKey field exists
    return event.partitionKey
  }

  // saves the hash value of the stringified JSON
  candidate = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    // saves the hash value if the candidate length is bigger than MAX_PARTITION_KEY_LENGTH
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex")
  }

  return candidate
}