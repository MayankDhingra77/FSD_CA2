exports.notFound = (req, res) =>{
  res.status(404).json({success: false, message: `Route does not exist:${req.originalUrl}`});
};

exports.errorHandler = (err, req, res) =>{
  if(err.type === "entity.parse.failed"){
    return res.status(400).json({success: false, message: "Invalid JSON"});
  }
  if(err.name === "ValidationError"){
    return res.status(400).json({ success: false, message: err.message });
  }
  console.log(err);
  res.status(500).json({ success: false, message: "Server error", error : err.message });
};
