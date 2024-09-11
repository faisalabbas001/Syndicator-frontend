  //  get token image from chain address

  export const getTokenImage = (address) => {
    // const chainOptions = [
    //   {
    //     name: 'ETH',
    //     icon: '/assets/images/Ethereum_logo.png',
    //     address: '0x0000000000000000000000000000000000000000',
    //   },
    //   {
    //     name: 'PEPE',
    //     icon: '/tokenImages/token1.png',
    //     address: '0x3797988B94E4bDb9767FC8BC0Ea4BE5e9e7a6931',
    //   },
    //   {
    //     name: 'SyndicatorLabs',
    //     icon: '/tokenImages/token2.png',
    //     address: '0x6aa31F147b206C3eC2E8D7c420e4F3ceb4D269Fb',
    //   },
    //   {
    //     name: 'Bitcoin',
    //     icon: '/tokenImages/token3.png',
    //     address: '0x806D0637Fbbfb4EB9efD5119B0895A5C7Cbc66e7',
    //   },
    //   {
    //     name: 'Doge',
    //     icon: '/tokenImages/token4.png',
    //     address: '0x9bc8388dD439fa3365B1F78A81242aDBB4677759',
    //   },
    //   {
    //     name: 'FI',
    //     icon: '/tokenImages/token5.png',
    //     address: '0xe6714a67cabd598882C42e2719908E648E734ec3',
    //   },
    // ];
    if (address === '0x0000000000000000000000000000000000000000') {
      return '/assets/images/Ethereum_logo.png';
    }
    else if (address === '0x3797988B94E4bDb9767FC8BC0Ea4BE5e9e7a6931') {
      return '/tokenImages/token1.png';
    }
    else if (address === '0x6aa31F147b206C3eC2E8D7c420e4F3ceb4D269Fb') {      
      return '/tokenImages/token2.png';
  }
  else if (address === '0x806D0637Fbbfb4EB9efD5119B0895A5C7Cbc66e7') {
      return '/tokenImages/token3.png';
    }
    else if (address === '0x9bc8388dD439fa3365B1F78A81242aDBB4677759') {
      return '/tokenImages/token4.png';
    }
    else if (address === '0xe6714a67cabd598882C42e2719908E648E734ec3') {
      return '/tokenImages/token5.png';
    }
    else {
      return '/assets/images/Ethereum_logo.png';
    }
  };

  // Get Token Name from chain address

 export const getTokenSymbol = (address) => { 
    if (address === '0x0000000000000000000000000000000000000000') {
      return 'ETH';
    }
    else if (address === '0x3797988B94E4bDb9767FC8BC0Ea4BE5e9e7a6931') {
      return 'PEPE';
    }
    else if (address === '0x6aa31F147b206C3eC2E8D7c420e4F3ceb4D269Fb') {      
      return 'SyndicatorLabs';
  }
  else if (address === '0x806D0637Fbbfb4EB9efD5119B0895A5C7Cbc66e7') {
      return 'BTC';
    }
    else if (address === '0x9bc8388dD439fa3365B1F78A81242aDBB4677759') {
      return 'DOGE';
    }
    else if (address === '0xe6714a67cabd598882C42e2719908E648E734ec3') {
      return 'FI';
    }
    else {
      return 'TEST-TOKEN';
    }
  };
 export const getTokenName= (address) => { 
    if (address === '0x0000000000000000000000000000000000000000') {
      return 'Etherium';
    }
    else if (address === '0x3797988B94E4bDb9767FC8BC0Ea4BE5e9e7a6931') {
      return 'Pepe';
    }
    else if (address === '0x6aa31F147b206C3eC2E8D7c420e4F3ceb4D269Fb') {      
      return 'SyndicatorLabs';
  }
  else if (address === '0x806D0637Fbbfb4EB9efD5119B0895A5C7Cbc66e7') {
      return 'Bitcoin';
    }
    else if (address === '0x9bc8388dD439fa3365B1F78A81242aDBB4677759') {
      return 'Dogecoin';
    }
    else if (address === '0xe6714a67cabd598882C42e2719908E648E734ec3') {
      return 'Fideum';
    }
    else if (address === "0x2421f82ABfEe7C620C01B828a7B2E7141672c612") {
      return 'Hello_Token';
    }
    else {
      return 'TEST-TOKEN';
    }
  };
 export const checkFill = (amount,chunk_size) => { 
  if (amount===chunk_size) {
    return "Entire Fill"
  }
  else{
    return "Partial Fill"
  }
  };