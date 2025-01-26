import React, { Dispatch } from "react";
import { Campaign } from "../types";
import { Table } from "flowbite-react";

interface Props {
  handleDeleteCampaign: (cl: Campaign) => void;
  handleSetEditCampaign: (cl: Campaign) => void;
  campaignList: Campaign[];
}

const CampaignList = ({
  handleDeleteCampaign,
  handleSetEditCampaign,
  campaignList,
}: Props) => {
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, cl: Campaign) => {
    e.preventDefault();
    handleSetEditCampaign(cl);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    cl: Campaign
  ) => {
    e.preventDefault();
    handleDeleteCampaign(cl);
  };
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Campaign name</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Start date</Table.HeadCell>
          <Table.HeadCell>End date</Table.HeadCell>
          <Table.HeadCell>Start time</Table.HeadCell>
          <Table.HeadCell>End time</Table.HeadCell>
          <Table.HeadCell>Days</Table.HeadCell>
          <Table.HeadCell>
            <span className="">Action</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {campaignList.length > 0 &&
            campaignList.map((cl) => (
              <Table.Row
                key={cl.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {cl.name}
                </Table.Cell>
                <Table.Cell>{cl.type}</Table.Cell>
                <Table.Cell>{cl.startDate.toDateString()}</Table.Cell>
                <Table.Cell>{cl.endDate.toDateString()}</Table.Cell>
                <Table.Cell>{cl.startTime}</Table.Cell>
                <Table.Cell>{cl.endTime}</Table.Cell>
                <Table.Cell>{cl.weekdays}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={(e) => handleEdit(e, cl)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, cl)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CampaignList;
