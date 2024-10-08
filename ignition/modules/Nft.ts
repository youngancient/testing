import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const ERC721Module = buildModule("ERC721Module", (m) => {

  const nft = m.contract("SwissKnife");

  return { nft };
});

export default ERC721Module;
