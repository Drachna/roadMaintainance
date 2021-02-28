const mongooseErrorFromatter = (rawError) => {
  console.log(rawError)
  const errors = {}
  for (const key in rawError.errors) {
    errors[key] = [rawError.errors[key].message]
  }
  return errors

}

module.exports = mongooseErrorFromatter
