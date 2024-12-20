import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";

export function Deletedilog(props) {
    const { handleClose, handleConfirmDelete } = props;
    

    return (
        <div className="delete_main">
            <div className="delete">
                <DialogTitle sx={{ fontWeight: "bolder" }}>Delete User</DialogTitle>
                <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            </div>
            <h6>Are you sure?</h6>
            <Box sx={{ display: "flex", justifyContent: "end", marginTop: "50px", gap: "2vw" }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleConfirmDelete}
                >
                    Delete
                </Button>
                <Button 
                    color="primary" 
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </Box>
        </div>
    );
}
