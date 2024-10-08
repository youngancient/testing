// import { artifacts, ethers } from "hardhat";
import hre, { ethers } from "hardhat";
import Web3 from "web3";
import {bytecode} from "../../artifacts/contracts/Proxy/ERC1967.sol/MyProxy.json"

// import { utils } from "../typechain-types/@openzeppelin/contracts";
// import { contractA } from "../src/contractA";
// import { ERC1967Proxy } from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
declare module "hardhat/types/runtime" {
    interface HardhatRuntimeEnvironment {
      web3: Web3;
    }
  }
  
  // Initialize Web3 with the network provider from Hardhat
  hre.web3 = new Web3(hre.network.provider);
async function deployContractA() {
  const [deployer] = await ethers.getSigners();

  const ContractA = await ethers.getContractFactory("contractA");
  const contractA = await ContractA.deploy();
    console.log("ContractA deployed to:", contractA.target);

    const proxy = await ethers.getContractFactory("MyProxy");
    const initData = contractA.interface.encodeFunctionData("initialize", []);
    const erc1967Proxy = await proxy.deploy(contractA.target, initData);
  


    return erc1967Proxy.target;
}


async function main() {
  const proxyAddress = await deployContractA();
  console.log("ContractA deployed to::", proxyAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });