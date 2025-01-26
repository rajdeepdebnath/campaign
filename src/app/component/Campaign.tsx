"use client";
import React, { useState } from "react";
import AddComponent from "./AddComponent";
import { Campaign } from "../types";
import { Button } from "flowbite-react";
import CampaignList from "./CampaignList";

const initialCampaign: Campaign = {
  id: "",
  name: "",
  type: "",
  startDate: new Date(),
  endDate: new Date(),
  startTime: "",
  endTime: "",
  weekdays: [],
};

const CampaignContainer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [campaign, setCampaign] = useState<Campaign>(initialCampaign);
  const [campaignList, setCampaignList] = useState<Campaign[]>([]);
  const handleAddCampaign = (cl: Campaign): void => {
    setCampaignList((p) => [...p, cl]);
    reset();
  };

  const handleSetEditCampaign = (cl: Campaign) => {
    setCampaign(cl);
    setOpenModal(true);
  };

  const handleEditCampaign = (idx: number, cl: Campaign) => {
    setCampaignList((p) => {
      return [...p.slice(0, idx), cl, ...p.slice(idx + 1)];
    });
    reset();
  };

  const handleDeleteCampaign = (cl: Campaign) => {
    let idx = campaignList.findIndex((c) => c.id === cl.id);
    if (idx > -1) {
      setCampaignList((p) => {
        return [...p.slice(0, idx), ...p.slice(idx + 1)];
      });
    }
  };

  const reset = () => {
    setCampaign(initialCampaign);
    setOpenModal(false);
  };
  //   const handleEditCampaign = (cl:Campaign): void => {
  //     if (id) {
  //       let idx = campaignList.findIndex((c) => c.id === id);
  //       if (idx > -1) {
  //         const campaign: Campaign = {
  //           id: campaignList[idx].id,
  //           name: name,
  //           type: type,
  //           startDate: sd,
  //           endDate: ed,
  //           startTime: st,
  //           endTime: et,
  //           weekdays: wd,
  //         };
  //         setCampaignList((p) => {
  //           return [...p.slice(0, idx), campaign, ...p.slice(idx + 1)];
  //         });
  //       }
  //     }
  //   };
  return (
    <div className="border w-2/3 m-auto mt-8 text-xl">
      <Button
        color="blue"
        size="xs"
        onClick={() => setOpenModal(true)}
        className="m-4"
      >
        New Campaign
      </Button>
      <AddComponent
        campaign={campaign}
        campaignList={campaignList}
        setCampaign={setCampaign}
        handleAddCampaign={handleAddCampaign}
        handleEditCampaign={handleEditCampaign}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      {campaignList.length === 0 && (
        <div className="text-center text-lg">No campaigns available</div>
      )}
      {campaignList.length > 0 && (
        <CampaignList
          campaignList={campaignList}
          handleSetEditCampaign={handleSetEditCampaign}
          handleDeleteCampaign={handleDeleteCampaign}
        />
      )}
    </div>
  );
};

export default CampaignContainer;
