import hre, { ethers } from "hardhat";
// import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import Web3 from "web3";
import { abi, bytecode } from "../../artifacts/contracts/Perc20/myPERC20.sol/PERC20Sample.json";

// Extend HardhatRuntimeEnvironment to include web3
declare module "hardhat/types/runtime" {
    interface HardhatRuntimeEnvironment {
        web3: Web3;
    }
}
hre.web3 = new Web3(hre.network.provider);

async function main() {
  // Get the signer (your account)
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contract with the account: ${deployer.address}`);

  const perc20 = await new hre.web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [],
    })
    .send({
      from: deployer.address,
    });

  console.log(`PERC20Sample was deployed to ${perc20.options.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// The deployed() function is no longer available on the contract instance returned by deployContract().
// Instead, the contract is considered deployed as soon as deployContract() resolves.
// this modified script solved the error of "TypeError: perc20.deployed is not a function"