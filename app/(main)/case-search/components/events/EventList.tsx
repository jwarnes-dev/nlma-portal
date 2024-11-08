import * as React from 'react';
import { Event } from "@common/types";
import {
    Paper, Box, Link, Typography, Divider, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


interface EventListProps {
    events: Event[]
}

interface EventItemProps {
    event: Event;
    showEvent: () => void;
}
function EventItem({ event, showEvent }: EventItemProps) {

    return (
        <Stack direction="row" spacing={2} sx={{alignItems: "center", color: "#565858"}}>
            <Stack direction="row" spacing={1} sx={{alignItems: "center", color: "#565858", width: "165px"}}>
                <AccessTimeIcon fontSize='small' /><Typography>{event.time}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{alignItems: "center", color: "#565858"}}>
                <LocationOnIcon fontSize='small' /><Typography>{event.location}</Typography>
            </Stack>
            <Link underline='hover' href='#' onClick={showEvent}>{event.title}</Link>
        </Stack>

        
    )
}

const events1: Event[] = [
    {
        title: "Status Conference",
        time: "9:00am - 10:30am",
        location: "Zoom",
        info: "This is a status conference",
        id: '123',
        date: new Date().toDateString()
    },
    {
        title: "Evidentary Hearing",
        time: "12:00pm - 3:00pm",
        location: "Zoom",
        info: "This is a Evidentary Hearing",
        id: '33',
        date: new Date().toDateString()
    }
]

const events2: Event[] = [
    {
        title: "Public Comment Hearing",
        time: "10:00am - 1:30pm",
        location: "Zoom",
        info: "This is a Public Comment Hearing",
        id: '44',
        date: new Date().toDateString()
    },
]

const events3: Event[] = [
    {
        title: "Informational Public",
        time: "10:00am - 1:30pm",
        location: "Zoom",
        info: "This is a Public Comment Hearing",
        id: '44',
        date: new Date().toDateString()
    },
]

interface EventDayProps {
    day: string;
    date: string;
    active: boolean | false;
    events: Event[];
    open: (event: Event) => void;
}

function EventDay({ day, date, active, events, open }: EventDayProps) {

    return (
        <Paper square={false} sx={{padding: '16px', width: '100%'}} elevation={1} >
            <Stack direction="row" spacing={2}>
                <Box>
                    <Stack sx={{alignItems: "center", width: "66px", color: active ? "#e34510" : "#565858"}}>
                        <Typography >{day}</Typography>
                        <Typography variant="h4">{date}</Typography>
                    </Stack>
                    
                </Box>
                <Stack spacing={0} sx={{height: "100%", justifyContent: "center", minHeight: "65px", paddingLeft:"16px", borderLeft: "1px solid #e0e0e0"}}>
                    {events.map((event) => <EventItem event={event} showEvent={() => open(event)}/>)}
                    {!events.length && <Typography sx={{color: "#565858"}}>No events for this day.</Typography>}
                </Stack>
            </Stack>
        </Paper>
    )
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));


export default function EventList({ events }: EventListProps) {
    const [open, setOpen] = React.useState(false);
    const [event, setEvent] = React.useState({} as Event);
    const [date, setDate] = React.useState(dayjs());
  
    const openModal = (event: Event) => {
      setOpen(true);
      setEvent(event);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const updateMonth = (amt: number) => {
        setDate(date.add(amt, 'month'));
    }
    
    return (
        <>
        <Paper sx={{padding: '16px', width: '100%'}} elevation={3} >
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Stack direction="row" spacing={2}>
                    <Typography variant="h5">Case Calendar</Typography>
                    <Stack direction="row" spacing={0} sx={{}}>
                        <IconButton size="small" onClick={() => updateMonth(-1)}>
                            <ChevronLeftIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{display: "flex", alignItems: "center", userSelect: "none"}} color="#565858">
                            {date.format('MMMM YYYY')}
                        </Typography>
                        <IconButton size="small" onClick={() => updateMonth(1)}>
                            <ChevronRightIcon fontSize="small" />
                        </IconButton>
                    </Stack>   
                </Stack>
                <Divider sx={{marginBottom: '12px', marginTop: '4px'}} />
                <Stack spacing={1}>
                    {(() => {
                        switch (date.format('MMMM')) {
                            case 'September':
                                return (
                                    <>
                                        <EventDay day="Mon" date="04" active={false} events={events1} open={openModal} />
                                    </>
                                );
                            case 'October':
                                return (
                                    <>
                                        <EventDay day="Thu" date="12" active={false} events={events1} open={openModal} />
                                        <EventDay day="Fri" date="13" active={false} events={events2} open={openModal} />
                                    </>
                                );
                            case 'November':
                                return (
                                    <>
                                        <EventDay day="Wed" date="06" active={false} events={events1} open={openModal} />
                                        <EventDay day="Thu" date="07" active={false} events={events2} open={openModal} />
                                        <EventDay day="Fri" date="08" active={true} events={[]} open={openModal} />
                                        <EventDay day="Mon" date="11" active={false} events={events3} open={openModal} />
                                    </>
                                );
                            default:
                                return (
                                    <>
                                        <Paper square={false} sx={{padding: '16px', width: '100%'}} elevation={1} >
                                            <Typography sx={{color: "#565858"}}>No events scheduled for this month.</Typography>
                                        </Paper>
                                    </>
                                );
                        }
                    })()}
                </Stack>
            </Box>
        </Paper>
        <BootstrapDialog
            onClose={handleClose}
            open={open}
            >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Event View - {event.title}
            </DialogTitle>
            <IconButton
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Typography gutterBottom>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
        </>
    )
}