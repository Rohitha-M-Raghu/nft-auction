require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    mychain: {
      url: 'http://172.23.23.23:8600',
      gasPrice: 1500000000,
      chainId: 67,
      gas: 4100000,
      accounts: [
        '7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
        '689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd',
        '8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61',
      ],
    },
  },
};
