import { useStore } from '../../hooks/useStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Log } from '../../types/log.types';
import { LogSchema } from '../../types/log.types';
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, TextField, Dialog, DialogTitle, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { POSTLogs } from '../../api/logsAPI';
import { v4 as uuid4 } from 'uuid';
import type { FC } from 'react';

// type definition of props
interface AddLogFormProps {
    onLogAdded?: () => void;
}

// Allowed enum values for levels.
const LEVELS = ['error', 'warn', 'info', 'debug'];

type LogFormFields = Omit<Log, 'id' | 'timestamp' | 'metadata' | 'commit'>;

const Add_LogForm: FC<AddLogFormProps> = ({ onLogAdded }) => {
    // States & Hooks
    const { state, dispatch } = useStore();
    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<LogFormFields>({
        resolver: zodResolver(LogSchema.omit({ timestamp: true, metadata: true, commit: true })),
    });

    // Functions
    const SubmitForm = async (data: LogFormFields) => {
        try {
            const now = new Date().toISOString();
            const randomMetadata = { random: Math.random().toString(36).substring(2, 10) };
            const commit = uuid4().slice(0, 7);
            const response = await POSTLogs({ ...data, id: uuid4(), timestamp: now, metadata: randomMetadata, commit });
            if (response.status === 201) {
                dispatch({ type: 'SET_FORM_OPEN', payload: false });
                dispatch({ type: 'SET_ALERT_TYPE', payload: 'success' });
                dispatch({ type: 'SET_ALERT_MESSAGE', payload: 'Log Added' });
                dispatch({ type: 'TOGGLE_ALERT', payload: true });
                onLogAdded?.();
            } else {
                dispatch({ type: 'SET_FORM_OPEN', payload: false });
                dispatch({ type: 'SET_ALERT_TYPE', payload: 'error' });
                dispatch({ type: 'SET_ALERT_MESSAGE', payload: `Failed to add log. Status: ${response.status}` });
                dispatch({ type: 'TOGGLE_ALERT', payload: true });
            }
        } catch (err: unknown) {
            dispatch({ type: 'SET_FORM_OPEN', payload: false });
            dispatch({ type: 'TOGGLE_ALERT', payload: true });
            dispatch({ type: 'SET_ALERT_TYPE', payload: 'error' });
            dispatch({ type: 'SET_ALERT_MESSAGE', payload: err instanceof Error ? err.message : 'Unknown error' });
        }
        reset();
    };

    const handleClose = () => {
        dispatch({ type: 'SET_FORM_OPEN', payload: false });
        reset();
    };

    return (
        <Dialog
            open={state.formOpen}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    m: { xs: 1, sm: 2 },
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: { xs: '95vw', sm: '600px' },
                }
            }}
        >
            <DialogTitle
                sx={{
                    fontSize: '2rem',
                    fontWeight: 'bolder',
                    '@media (max-width: 480px)': {
                        fontSize: '1.25rem',
                    },
                    textTransform: 'capitalize',
                }}
            >
                Add Log
            </DialogTitle>

            <main className="w-full p-5 flex flex-col gap-3 sm:flex-row sm:gap-3">
                <form
                    onSubmit={handleSubmit(SubmitForm)}
                    className="w-full flex flex-col items-center justify-center gap-4"
                >
                    <Box className="w-full flex flex-col items-center justify-center gap-5">
                        <FormControl fullWidth error={!!errors.level}>
                            <InputLabel id="level-label">Level</InputLabel>
                            <Select
                                labelId="level-label"
                                label="Level"
                                defaultValue={LEVELS[0]}
                                {...register('level')}
                                value={watch('level') || ''}
                                onChange={e => setValue('level', e.target.value as LogFormFields['level'])}
                            >
                                {LEVELS.map(level => (
                                    <MenuItem key={level} value={level}>{level}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Message"
                            {...register('message')}
                            error={!!errors.message}
                            helperText={errors.message?.message as string}
                            fullWidth
                            multiline
                            minRows={3}
                            sx={{
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                '& .MuiInputBase-root': {
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                },
                            }}
                        />
                        <TextField
                            label="Resource ID"
                            {...register('resourceId')}
                            error={!!errors.resourceId}
                            helperText={errors.resourceId?.message as string}
                            fullWidth
                            sx={{
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                '& .MuiInputBase-root': {
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                },
                            }}
                        />
                        <TextField
                            label="Trace ID"
                            {...register('traceId')}
                            error={!!errors.traceId}
                            helperText={errors.traceId?.message as string}
                            fullWidth
                            sx={{
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                '& .MuiInputBase-root': {
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                },
                            }}
                        />
                        <TextField
                            label="Span ID"
                            {...register('spanId')}
                            error={!!errors.spanId}
                            helperText={errors.spanId?.message as string}
                            fullWidth
                            sx={{
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                '& .MuiInputBase-root': {
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                },
                            }}
                        />
                    </Box>

                    <Button
                        sx={{
                            mt: 2,
                            width: { xs: '100%', sm: 'auto' },
                            fontSize: { xs: '0.95rem', sm: '1rem' },
                            marginTop: { xs: 1, sm: 2 },
                        }}
                        variant="contained"
                        endIcon={<IoIosAddCircleOutline />}
                        type="submit"
                    >
                        Add
                    </Button>
                </form>
            </main>
        </Dialog>
    );
};

export default Add_LogForm;
