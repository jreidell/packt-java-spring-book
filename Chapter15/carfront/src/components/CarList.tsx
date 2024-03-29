import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCar, getCars } from "../api/carapi";
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Snackbar, Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function CarList() {
    const [open, setOpen] = useState(false);
    
    const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery({
        queryKey: ["cars"],
        queryFn: getCars,
    });

    const { mutate } = useMutation(deleteCar, {
        onSuccess: () => {
            // car deleted
            console.log("sucksess!");
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const columns: GridColDef[] = [
        {field: 'brand', headerName: "Brand", width: 200},
        {field: 'model', headerName: "Model", width: 200},
        {field: 'color', headerName: "Color", width: 200},
        {field: 'registrationNumber', headerName: "Reg.nr", width: 150},
        {field: 'modelYear', headerName: "Model Year", width: 150},
        {field: 'price', headerName: "Price", width: 150},
        {
            field: "edit",
            headerName: "",
            width: 55,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <EditCar cardata={params.row} />
            )
        },
        {
            field: "delete",
            headerName: "",
            width: 60,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <Tooltip title="Remove">
                <IconButton onClick={() => {
                    if(window.confirm(`Are you sure you want to delete the ${params.row.brand} ${params.row.model}?`)) {
                        mutate(params.row._links.car.href);
                    }
                }}
                ><DeleteIcon fontSize="small" /></IconButton>
                </Tooltip>
            )
        }
    ];

    if(!isSuccess) {
        return <span>Loading...</span>
    }
    else if (error) {
        return <span>Error when fetching cars...</span>
    }
    else {
        return (
            <>
            <AddCar />
            <DataGrid
                rows={data}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={row => row._links.self.href}
                slots={{ toolbar: GridToolbar }}
            />
            <Snackbar 
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="Car deleted"
            />
            </>
        );
    }
}

export default CarList;