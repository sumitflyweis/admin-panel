const Support = require("../models/Support");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.create = catchAsync(async (req, res) => {
  const sup = await Support.create(req.body);

  res.status(201).json({
    status: "success",
    data: sup,
  });
});

exports.update = catchAsync(async (req, res) => {
  const sup = await Support.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: sup,
  });
});

exports.read = catchAsync(async (req, res) => {
  const sup = await Support.find();

  res.status(200).json({
    status: "success",
    data: sup,
  });
});

exports.delete = catchAsync(async (req, res) => {
  await Support.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});
