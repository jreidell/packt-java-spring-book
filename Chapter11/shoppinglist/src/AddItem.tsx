import { useState } from "react";
import { Button } from "@mui/material";
import { 
TextField,  
Dialog, 
DialogActions, 
DialogContent, 
DialogTitle
} from "@mui/material";
import { Item } from "./App";

type AddItemProps = {
    addItem: (item: Item) => void;
}

function AddItem(props: AddItemProps) {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState<Item>({
        product: '',
        amount: ''
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const addItem = () => {
        // Calls addItem from and passes state into it
        props.addItem(item);

        //Clear the text fields and close the modal
        setItem({ product: '', amount: '' });
        handleClose();
    }

    return (
        <>
          <Button onClick={handleOpen} variant="outlined" style={{ marginTop: 10 }}>Add Item</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Item</DialogTitle>
            <DialogContent>
            <TextField value={item.product} margin="dense" 
                    onChange={e => setItem({...item, product: e.target.value})}
                    label="Product"
                    fullWidth
                />
                <TextField value={item.amount} margin="dense" 
                    onChange={e => setItem({...item, amount: e.target.value})}
                    label="Amount"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addItem}>Add</Button>
            </DialogActions>
          </Dialog>
        </>
    );
}

export default AddItem;