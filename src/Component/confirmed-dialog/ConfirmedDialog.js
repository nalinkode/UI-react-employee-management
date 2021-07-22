import React from 'react'
import './ConfirmedDialog.css'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'absolute',
        padding: theme.spacing(2),
        top: theme.spacing(5)
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction : {
        justifyContent: 'center'
    }
}))

export default function ConfirmedDialog(props) { 
    const { confirmDialog, setConfirmDialog} = props;
    const classes = useStyles();
    
    return (
        <div>
            <Dialog classes={{ paper: classes.dialog}} open={confirmDialog.isOpen}>
                <DialogTitle>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography variant="h6">
                        {confirmDialog.title}
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                    <Button variant="contained" color="primary" onClick={()=> setConfirmDialog({...confirmDialog ,isOpen: false})} color="primary">No</Button>
                    <Button onClick={confirmDialog.onConfirm} variant="contained" color="secondary">Yes</Button> 
                </DialogActions>
            </Dialog>
        </div>
    )
}
