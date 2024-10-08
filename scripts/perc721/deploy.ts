import hre, { ethers } from "hardhat";
import Web3 from "web3";
import { abi, bytecode } from "..//../artifacts/contracts/Perc721/PERC721Sample.sol/PERC721Sample.json";

// Extend HardhatRuntimeEnvironment to include web3
declare module "hardhat/types/runtime" {
  interface HardhatRuntimeEnvironment {
    web3: Web3;
  }
}

// Initialize Web3 with the network provider from Hardhat
hre.web3 = new Web3(hre.network.provider);

async function main() {
  // Get the deployer's account details
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contract with the account: ${deployer.address}`);

  // Deploy the contract using Web3.js
//   console.log(abi);
    const perc721 = await new hre.web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [], // Name and symbol for the PERC721 token
    })
   
    .send({
      from: deployer.address,
    });

  console.log(`PERC721Sample was deployed to ${perc721.options.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});