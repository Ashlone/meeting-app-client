// Define the Types enum
export enum Types{
    MANCO = "MANCO",
    FINANCE = "FINANCE",
    PTL = "PTL",
  }

  export enum Status{
    OPEN = "OPEN",
    IN_DEVELOPMENT = "IN_DEVELOPMENT",
    Awaiting_Invoicing = "Awaiting_Invoicing",
    CLOSED = "Awaiting_Invoicing",
}

export type Meeting = {
    id: string;
    meetingType: string;
    meetingNumber: number;
    meetingDate: Date;
    meetingTime: Date;
    meetingItems: MeetingItem[];
    meetingStatuses: any[]; 
  }
  
export type MeetingData={
  meetingType: string;
  meetingDate: string | null;
  meetingTime: string | null
}

export type MeetingItem={
    id:string;
    meetingId:string;
    description:string;
    dueDate: Date;
    meeting:{
      meetingStatuses:MeetingItemStatus
    }
}


export type MeetingItemStatus={
     status:Status;
     action_required:string
     responsible_person:string
}

export type SelectMeetingTypeProps = {
  selectedMeetingType: string;
  setSelectedMeetingType: React.Dispatch<React.SetStateAction<string>>
}