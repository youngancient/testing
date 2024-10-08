import { ethers } from "hardhat";

async function main() {
  // const bal = await cltk.totalSupply();

  // console.log(bal);
 
  const [owner] = await ethers.getSigners();

  const clownTokenAddress = "0x8251aEA64aa7d28B9f536f7eb1E1db0BbC8b6386";

  const cltk = await ethers.getContractAt(
    "ClownToken",
    clownTokenAddress,
    owner,
  );
  const totalSupply = await cltk.totalSupply();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
