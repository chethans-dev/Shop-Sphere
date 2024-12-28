import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // For navigation to edit product page
import {
  deleteProduct,
  fetchAllProducts,
} from "../../store/actions/adminActions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.admin);

  const [openDialog, setOpenDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDeleteDialogOpen = (productId) => {
    setProductIdToDelete(productId);
    setOpenDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
    setProductIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (productIdToDelete) {
      dispatch(deleteProduct(productIdToDelete));
      setOpenDialog(false);
      setProductIdToDelete(null);
    }
  };

  return (
    <div className="rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] w-[50vw] max-w-5xl shadow-lg p-10 custom-scrollbar overflow-y-auto">
      <Typography variant="h4" component="h1" fontWeight="bold" mb={6}>
        Manage Products
      </Typography>

      <TableContainer>
        <Table className="min-w-full" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-2">
                    <Link to={`/admin/edit/${product._id}`}>
                      <Button
                        variant="outlined"
                        className="w-full text-sm py-2 px-4"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="filled"
                      color="black"
                      className="w-full text-sm py-2 px-4"
                      onClick={() => handleDeleteDialogOpen(product._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteDialogClose}
            variant="outlined"
          >
            Cancel
          </Button>

          <Button
            onClick={handleDeleteConfirm}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllProducts;
