import { abi, bytecode } from "../../artifacts/contracts/Perc20/myPERC20.sol/PERC20Sample.json";
import { Web3 } from "web3";
import hre, { network } from "hardhat";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";

async function main() {

  const web3 = new Web3(hre.network.provider); // Any RPC node you wanted to connect with
  
   web3.registerPlugin(new SwisstronikPlugin("https://json-rpc.testnet.swisstronik.com")); // Any RPC node you wanted to connect with

  // Address of the deployed contract
  const contractAddress = '0xB3BbFa693c414B66B8424c4617bB538f49eE99cB';

  // Get the signer (your account)
  const from = await hre.web3.eth.getAccounts();
  console.log(from);
  const acct = from[0];
  // const from = accounts[0];
  console.log("Minting 100 tokens using account", acct);

  // Create a contract instance using the provided ABI and contract address
  try {
    const contract = new hre.web3.eth.Contract(abi, contractAddress);
    // console.log(contract);
    

    // Call the mint function and wait for the transaction receipt
    const mint100TokensTx = await contract.methods
      .mint();
    
  console.log("Minting 100 tokens...");
    console.log("Transaction Receipt: ", mint100TokensTx);
  }catch(error) { 
    console.log(error)
  }

}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error("Error in execution: ", error);
  process.exitCode = 1;
});