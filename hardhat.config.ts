import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks :{
    sepolia :{
      url : `https://eth-sepolia.g.alchemy.com/v2/o8P5Uj9ObttRRtuaWg-44jrSNnB1nX_9`,
      accounts : [`${process.env.TESTNET_PRIVATE_KEY}`]
    }
  },
  etherscan :{
    apiKey : {
      sepolia : `${process.env.ETHERSCAN_API_KEY}`
    }
  }
};

export default config;
