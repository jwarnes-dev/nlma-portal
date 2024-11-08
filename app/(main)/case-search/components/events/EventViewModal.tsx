import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Event } from '@common/types';

interface EventViewModalProps {
  open: boolean;
  handleClose: () => void;
  event: Event;
}

const EventViewModal: React.FC<EventViewModalProps> = ({ open, handleClose, event }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="event-modal-title"
      aria-describedby="event-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="event-modal-title" variant="h6" component="h2">
          {event.title}
        </Typography>
        <Typography id="event-modal-description" sx={{ mt: 2 }}>
          {event.info}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Date: {event.date}
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default EventViewModal;