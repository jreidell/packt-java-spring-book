import { useState } from "react";
import { Dialog , DialogActions, DialogTitle, Button, Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Car } from "../Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";

function AddCar() {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: "",
        model: "",
        color: "",
        registrationNumber: "",
        modelYear: 0,
        price: 0
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation(addCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value});
    };

    const handleSave = () => {
        mutate(car);
        setCar({
            brand: "",
            model: "",
            color: "",
            registrationNumber: "",
            modelYear: 0,
            price: 0
        });
        handleClose();
    };

    return(
        <>
        <Tooltip title="Add New Car">
        <IconButton onClick={handleClickOpen}><AddIcon fontSize="medium" /><DirectionsCarIcon fontSize="medium" /></IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Car</DialogTitle>
            <CarDialogContent car={car} handleChange={handleChange} />
            <DialogActions>
            <Tooltip title="Cancel">
                    <CancelIcon fontSize="medium" onClick={handleClose}>Cancel</CancelIcon>
                </Tooltip>
                <Tooltip title="Save">
                    <SaveIcon fontSize="medium" onClick={handleSave}>Save</SaveIcon>
                </Tooltip>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default AddCar;