"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { MeetingItem, MeetingItemStatus } from "../types";
import moment from "moment";
import Link from "next/link";

interface MeetingListCardProps {
  meeting: MeetingItem;
  onItemSelect: (itemId: string) => void;
}

const MeetingListCard: React.FC<MeetingListCardProps> = ({
  meeting,
  onItemSelect,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const formattedDueDate = moment(meeting.dueDate).format("MMMM Do YYYY");

  const handleSelect = () => {
    setIsSelected(!isSelected);
    onItemSelect(meeting.id);
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{meeting.description}</p>
        <small className="text-default-500">Due Date: {formattedDueDate}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://www.chillisoft.co.za/wp-content/uploads/2020/01/Banner-for-Website-Landing-2-1912x480.png"
          width={270}
        />
      </CardBody>
      <CardFooter className="gap-10">
        <Button
          radius="full"
          className={`bg-gradient-to-tr ${
            isSelected
              ? "from-pink-500 to-yellow-500"
              : "from-gray-500 to-gray-700"
          } text-white shadow-lg p-2`}
          onClick={handleSelect}
        >
          {isSelected ? "Selected" : "Select Item"}
        </Button>

        <Link href={`/meetingitem/${meeting.id}`}>
          <Button
            radius="full"
            className={
              "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg p-2"
            }
          >
            Edit Meeting Status
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MeetingListCard;
