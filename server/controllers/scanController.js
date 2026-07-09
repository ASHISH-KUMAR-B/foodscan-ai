export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image uploaded."
    });
  }

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully.",
    file: {
      filename: req.file.filename,
      path: req.file.path
    }
  });
};