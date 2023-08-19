import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ABI from '../contracts/NFTMarketplace.sol/NFTMarketplace.json';

const BlockchainContext = createContext();

export const useBlockchainContext = () => {
  return useContext(BlockchainContext);
};

export const BlockchainProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');

  const connectWallet = async () => {
    try {
      // console.log("connecting");
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
  
        // Listen for account changes and update the currentAccount state
        window.ethereum.on('accountsChanged', (accounts) => {
          setCurrentAccount(accounts[0] || ''); // Set to the first account or empty string if no account
        });
      } else {
        window.alert("Non-Ethereum browser detected. You should consider trying Metamask !");
      }
    };

    loadWeb3();
  }, []);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (provider) {
          const signer = provider.getSigner();
          const contractAddress = '0xF3FD7dd33e855a5311087929EedF7f3bD61DF02a';
          const deployedContract = new ethers.Contract(contractAddress, ABI.abi, signer);
          setContract(deployedContract);
  
          // Get the initial account and set it to currentAccount
          const accounts = await provider.listAccounts();
          setCurrentAccount(accounts[0] || ''); // Set to the first account or empty string if no account
        }
      } catch (error) {
        console.error("Error loading contract data:", error);
      }
    };

    loadBlockchainData();
  }, [provider]);

  const contextValue = {
    provider,
    contract,
    currentAccount,
    connectWallet, // Include the connectWallet function in the context
  };

  return (
    <BlockchainContext.Provider value={contextValue}>
      {children}
    </BlockchainContext.Provider>
  );
};




// import { createContext, useContext, useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import ABI from '../contracts/NFTMarketplace.sol/NFTMarketplace.json';

// const BlockchainContext = createContext();

// export const useBlockchainContext = () => {
//   return useContext(BlockchainContext);
// };

// export const BlockchainProvider = ({ children }) => {
//   const [provider, setProvider] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [currentAccount, setCurrentAccount] = useState('');

//   useEffect(() => {
//     const loadWeb3 = async () => {
//       if (window.ethereum) {
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         setProvider(provider);
  
//         // Listen for account changes and update the currentAccount state
//         window.ethereum.on('accountsChanged', (accounts) => {
//           setCurrentAccount(accounts[0] || ''); // Set to the first account or empty string if no account
//         });
//       } else {
//         window.alert("Non-Ethereum browser detected. You should consider trying Metamask !");
//       }
//     };

//     loadWeb3();
//   }, []);

//   useEffect(() => {

//     const loadBlockchainData = async () => {
//       try {
//         if (provider) {
//           const signer = provider.getSigner();
//           const contractAddress = '0xF3FD7dd33e855a5311087929EedF7f3bD61DF02a';
//           const deployedContract = new ethers.Contract(contractAddress, ABI.abi, signer);
//           setContract(deployedContract);
  
//           // Get the initial account and set it to currentAccount
//           const accounts = await provider.listAccounts();
//           setCurrentAccount(accounts[0] || ''); // Set to the first account or empty string if no account
//         }
//       } catch (error) {
//         console.error("Error loading contract data:", error);
//       }
//     };

//     loadBlockchainData();
//   }, [provider]);

//   const contextValue = {
//     provider,
//     contract,
//     currentAccount,
//   };

//   return (
//     <BlockchainContext.Provider value={contextValue}>
//       {/* {children} */}
//       {provider && contract && currentAccount ? children : null}
//     </BlockchainContext.Provider>
//   );
// };
