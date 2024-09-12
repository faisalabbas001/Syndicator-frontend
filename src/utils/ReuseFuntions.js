export const chainOptions = [
  {
    name: "ETH",
    icon: "/assets/images/Ethereum_logo.png",
    address: "0x0000000000000000000000000000000000000000",
  },
  {
    name: "ABD",
    icon: "/tokenImages/token3.png",
    address: "0x2421f82ABfEe7C620C01B828a7B2E7141672c612",
  },
  {
    name: "syn-test",
    icon: "/assets/images/Ethereum_logo.png",
    address: "0x043910B9D6Bf8AF5d088eA22948b8397f240fA4f",
  },
  {
    name: "PEPE",
    icon: "/tokenImages/token1.png",
    address: "0x3797988B94E4bDb9767FC8BC0Ea4BE5e9e7a6931",
  },
  {
    name: "SyndicatorLabs",
    icon: "/tokenImages/token2.png",
    address: "0x6aa31F147b206C3eC2E8D7c420e4F3ceb4D269Fb",
  },
  {
    name: "Bitcoin",
    icon: "/tokenImages/token3.png",
    address: "0x806D0637Fbbfb4EB9efD5119B0895A5C7Cbc66e7",
  },
  {
    name: "Doge",
    icon: "/tokenImages/token4.png",
    address: "0x9bc8388dD439fa3365B1F78A81242aDBB4677759",
  },
  {
    name: "FI",
    icon: "/tokenImages/token5.png",
    address: "0xe6714a67cabd598882C42e2719908E648E734ec3",
  },
];

export const chainOptionsWithName = [
  {
    name: "ETHEREUM",
    icon: "/assets/images/Ethereum_logo.png",
    address: "0x0000000000000000000000000000000000000000",
  },
  {
    name: "ABD",
    icon: "/tokenImages/token3.png",
    address: "0x2421f82ABfEe7C620C01B828a7B2E7141672c612",
  },
  {
    name: "SYN-TEST",
    icon: "/assets/images/Ethereum_logo.png",
    address: "0x043910B9D6Bf8AF5d088eA22948b8397f240fA4f",
  },
  {
    name: "PEPE",
    icon: "/tokenImages/token1.png",
    address: "0x3797988B94E4bDb9767FC8BC0Ea4BE5e9e7a6931",
  },
  {
    name: "SYNDICTORLABS",
    icon: "/tokenImages/token2.png",
    address: "0x6aa31F147b206C3eC2E8D7c420e4F3ceb4D269Fb",
  },
  {
    name: "BITCOIN",
    icon: "/tokenImages/token3.png",
    address: "0x806D0637Fbbfb4EB9efD5119B0895A5C7Cbc66e7",
  },
  {
    name: "DOGE",
    icon: "/tokenImages/token4.png",
    address: "0x9bc8388dD439fa3365B1F78A81242aDBB4677759",
  },
  {
    name: "FIDIUM",
    icon: "/tokenImages/token5.png",
    address: "0xe6714a67cabd598882C42e2719908E648E734ec3",
  },
];

export const getTokenImage = (address) => {
  const chain = chainOptions.find((chain) => chain.address === address);
  return chain ? chain.icon : null;
};

export const getTokenSymbol = (address) => {
  const chain = chainOptions.find((chain) => chain.address === address);
  return chain ? chain.name : null;
};

export const getTokenName = (address) => {
  const chain = chainOptionsWithName.find((chain) => chain.address === address);
  return chain ? chain.name : null;
};

export const checkFill = (amount, chunk_size) => {
  if (amount === chunk_size) {
    return "Entire Fill";
  } else {
    return "Partial Fill";
  }
};
