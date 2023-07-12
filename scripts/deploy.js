const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
 
  // const _name = "Degen";
  // const _symbol = "DGN";
  // const _decimals = 18;
  // const _initialSupply = 1000000;
  // const DegenToken = await hre.ethers.getContractFactory("DegenToken");
  // const degenToken = await DegenToken.deploy(_name,_symbol,_decimals,_initialSupply);
  // await degenToken.deployed();
  // console.log(`A contract deployed  to ${degenToken.address}`);
  // console.log("Deployment completed!");
  //console.log(degenToken);

  // Deploy Game contract
  // const Game = await ethers.getContractFactory("Game");
  // const game = await Game.deploy();
  // await game.deployed();
  // console.log("Game contract deployed to:", game.address);

  // //Deploy GamingStore contract
  // const GamingStore = await ethers.getContractFactory("GamingStore");
  // const gamingStore = await GamingStore.deploy();
  // await gamingStore.deployed();
  // console.log("GamingStore contract deployed to:", gamingStore.address);

  // Deploy DegenToken contract
  const DegenToken = await ethers.getContractFactory("DegenToken");
  const degenToken = await DegenToken.deploy(
    "Degen",
    "DGN",
    18,
    1000000
  );
  await degenToken.deployed();
  console.log("DegenToken contract deployed to:", degenToken.address);

  console.log("Deployment completed!");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
