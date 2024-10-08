import { ethers } from "hardhat";
import { Contract } from "ethers";

// Function to retrieve the most recent deployed proxy (you can customize how you store and retrieve deployment addresses)
async function getMostRecentlyDeployedProxy(contractName: string): Promise<string> {
    const ContractFactory = await ethers.getContractFactory(contractName);
    const contract = await ContractFactory.deploy();
    // await contract.deployed();
    const deploymentTransaction = contract.deploymentTransaction;
    return deploymentTransaction.name;
}

// Function to deploy the new implementation (contractB)
async function deployContractB() {
    const ContractB = await ethers.getContractFactory("contractB");
    const contractB = await ContractB.deploy();
    // await contractB.deployed();
    console.log("New ContractB deployed to:", contractB.target.toString());
    return contractB;
}

// Function to upgrade the proxy to point to the new implementation (contractB)
async function upgradeProxy(proxyAddress: string, newImplementationAddress: string): Promise<void> {
    const proxyContract = await ethers.getContractAt("ERC1967Proxy", proxyAddress);
    const tx = await proxyContract.upgradeTo(newImplementationAddress); // Call the `upgradeTo` function
    // await tx.wait();
    console.log(`Proxy at ${proxyAddress} upgraded to new implementation at ${newImplementationAddress}`);
}

async function upgradeContract() {
    // Get the most recent proxy deployment
    const mostRecentlyDeployedProxy = await getMostRecentlyDeployedProxy("ERC1967Proxy");

    // Deploy the new implementation (contractB)
    const newContractB = await deployContractB();

    // Upgrade the proxy to point to the new implementation
    await upgradeProxy(mostRecentlyDeployedProxy, newContractB.
        target.toString()
    );
}

async function main() {
    await upgradeContract();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });