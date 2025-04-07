import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Paper, Typography, Box, alpha } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { User } from './styles/types';
import { taskService } from './services/taskService';
import ErrorAlert from './ErrorAlert';

// Create a custom theme with purple as the base
const theme = createTheme({
    palette: {
        primary: {
            main: '#7B1FA2', // Deep purple as primary color
            light: '#9C27B0',
            dark: '#6A1B9A',
            contrastText: '#fff',
        },
        secondary: {
            main: '#E1BEE7', // Light purple as secondary color
        },
        background: {
            default: '#FAFAFA',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600,
            letterSpacing: 0.5,
        },
    },
});

interface CalendarEvent {
    title: string;
    start: string;
    extendedProps: {
        taskDescription: string;
        completed: boolean;
    };
    backgroundColor: string;
}

const CalendarWithMui = () => {
    const [currentDate] = useState(new Date());
    const [user, setUser] = useState<User | null>(null);
    // Specify state type as an array of CalendarEvent
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTasks = async (userId: number) => {
        try {
            setLoading(true);
            const response = await taskService.getUserTasks(userId);
            const tasks = response.data;
            const mappedEvents = tasks.map((task: any) => ({
                title: task.taskName,
                start: task.dueDate,
                extendedProps: {
                    taskDescription: task.taskDescription,
                    completed: task.completed,
                },
                backgroundColor: task.completed ? '#4CAF50' : '#9C27B0',
            }));
            setEvents(mappedEvents);
        } catch (error: any) {
            setError(error.message || 'Failed to fetch tasks');
            console.error('Failed to fetch tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (userData && userData.id) {
            fetchTasks(userData.id);
        } else {
            setError('User not logged in.');
            setLoading(false);
        }
    }, []);

    // Uncomment the following if you want to display a loading/error message instead of the calendar
    // if (loading || error) {
    //     return <MessageDisplay loading={loading} error={error} />;
    // }


    // Custom render for event content, displaying taskName, dueDate, taskDescription, and completion status
    const eventContent = (eventInfo: any) => {
        const { taskDescription, completed } = eventInfo.event.extendedProps;
        // Format dueDate for display
        const dueDate = eventInfo.event.start
            ? new Date(eventInfo.event.start).toLocaleString()
            : '';
        return (
            <Box
                sx={{
                    p: 0.5,
                    height: '100%',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    bgcolor: eventInfo.event.backgroundColor || '#9C27B0',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                        filter: 'brightness(1.05)',
                    },
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 'bold',
                        color: '#fff',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {eventInfo.event.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', display: 'block' }}>
                    {dueDate}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', display: 'block' }}>
                    {taskDescription}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    {completed ? 'Completed' : 'Pending'}
                </Typography>
            </Box>
        );
    };

    // Custom render for day cell content
    const dayCellContent = (arg: any) => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    '&:hover': { bgcolor: alpha('#E1BEE7', 0.2) },
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: arg.isToday ? 'bold' : 'normal',
                        color: arg.isToday ? '#7B1FA2' : 'inherit',
                        textAlign: 'center',
                        p: 0.5,
                        borderRadius: arg.isToday ? '50%' : '0',
                        bgcolor: arg.isToday ? alpha('#E1BEE7', 0.5) : 'transparent',
                        width: '24px',
                        height: '24px',
                        mx: 'auto',
                    }}
                >
                    {arg.dayNumberText}
                </Typography>
            </Box>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <ErrorAlert error={error} onClose={() => setError('')} duration={3000} />
            <Paper
                elevation={4}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: '#fff',
                    boxShadow: '0 8px 24px rgba(123, 31, 162, 0.1)',
                    '&:hover': {
                        boxShadow: '0 10px 28px rgba(123, 31, 162, 0.15)',
                    },
                }}
            >
                <Box
                    sx={{
                        '.fc': {
                            '--fc-border-color': '#E1BEE7',
                            '--fc-today-bg-color': alpha('#E1BEE7', 0.15),
                            '--fc-page-bg-color': '#fff',
                            '--fc-neutral-bg-color': '#F9F4FB',
                            '--fc-button-bg-color': '#9C27B0',
                            '--fc-button-border-color': '#9C27B0',
                            '--fc-button-hover-bg-color': '#7B1FA2',
                            '--fc-button-hover-border-color': '#7B1FA2',
                            '--fc-button-active-bg-color': '#6A1B9A',
                            '--fc-button-active-border-color': '#6A1B9A',
                            '--fc-event-bg-color': '#9C27B0',
                            '--fc-event-border-color': '#7B1FA2',
                            '--fc-event-text-color': '#fff',
                            '--fc-event-selected-overlay-color': 'rgba(123, 31, 162, 0.3)',
                            '--fc-non-business-color': 'rgba(225, 190, 231, 0.1)',
                        },
                        '.fc-theme-standard .fc-scrollgrid': {
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #E1BEE7',
                        },
                        '.fc .fc-col-header-cell-cushion': {
                            padding: '8px',
                            color: '#7B1FA2',
                            fontWeight: 600,
                        },
                        '.fc .fc-daygrid-day.fc-day-today': {
                            background: alpha('#E1BEE7', 0.15),
                        },
                        '.fc .fc-button': {
                            textTransform: 'capitalize',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                            },
                        },
                        '.fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active': {
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)',
                        },
                        '.fc-toolbar-title': {
                            fontSize: '1.2rem !important',
                            fontWeight: 600,
                            color: '#7B1FA2',
                        },
                        '.fc-day-other .fc-daygrid-day-top': {
                            opacity: 0.7,
                        },
                        '.fc-timegrid-slot': {
                            height: '40px !important',
                        },
                        '.fc .fc-timegrid-slot-minor': {
                            borderTop: '1px dotted #E1BEE7',
                        },
                    }}
                >
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        eventContent={eventContent}
                        dayCellContent={dayCellContent}
                        height={650}
                        dayMaxEvents={true}
                        nowIndicator={true}
                        slotMinTime="07:00:00"
                        slotMaxTime="23:00:00"  // Modify here to extend the end time
                        weekends={true}
                        businessHours={{
                            daysOfWeek: [1, 2, 3, 4, 5],
                            startTime: '09:00',
                            endTime: '18:00',
                        }}
                        slotLabelFormat={{
                            hour: 'numeric',
                            minute: '2-digit',
                            meridiem: 'short',
                        }}
                        eventTimeFormat={{
                            hour: 'numeric',
                            minute: '2-digit',
                            meridiem: 'short',
                        }}
                        views={{
                            dayGridMonth: {
                                titleFormat: { year: 'numeric', month: 'long' },
                            },
                            timeGridWeek: {
                                titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
                            },
                        }}
                    />
                </Box>
            </Paper>
        </ThemeProvider>
    );
};

export default CalendarWithMui;
