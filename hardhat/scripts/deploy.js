const main = async () => {
  const erpContractFactory = await hre.ethers.getContractFactory("ErpContract");
  const erpContract = await erpContractFactory.deploy();

  await erpContract.deployed();

  console.log("Contract address: ", erpContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();