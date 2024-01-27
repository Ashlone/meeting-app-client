import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingType: string;
  selectedMeetingItems: string[];
  meetingDate: Date | null;
  onConfirm: () => void;
}

const MeetingModal: React.FC<MeetingModalProps> = ({ isOpen, onClose, meetingType, selectedMeetingItems, meetingDate, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Meeting Details</ModalHeader>
        <ModalBody>
          <p>Meeting Type: {meetingType}</p>
          <p>Selected Items: {selectedMeetingItems.join(", ")}</p>
          <p>Meeting Date and Time: {meetingDate?.toLocaleString()}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MeetingModal;
