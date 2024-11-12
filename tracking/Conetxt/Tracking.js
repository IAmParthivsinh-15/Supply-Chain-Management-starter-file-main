import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import tracking from "../Conetxt/Tracking.json";

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const ContractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
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
  
      console.log("Item creation started");
  
      const gasEstimate = await contract.estimateGas.createShipment(
        receiver,
        pickupDate.getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        { value: ethers.utils.parseUnits(price, 18) }
      );
      console.log("Estimated Gas:", gasEstimate.toString());
  
      const createItem = await contract.createShipment(
        receiver,
        pickupDate.getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        { value: ethers.utils.parseUnits(price, 18) }
      );
      console.log("Transaction sent, awaiting confirmation...");
  
      const receipt = await createItem.wait();
      console.log("Transaction confirmed:", receipt);
      
      if (receipt.status !== 1) {
        throw new Error("Transaction failed");
      }
      console.log("Shipment created successfully", createItem);
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };


//   const getAllShipments = async () => {
//   try {
//     const provider = new ethers.providers.JsonRpcProvider();
//     const contract = fetchContract(provider);
//     const shipments = await contract.getAllTransactions();

//     const allShipments = shipments.map((shipment) => ({
//       sender: shipment.sender,
//       receiver: shipment.receiver,
//       price: ethers.utils.formatEther(shipment.price.toString()),
//       pickupTime: shipment.pickupTime.toNumber(),
//       distance: shipment.distance.toNumber(),
//       isPaid: shipment.isPaid,
//       status: shipment.status,
//     }));

//     return allShipments;
//   } catch (error) {
//     console.log("Error while getting shipments:", error);
//     if (error.code === 'CALL_EXCEPTION') {
//       console.log("Revert reason:", error.reason || error.data);
//     }
//   }
// };


const getAllShipments = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
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
    console.error("Error while getting shipments:", error);

    if (error.code === 'CALL_EXCEPTION') {
      console.error("Revert reason:", error.reason || error.data?.message || error.data || "No revert reason found");
    }
  }
};


  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";
  
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer); 
  
      const accounts = await provider.listAccounts();
      console.log("Connected account:", accounts[0]);
      console.log("count contract st")
      const shipmentsCount = await contract.getShipmentCount(accounts[0]);
      console.log("Shipment count:", shipmentsCount);
  
      return shipmentsCount.toNumber();
    } catch (error) {
      console.error("Error while getting count of shipments", error);
    }
  };
  

  const completeShipment = async (completeShip) => {
    const { receiver, index } = completeShip;

    try {
        if (!window.ethereum) {
            console.log("MetaMask is not installed.");
            return "Install MetaMask";
        }

        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        console.log("Signer address: ", await signer.getAddress());

        const contract = fetchContract(signer); 
        console.log("Contract fetched:", contract);

        const transaction = await contract.completeShipment(
            currentUser,  
            receiver,
            index,
            { gasLimit: 400000 }  
        );

        console.log("Transaction sent. Waiting for confirmation...");
        
        const receipt = await transaction.wait();
        console.log("Transaction confirmed:", receipt);

        return "Shipment completed successfully!"; 
    } catch (error) {
        console.error("Error while completing the shipment:", error);
        return `Error: ${error.message || "An unexpected error occurred"}`;
    }
};



  // const getShipment = async (index) => {
  //   try {
  //     if (!window.ethereum) return "Install MetaMask";

  //     const accounts = await window.ethereum.request({ method: "eth_accounts" });
  //     const provider = new ethers.providers.JsonRpcProvider();
  //     const contract = fetchContract(provider);
  //     const shipment = await contract.getShipment(accounts[0], index * 1);

  //     const SingleShipment = {
  //       sender: shipment[0],
  //       receiver: shipment[1],
  //       pickupTime: shipment[2].toNumber(),
  //       deliveryTime: shipment[3].toNumber(),
  //       status: shipment[4].toNumber(),
  //       price: ethers.utils.formatEther(shipment[5].toString()),
  //       isPaid: shipment[6],
  //     };

  //     return SingleShipment;
  //   } catch (error) {
  //     console.log("Error while fetching shipment", error);
  //   }
  // };

  const getShipment = async (index) => {
    try {
        if (!window.ethereum) return "Install MetaMask";

        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (!accounts || accounts.length === 0) {
            return "No accounts found";
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = fetchContract(provider);

        // Check if the index is valid
        const shipmentCount = await contract.getShipmentCount(accounts[0]);
        if (index >= shipmentCount) {
            return "Invalid shipment index";
        }

        const shipment = await contract.getShipment(accounts[0], index);

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
  
      console.log("shipment started in startShipment");
  
      console.log("Index value:", index);
      console.log("shipment starte start shipment")      
      const gasPrice = ethers.utils.parseUnits("20", "gwei"); 
      const estimatedGas = await contract.estimateGas.startShipment(
        accounts[0],
        receiver,
        ethers.BigNumber.from(index)
      );
      console.log("Estimated Gas:", estimatedGas.toString());
  
      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        ethers.BigNumber.from(index),
        {
          gasPrice: gasPrice,
          gasLimit: estimatedGas 
        }
      );
      console.log("shipment ended in start hsipment")

  
      console.log("Shipment started successfully", shipment);
  
      await shipment.wait();
      console.log("Shipment transaction confirmed", shipment);
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
