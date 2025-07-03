import { useStore } from '../../hooks/useStore';
import { Alert, Snackbar } from '@mui/material';

const Alert_Dialog = () => {
    // States and Hooks
    const { state, dispatch } = useStore();

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={state.alertOpen}
            autoHideDuration={2000}
            onClose={() => dispatch({ type: 'TOGGLE_ALERT', payload: false })}
        >
            <Alert
                severity={state.alertType}
                variant="filled"
            >
                {state.alertMessage}
            </Alert>
        </Snackbar>
    );
}

export default Alert_Dialog;
