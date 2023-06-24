import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, setOpen, handleDelete }) {

    const handleConfirm = async () => {
        setOpen(!open)
        await handleDelete()
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => setOpen(!open)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Permanantly Delete Account"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        "Note - You want to delete your account Permanantly then Current password is required. and All the Data Related to your account will be deleted."
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(!open)}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}