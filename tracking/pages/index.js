import React , {useState,useEffect,useContext} from "react";
import {
  Table,Form,Services,Profile,CompleteShipment,GetShipment,StartShipment
} from "../Components/index"
import { TrackingContext } from "../Conetxt/Tracking";

const index = () => {
  
  const {
    currentUser,
    createShipment,
    getAllShipments,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount
  } = useContext(TrackingContext);


  const [createShipmentModel , setCreateShipmentModel] = useState(false);
  const [openProfile , setOpenProfile] = useState(false);
  const [startModel , setStartModel] = useState(false);
  const [completeModel , setCompleteModel] = useState(false);
  const [getModel,setGetModel] = useState(false);

  const [allShipmentsdata , setAllShipmentsdata] = useState();

  useEffect(()=>{
    const getCampaignsData = getAllShipments();

    return async () => {
      const data = await getCampaignsData;
      setAllShipmentsdata(data);
    }
  },[])

  return (
    <>
    <Services
    setOpenProfile={setOpenProfile}
    setCompleteModel={setCompleteModel}
    setGetModel={setGetModel}
    setStartModel={setStartModel}
    ></Services>
    <Table
    setCreateShipmentModel={setCreateShipmentModel}
    allShipmentsdata={allShipmentsdata}
    ></Table>
    <Form
    createShipmentModel={createShipmentModel}
    createShipment={createShipment}
    setCreateShipmentModel={setCreateShipmentModel}
    ></Form>
    <Profile
    openProfile={openProfile}
    setOpenProfile={setOpenProfile}
    currentUser={currentUser}
    getShipmentsCount={getShipmentsCount}
    ></Profile>
    <CompleteShipment
    completeModel={completeModel}
    completeShipment={completeShipment}
    setCompleteModel={setCompleteModel}
    ></CompleteShipment>
    <GetShipment
    getModel={getModel}
    setGetModel={setGetModel}
    getShipment={getShipment}
    ></GetShipment>
    <StartShipment
    startModel={startModel}
    setStartModel={setStartModel}
    startShipment={startShipment}
    ></StartShipment>
    </>
  )
  
};

export default index;
