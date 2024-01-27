"use client";
import React, { useState } from "react";
import NavbarComponent from "../components/Navbar";
import MeetingListCard from "../components/MeetingListCard";
import { MeetingItem } from "../types";
import { useQuery } from "@tanstack/react-query";
import { createMeeting, fetchMeetingItems } from "../api/meeting";
import Loader from "../components/Loader";
import SelectMeetingType from "../components/SelectMeetingType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [selectedMeetingType, setSelectedMeetingType] = useState<string>("");
  const [selectedMeetingItems, setSelectedMeetingItems] = useState<string[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isLoadingCreateMeeting, setIsLoadingCreateMeeting] =
    useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["meetingItems", selectedMeetingType],
    queryFn: () => fetchMeetingItems(selectedMeetingType),
    enabled: !!selectedMeetingType,
  });

  const handleItemSelect = (itemId: string) => {
    setSelectedMeetingItems((prevItems) =>
      prevItems.includes(itemId)
        ? prevItems.filter((id) => id !== itemId)
        : [...prevItems, itemId]
    );
  };

  const handleAddItems = () => {
    setShowDatePicker(true);
  };

  const handleCreateMeeting = async () => {
    if (selectedDate) {
      setIsLoadingCreateMeeting(true);
      const meetingData = {
        meetingType: selectedMeetingType,
        carriedForwardItems: selectedMeetingItems,
        meetingDate: selectedDate.toISOString(),
        meetingTime: selectedDate.toISOString(),
      };

      try {
        await createMeeting(meetingData);
        toast.success("Your meeting has been captured!");
        refetch();
      } catch (error) {
        toast.error("Failed to create meeting.");
      } finally {
        setIsLoadingCreateMeeting(false);
      }
    }
  };

  if (isLoading) return <Loader />;
  console.log(data);
  return (
    <main className="p-[20px]">
      <NavbarComponent />
      <h1 className="text-4xl text-center my-8">
        {data && data[0]?.meetingItems?.length > 0
          ? `${data[0]?.meetingType} Number: ${data[0]?.meetingNumber}`
          : "Your Meetings"}
        <br />
        {data && data[0]?.meetingItems?.length > 0
          ? `Date: ${new Date(
              data[0]?.meetingDate
            ).toLocaleDateString()} Time: ${new Date(
              data[0]?.meetingTime
            ).toLocaleTimeString()}`
          : ""}
      </h1>
      <div className="flex justify-center items-center  ">
        <SelectMeetingType
          selectedMeetingType={selectedMeetingType}
          setSelectedMeetingType={setSelectedMeetingType}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data && data[0]?.meetingItems?.length === 0 ? (
          <p className="text-white p-10">No meetings items found</p>
        ) : data && data?.length === 0 ? (
          <p className="text-white p-10">No meetings items found</p>
        ) : !data ? (
          <p className="text-white p-10">Select a meeting type</p>
        ) : (
          data[0]?.meetingItems?.map((meeting: MeetingItem) => (
            <MeetingListCard
              key={meeting.id}
              meeting={meeting}
              onItemSelect={handleItemSelect}
            />
          ))
        )}
      </div>

      <div className="flex flex-col justify-center items-center mt-4">
        {selectedDate && (
          <p className="mt-2 text-center text-white-600">
            Selected Date and Time:{" "}
            {selectedDate.toLocaleString([], {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        )}
        
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select meeting date and time"
        />
      </div>

      <div className="flex justify-center mt-4">
        {data && data?.length > 0 && !showDatePicker && (
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              selectedMeetingItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : ""
            }`}
            onClick={handleAddItems}
            disabled={selectedMeetingItems.length === 0}
          >
            Add New Items
          </button>
        )}
        {showDatePicker && data?.length > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateMeeting}
            disabled={!selectedDate || isLoadingCreateMeeting}
          >
            {isLoadingCreateMeeting ? <Loader /> : "Create Meeting"}
          </button>
        )}
      </div>
      <ToastContainer />
    </main>
  );
};

export default Home;
