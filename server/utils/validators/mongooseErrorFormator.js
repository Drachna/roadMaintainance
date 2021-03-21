const mongooseErrorFromatter = (rawError) => {
  console.log(rawError,'from mongoose')
  const errors = {}
  for (const key in rawError.errors) {
    console.log(key);
    errors[key] = [rawError.errors[key].message]
  }
  console.log('err',rawError.message);
  return errors

}

module.exports = mongooseErrorFromatter
