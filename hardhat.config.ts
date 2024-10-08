import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-web3-v4";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  // networks :{
  //   sepolia :{
  //     url : `https://eth-sepolia.g.alchemy.com/v2/o8P5Uj9ObttRRtuaWg-44jrSNnB1nX_9`,
  //     accounts : [`${process.env.TESTNET_PRIVATE_KEY}`]
  //   }
  // },
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [`0x` + `${process.env.TESTNET_PRIVATE_KEY!}`],
    },
  },
  etherscan: {
    apiKey: `ANY_STRING_WILL_DO`,
    customChains: [
      {
        network: "swisstronik",
        chainId: 1291,
        urls: {
          apiURL: "https://explorer-evm.testnet.swisstronik.com/api",
          browserURL: "https://explorer-evm.testnet.swisstronik.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: true
  }
};

export default config;
