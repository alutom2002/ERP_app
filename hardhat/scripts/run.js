const main = async () => {
    const testFactory = await hre.ethers.getContractFactory("test");
    const contract = await testFactory.deploy();
  
    await contract.deployed();
  
    console.log("Contract address: ", contract.address);
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