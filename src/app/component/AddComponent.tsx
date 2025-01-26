"use client";
import Image from "next/image";
import { Dispatch, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import Weekdays from "./Weekdays";
import { v4 as uuidv4 } from "uuid";
import { Campaign } from "../types";

interface Props {
  campaign: Campaign;
  campaignList: Campaign[];
  setCampaign: Dispatch<React.SetStateAction<Campaign>>;
  handleAddCampaign: (cl: Campaign) => void;
  handleEditCampaign: (idx: number, cl: Campaign) => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddComponent({
  campaign,
  campaignList,
  handleAddCampaign,
  handleEditCampaign,
  openModal,
  setOpenModal,
}: Props) {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [sd, setSD] = useState(new Date());
  const [ed, setED] = useState(new Date());
  const [st, setST] = useState("00:00");
  const [et, setET] = useState("00:00");
  const [wd, setWD] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (id) {
      let idx = campaignList.findIndex((c) => c.id === id);
      if (idx > -1) {
        const campaign: Campaign = {
          id: campaignList[idx].id,
          name: name,
          type: type,
          startDate: sd,
          endDate: ed,
          startTime: st,
          endTime: et,
          weekdays: wd,
        };
        handleEditCampaign(idx, campaign);
      }
    } else {
      const campaign: Campaign = {
        id: uuidv4(),
        name: name,
        type: type,
        startDate: sd,
        endDate: ed,
        startTime: st,
        endTime: et,
        weekdays: wd,
      };
      handleAddCampaign(campaign);
    }
  };

  useEffect(() => {
    if (campaign.id) {
      setId(campaign.id);
      setName(campaign.name);
      setType(campaign.type);
      setSD(campaign.startDate);
      setED(campaign.endDate);
      setST(campaign.startTime);
      setET(campaign.endTime);
      setWD(campaign.weekdays);
    }
  }, [campaign]);

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="py-3 px-5 bg-gray-200" as="h4">
          {id ? "Edit Campaign" : "Add Campaign"}
        </Modal.Header>
        <Modal.Body className="py-3 px-5">
          <form
            className="grid grid-cols-2 grid-row-5 w-full gap-2"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  value="Campaign name"
                  className="font-semibold text-gray-900"
                />
              </div>
              <TextInput
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="type"
                  value="Campaign type"
                  className="font-semibold text-gray-900"
                />
              </div>
              <select
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select a type</option>
                <option value="CPO">Cost per Order</option>
                <option value="CPC">Cost per Click</option>
                <option value="BOGO">Buy One Get One</option>
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  value="Start date"
                  className="font-semibold text-gray-900"
                />
              </div>
              <DatePicker setDate={setSD} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  value="End date"
                  className="font-semibold text-gray-900"
                />
              </div>
              <DatePicker setDate={setED} />
            </div>
            <TimePicker setTime={setST} timeValue={st} label="Start time" />
            <TimePicker setTime={setET} timeValue={et} label="End time" />
            <div className="col-span-2">
              <Weekdays wd={wd} setWD={setWD} />
            </div>
            <div className="col-span-2 flex gap-4 w-full justify-end mt-6">
              <Button color="blue" type="submit">
                {id ? "Edit" : "Add"}
              </Button>
              <Button
                color="gray"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
