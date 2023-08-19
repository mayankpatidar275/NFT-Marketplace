const hre = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftmarketplace = await NFTMarketplace.deploy();

  await nftmarketplace.deployed();

  console.log("Library deployed to:", nftmarketplace.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// Library deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3