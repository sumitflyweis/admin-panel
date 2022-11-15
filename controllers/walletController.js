const Wallet = require("../models/wallet");
const catchAsync = require("../utils/catchAsync");

exports.addMoney = catchAsync(async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.user });
  console.log(wallet);
  wallet.balance = wallet.balance + req.body.balance;
  const w = await wallet.save();

  res.status(200).json({
    status: "success",
    data: w,
  });
});

exports.removeMoney = catchAsync(async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.user });

  wallet.balance = wallet.balance - req.body.balance;
  const w = await wallet.save();

  res.status(200).json({
    status: "success",
    data: w,
  });
});

exports.getWallet = catchAsync(async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.user }).populate("user");
  res.status(200).json({
    status: "success",
    data: wallet,
  });
});

// ADMIN

exports.getWalletById = catchAsync(async (req, res) => {
  const w = await Wallet.findOne({ user: req.params.id }).populate("user");

  res.status(200).json({
    status: "success",
    data: w,
  });
});

exports.createWallet = catchAsync(async (req, res) => {
  console.log(req.user);
  const w = await Wallet.create({ user: req.user });

  res.status(200).json({
    status: "success",
    data: w,
  });
});
