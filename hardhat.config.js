/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
const ALCHEMY_API_KEY = "tqEY4ar-sGmChpmnF6m_DC7ZFeIqgjxW";
const GORELI_PRIVATE_KEY ="64d7e848ea699d9d96e10a146087b643507423bcd6599e43243a40efae776c52";
module.exports = {
  solidity: "0.8.9",

  networks: {
    ropsten: {
      url: `https://eth-goerli.g.alchemy.com/v2/`,
      accounts: [`0x${GORELI_PRIVATE_KEY}`],
    },
  },
};
