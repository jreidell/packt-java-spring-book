import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteCar, getCars } from "../api/carapi";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";

function CarList() {
    const queryClient = new QueryClient();

    const { data, error, isSuccess } = useQuery({
        queryKey: ["cars"],
        queryFn: getCars,
    });

    const { mutate } = useMutation(deleteCar, {
        onSuccess: () => {
            // car deleted
            console.log("sucksess!");
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
            field: "delete",
            headerName: "",
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button onClick={() => mutate(params.row._links.car.href)}>Delete</button>
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
            <DataGrid
                rows={data}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={row => row._links.self.href} 
            />
        );
    }
}

export default CarList;