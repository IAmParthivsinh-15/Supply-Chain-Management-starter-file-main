// import React, { useState, useEffect } from "react";
// import Web3Modal from "web3modal";
// import { ethers } from "ethers";

// import tracking from "../Conetxt/Tracking.json";
// const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const ContractABI = tracking.abi;

// const fetchContract = (signerOrProvider) => {
//   return new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);
// };

// export const TrackingContext = React.createContext();
// export const TrackingProvider = ({ children }) => {
//   const DappName = "Produxt Tracking Dapp";
//   const [currentUser, setCurrentUser] = useState("");

//   import React, { useState, useEffect } from "react";
//   import Web3Modal from "web3modal";
//   import { ethers } from "ethers";
  
//   import tracking from "../Conetxt/Tracking.json";
//   const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//   const ContractABI = tracking.abi;
  
//   const fetchContract = (signerOrProvider) => {
//     return new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);
//   };
  
//   export const TrackingContext = React.createContext();
//   export const TrackingProvider = ({ children }) => {
//     const DappName = "Produxt Tracking Dapp";
//     const [currentUser, setCurrentUser] = useState("");
  
//     const createShipment = async (items) => {
//       console.log(items);
//       const { receiver, pickupTime, distance, price } = items;
    
//       try {
//         const web3modal = new Web3Modal();
//         const connection = await web3modal.connect();
//         const provider = new ethers.providers.Web3Provider(connection);
//         const signer = provider.getSigner();
//         const contract = fetchContract(signer);
    
//         // Convert pickupTime to a Date object, then get the timestamp
//         const pickupDate = new Date(pickupTime);
    
//         // Check if the pickupDate is valid
//         if (isNaN(pickupDate.getTime())) {
//           throw new Error("Invalid date format for pickupTime");
//         }
    
//         const createItem = await contract.createShipment(
//           receiver,
//           pickupDate.getTime(), // Use the correct timestamp
//           distance,
//           ethers.utils.parseUnits(price, 18),
//           {
//             value: ethers.utils.parseUnits(price, 18),
//           }
//         );
        
//         await createItem.wait();
//         console.log(createItem);
//       } catch (error) {
//         console.log("something went wrong", error);
//       }
//     };
    
//     };
  
//     const getAllShipments = async () => {
//       try {
//         const provider = new ethers.providers.JsonRpcProvider();
//         const contract = fetchContract(provider);
//         console.log("contract ended")
//         const shipments = await contract.getAllTransactions();
//         console.log("1")
//         const allShipments = shipments.map((shipment) => ({
//           sender: shipment.sender,
//           receiver: shipment.receiver,
//           price: ethers.utils.formatEther(shipment.price, toString()),
//           pickupTime: shipment.pickupTime.toNumber(),
//           distance: shipment.distance.toNumber(),
//           isPaid: shipment.isPaid,
//           status: shipment.status,
//         }));
  
//         return allShipments;
//       } catch (error) {
//         console.log("error while getting shipment", error);
//       }
//     };
  
//     const getShipmentsCount = async () => {
//       try {
//         if (!window.ethereum) return "Install Metamask";
  
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
//         const provider = new ethers.providers.JsonRpcProvider();
//         const contract = fetchContract(provider);
//         const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
//         return shipmentsCount.toNumber();
//       } catch (error) {
//         console.log("error while getting count of shipments ", error);
//       }
//     };
  
//     const completeShipment = async (completeShip) => {
//       console.log(completeShip);
  
//       const { receiver, index } = completeShip;
//       try {
//         if (!window.ethereum) return "Install MetaMask";
  
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
//         const web3modal = new Web3Modal();
//         const connection = await web3modal.connect();
//         const provider = new ethers.providers.Web3Provider(connection);
//         const signer = provider.getSigner();
//         const contract = fetchContract(signer);
  
//         const trasaction = await contract.completeShipment(
//           accounts[0],
//           receiver,
//           index,
//           {
//             gasLimit: 300000,
//           }
//         );
  
//         trasaction.wait();
//         console.log(trasaction);
//       } catch (error) {
//         console.log("error while completing the shipments", error);
//       }
//     };
  
//     const getShipment = async (index) => {
//       console.log(index * 1);
  
//       try {
//         if (!window.ethereum) return "Install MetaMask";
  
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
  
//         const provider = new ethers.providers.JsonRpcProvider();
//         const contract = fetchContract(provider);
//         const shipment = await contract.getShipment(accounts[0], index * 1);
  
//         const SingleShipment = {
//           sender: shipment[0],
//           receiver: shipment[1],
//           pickupTime: shipment[2].toNumber(),
//           deliveryTime: shipment[3].toNumber(),
//           status: shipment[4].toNumber(),
//           price: ethers.utils.formatEther(shipment[5].toString()),
//           status: shipment[6],
//           isPaid: shipment[7],
//         };
  
//         return SingleShipment;
//       } catch (error) {
//         console.log("sorry , no shipment", error);
//       }
//     };
  
//     const startShipment = async (getProduct) => {
//       const { receiver, index } = getProduct;
//       try {
//         if (!window.ethereum) return "Insall MetaMask";
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
  
//         const Web3Modal = new Web3Modal();
//         const connection = await Web3Modal.connect();
//         const provider = new ethers.providers.Web3Provider(connection);
//         const signer = provider.getSigner();
//         const contract = fetchContract(signer);
//         const shipment = await contract.startShipment(
//           accounts[0],
//           receiver,
//           index * 1
//         );
  
//         shipment.wait();
//         console.log(shipment);
//       } catch (error) {
//         console.log("sorry no shipment", error);
//       }
//     };
  
//     const checkIfWalletConnected = async () => {
//       try {
//         if (!window.ethereum) return "Install MetaMask";
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
  
//         if (accounts.length) {
//           setCurrentUser(accounts[0]);
//         } else {
//           return "NO ACCOUNT";
//         }
//       } catch (error) {
//         return " not connected ";
//       }
//     };
  
//     const connectWallet = async () => {
//       try {
//         if (!window.ethereum) return  alert("Install MetaMask");
  
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
  
//         setCurrentUser(accounts[0]);
//       } catch (error) {
//         return "something went wrong";
//       }
//     };
  
//     useEffect(() => {
//       checkIfWalletConnected();
//     }, []);
  
//     return (
//       <TrackingContext.Provider
//         value={{
//           connectWallet,
//           createShipment,
//           getAllShipments,
//           completeShipment,
//           getShipment,
//           startShipment,
//           getShipmentsCount,
//           DappName,
//           currentUser,
//         }}
//       >
//         {children}
//       </TrackingContext.Provider>
//     );
//   };
  
//   };

//   const getAllShipments = async () => {
//     try {
//       const provider = new ethers.providers.JsonRpcProvider();
//       const contract = fetchContract(provider);
//       console.log("contract ended")
//       const shipments = await contract.getAllTransactions();
//       console.log("1")
//       const allShipments = shipments.map((shipment) => ({
//         sender: shipment.sender,
//         receiver: shipment.receiver,
//         price: ethers.utils.formatEther(shipment.price, toString()),
//         pickupTime: shipment.pickupTime.toNumber(),
//         distance: shipment.distance.toNumber(),
//         isPaid: shipment.isPaid,
//         status: shipment.status,
//       }));

//       return allShipments;
//     } catch (error) {
//       console.log("error while getting shipment", error);
//     }
//   };

//   const getShipmentsCount = async () => {
//     try {
//       if (!window.ethereum) return "Install Metamask";

//       const accounts = await window.ethereum.request({
//         method: "eth_accounts",
//       });
//       const provider = new ethers.providers.JsonRpcProvider();
//       const contract = fetchContract(provider);
//       const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
//       return shipmentsCount.toNumber();
//     } catch (error) {
//       console.log("error while getting count of shipments ", error);
//     }
//   };

//   const completeShipment = async (completeShip) => {
//     console.log(completeShip);

//     const { receiver, index } = completeShip;
//     try {
//       if (!window.ethereum) return "Install MetaMask";

//       const accounts = await window.ethereum.request({
//         method: "eth_accounts",
//       });
//       const web3modal = new Web3Modal();
//       const connection = await web3modal.connect();
//       const provider = new ethers.providers.Web3Provider(connection);
//       const signer = provider.getSigner();
//       const contract = fetchContract(signer);

//       const trasaction = await contract.completeShipment(
//         accounts[0],
//         receiver,
//         index,
//         {
//           gasLimit: 300000,
//         }
//       );

//       trasaction.wait();
//       console.log(trasaction);
//     } catch (error) {
//       console.log("error while completing the shipments", error);
//     }
//   };

//   const getShipment = async (index) => {
//     console.log(index * 1);

//     try {
//       if (!window.ethereum) return "Install MetaMask";

//       const accounts = await window.ethereum.request({
//         method: "eth_accounts",
//       });

//       const provider = new ethers.providers.JsonRpcProvider();
//       const contract = fetchContract(provider);
//       const shipment = await contract.getShipment(accounts[0], index * 1);

//       const SingleShipment = {
//         sender: shipment[0],
//         receiver: shipment[1],
//         pickupTime: shipment[2].toNumber(),
//         deliveryTime: shipment[3].toNumber(),
//         status: shipment[4].toNumber(),
//         price: ethers.utils.formatEther(shipment[5].toString()),
//         status: shipment[6],
//         isPaid: shipment[7],
//       };

//       return SingleShipment;
//     } catch (error) {
//       console.log("sorry , no shipment", error);
//     }
//   };

//   const startShipment = async (getProduct) => {
//     const { receiver, index } = getProduct;
//     try {
//       if (!window.ethereum) return "Insall MetaMask";
//       const accounts = await window.ethereum.request({
//         method: "eth_accounts",
//       });

//       const Web3Modal = new Web3Modal();
//       const connection = await Web3Modal.connect();
//       const provider = new ethers.providers.Web3Provider(connection);
//       const signer = provider.getSigner();
//       const contract = fetchContract(signer);
//       const shipment = await contract.startShipment(
//         accounts[0],
//         receiver,
//         index * 1
//       );

//       shipment.wait();
//       console.log(shipment);
//     } catch (error) {
//       console.log("sorry no shipment", error);
//     }
//   };

//   const checkIfWalletConnected = async () => {
//     try {
//       if (!window.ethereum) return "Install MetaMask";
//       const accounts = await window.ethereum.request({
//         method: "eth_accounts",
//       });

//       if (accounts.length) {
//         setCurrentUser(accounts[0]);
//       } else {
//         return "NO ACCOUNT";
//       }
//     } catch (error) {
//       return " not connected ";
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) return  alert("Install MetaMask");

//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });

//       setCurrentUser(accounts[0]);
//     } catch (error) {
//       return "something went wrong";
//     }
//   };

//   useEffect(() => {
//     checkIfWalletConnected();
//   }, []);

//   return (
//     <TrackingContext.Provider
//       value={{
//         connectWallet,
//         createShipment,
//         getAllShipments,
//         completeShipment,
//         getShipment,
//         startShipment,
//         getShipmentsCount,
//         DappName,
//         currentUser,
//       }}
//     >
//       {children}
//     </TrackingContext.Provider>
//   );
// };
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import tracking from "../Conetxt/Tracking.json";

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);
};

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  const DappName = "Product Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    const { receiver, pickupTime, distance, price } = items;
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const pickupDate = new Date(pickupTime);
      if (isNaN(pickupDate.getTime())) {
        throw new Error("Invalid date format for pickupTime");
      }

      const createItem = await contract.createShipment(
        receiver,
        pickupDate.getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        { value: ethers.utils.parseUnits(price, 18) }
      );
      await createItem.wait();
      console.log(createItem);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const getAllShipments = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipments = await contract.getAllTransactions();

      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));

      return allShipments;
    } catch (error) {
      console.log("Error while getting shipments", error);
    }
  };

  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
      return shipmentsCount.toNumber();
    } catch (error) {
      console.log("Error while getting count of shipments", error);
    }
  };

  const completeShipment = async (completeShip) => {
    const { receiver, index } = completeShip;
    try {
      if (!window.ethereum) return "Install MetaMask";

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        currentUser,
        receiver,
        index,
        { gasLimit: 300000 }
      );

      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log("Error while completing the shipment", error);
    }
  };

  const getShipment = async (index) => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(accounts[0], index * 1);

      const SingleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        status: shipment[4].toNumber(),
        price: ethers.utils.formatEther(shipment[5].toString()),
        isPaid: shipment[6],
      };

      return SingleShipment;
    } catch (error) {
      console.log("Error while fetching shipment", error);
    }
  };

  const startShipment = async (getProduct) => {
    const { receiver, index } = getProduct;
    try {
      if (!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );

      await shipment.wait();
      console.log(shipment);
    } catch (error) {
      console.log("Error while starting shipment", error);
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No account found";
      }
    } catch (error) {
      console.log("Error checking wallet connection", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      console.log("Error connecting wallet", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipments,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
