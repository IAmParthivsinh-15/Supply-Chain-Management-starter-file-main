require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      chainId: 1337, // Default chain ID for Hardhat Network
    },
    // rinkeby: {
    //   url: `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
    //   accounts: [`0x${YOUR_PRIVATE_KEY}`]
    // },
  },
};
