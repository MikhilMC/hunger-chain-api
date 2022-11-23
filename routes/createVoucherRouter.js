const express = require("express");
const ethers = require("ethers");
const { LazyMinter } = require("../lib");

const createVoucherRouter = express.Router();

createVoucherRouter.get("/", async (req, res) => {
  const lazyMinter = new LazyMinter({
    contractAddress: req.query.contractAddress,
    signer: new ethers.Wallet(req.query.privateKey),
    chainId: req.query.chainId,
  });

  const { voucher, signature } = await lazyMinter.createVoucher(
    req.query.uri,
    req.query.price
  );

  res.send({ voucher, signature });
});

module.exports = createVoucherRouter;
