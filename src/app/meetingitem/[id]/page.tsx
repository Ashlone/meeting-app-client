"use client";
import React, { useEffect, useState } from "react";
import { MeetingItem, MeetingItemStatus, Status } from "../../types/index";
import {
  fetchMeetingItemStatus,
  updateMeetingItemStatus,
} from "@/app/api/meeting";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loader from "@/app/components/Loader";
import { toast } from "react-toastify";

const UpdateMeetingItemPage = () => {
  const [status, setStatus] = useState<Status>(Status.OPEN);
  const [actionRequired, setActionRequired] = useState<string>("");
  const [responsiblePerson, setResponsiblePerson] = useState<string>("");
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const id = useParams()?.id as string;

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["meetingItemStatus"],
    queryFn: () => fetchMeetingItemStatus(id as string),
  });

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setActionRequired(data.action_required);
      setResponsiblePerson(data.responsible_person);
    }
  }, [data]);

  const handleUpdateStatus = async () => {
    setIsLoadingUpdate(true);
    const updatedMeetingItem: MeetingItemStatus = {
      status,
      action_required: actionRequired,
      responsible_person: responsiblePerson,
    };

    try {
      const response = await updateMeetingItemStatus(updatedMeetingItem, id);
      toast.success("Meeting item status updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update meeting item status");
      console.error("Failed to update meeting item status:", error);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (isError) return <div>Error fetching meeting item status</div>;

  return (
    <div className="flex items-center justify-center min-h-screen text-black">
      <div className="p-6 w-full max-w-md mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Update Meeting Item</h2>
        <div className="mb-4">
          <label className="block mb-1">Status:</label>
          <select
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option value={Status.OPEN}>{Status.OPEN}</option>
            <option value={Status.IN_DEVELOPMENT}>
              {Status.IN_DEVELOPMENT}
            </option>
            <option value={Status.Awaiting_Invoicing}>
              {Status.Awaiting_Invoicing}
            </option>
            <option value={Status.CLOSED}>{Status.CLOSED}</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Action Required:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            value={actionRequired}
            onChange={(e) => setActionRequired(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Responsible Person:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            value={responsiblePerson}
            onChange={(e) => setResponsiblePerson(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleUpdateStatus}
          disabled={isLoadingUpdate}
        >
          {isLoadingUpdate ? "Updating..." : "Update Status"}
        </button>
      </div>
    </div>
  );
};

export default UpdateMeetingItemPage;
