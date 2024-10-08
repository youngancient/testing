// Import necessary modules from Hardhat and SwisstronikJS
import { abi } from "../artifacts/contracts/Perc20/myPERC20.sol/PERC20Sample.json";
import hre from "hardhat";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import Web3 from "web3";

// Extend HardhatRuntimeEnvironment to include web3
declare module "hardhat/types/runtime" {
    interface HardhatRuntimeEnvironment {
        web3: Web3;
    }
}

// Initialize web3 and register the plugin

async function main() {
  // // console.log(hre.network.provider);
  const web3 = new Web3(hre.network.provider); // Any RPC node you wanted to connect with
   web3.registerPlugin(new SwisstronikPlugin("https://json-rpc.testnet.swisstronik.com/"));
  
  // Register the Swisstronik plugin

  // Address of the deployed contract
  const contractAddress = "0xB3BbFa693c414B66B8424c4617bB538f49eE99cB";

  // Get the signer (your account)
  const [from] = await  hre.web3.eth.getAccounts();
  const to = "0xa6B1feB40D1c8eeAD5AFD6f7372E02B637F142FA";
  const amount = 1*10**18;

  console.log("Transferring tokens from account", from);

  // Create a contract instance
  const contract = new hre.web3.eth.Contract(abi, contractAddress);
  console.log(contract);

  // Call the transfer function
  const transferTx =  contract.methods.transfer(to, amount)
  console.log("Transferring tokens...");
  // transferTx.wait();

  console.log("Transaction Receipt: ", transferTx);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});