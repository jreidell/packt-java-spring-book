import { useState } from "react";
import { Car, CarEntry, EditFormProps } from "../Types";
import { Dialog, DialogActions, DialogTitle, Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";

function EditCar({ cardata }: EditFormProps) {
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

    const { mutate } = useMutation(updateCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const handleClickOpen = () => {
        setCar({
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registrationNumber: cardata.registrationNumber,
            modelYear: cardata.modelYear,
            price: cardata.price
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const url = cardata._links.self.href;
        const carEntry: CarEntry = { car, url };
        mutate(carEntry);
        setCar({
            brand: "",
            model: "",
            color: "",
            registrationNumber: "",
            modelYear: 0,
            price: 0
        });
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value});
    };

    return (
        <>
        <Tooltip title="Edit">
        <IconButton size="small" onClick={handleClickOpen}><EditIcon fontSize="small" /></IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Car</DialogTitle>
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

export default EditCar;