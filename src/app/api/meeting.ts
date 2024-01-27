import { axiosPublic } from ".";
import {MeetingData, MeetingItem, MeetingItemStatus } from "../types";


export const fetchMeetingItems = async (meetingType:string) => {
    try {
      const response = await axiosPublic.get(`/meetings/${meetingType}/previous-items`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const createMeeting = async (meetingData:MeetingData) => {
    try {
      const response = await axiosPublic.post('/meetings', meetingData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; 
    } catch (error) {
      console.log(error)
    }
  };


  export const createMeetingItem = async (meetingItemData:MeetingItem) => {
    try {
      const response = await axiosPublic.post(`/${meetingItemData.meetingId}/items`, meetingItemData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; 
    } catch (error) {
      console.log(error)
    }
  };


  export const updateMeetingItemStatus= async (meetingItemData:MeetingItemStatus,itemId:string) => {
    try {
      const response = await axiosPublic.put(`/meetings/items/${itemId}/status`, meetingItemData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; 
    } catch (error) {
      console.log(error)
    }
  };



  export const fetchMeetingItemStatus = async (meetingItemId:string) => {
    try {
      const response = await axiosPublic.get(`/meetings/items/${meetingItemId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };