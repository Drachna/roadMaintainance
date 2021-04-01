

module.exports.imageFileValidator = (req, res, next) => {
  
  const expectedFileType = ['png', 'jpg', 'jpeg']
  if (!req.files) {
    return res.status(400).send({ message: 'Provide an image' })
  }

  const fileExtension = req.files.imageToAdd.mimetype.split('/').pop()

  if (!expectedFileType.includes(fileExtension)) {
    return res.status(400).send({ message: 'Image file extension should be .png , .jpg or .jpeg only' })
  }

  next()
}

