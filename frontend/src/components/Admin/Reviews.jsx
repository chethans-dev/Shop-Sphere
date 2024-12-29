import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  getAllReviews,
  deleteReview,
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
import MetaData from "../layout/MetaData";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, reviews } = useSelector((state) => state.admin);

  const [openReviewsModal, setOpenReviewsModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Open Reviews Modal
  const handleReviewsModalOpen = (productId) => {
    setCurrentProductId(productId);
    dispatch(getAllReviews(productId));
    setOpenReviewsModal(true);
  };

  // Close Reviews Modal
  const handleReviewsModalClose = () => {
    setOpenReviewsModal(false);
    setCurrentProductId(null);
  };

  // Delete a review
  const handleDeleteReview = async (reviewId) => {
    if (currentProductId && reviewId) {
      const payload = {
        rid: reviewId,
        pid: currentProductId,
      };
      await dispatch(deleteReview(payload));
      await dispatch(fetchAllProducts());
    }
  };

  return (
    <div className="rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] w-auto max-w-5xl shadow-lg p-10 custom-scrollbar overflow-y-auto">
      <MetaData title="Reviews - Admin" />
      <Typography variant="h4" component="h1" fontWeight="bold" mb={6}>
        Manage Product Reviews
      </Typography>

      <TableContainer>
        <Table className="min-w-full" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total Reviews</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.reviews.length}</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-2">
                    <Button
                      variant="filled"
                      color="black"
                      onClick={() => handleReviewsModalOpen(product._id)}
                    >
                      View Reviews
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reviews Modal */}
      <Dialog open={openReviewsModal} onClose={handleReviewsModalClose}>
        <DialogTitle>Product Reviews</DialogTitle>
        <DialogContent>
          {reviews?.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Reviewer</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Comment</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Rating</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review._id}>
                    <TableCell>{review.name}</TableCell>
                    <TableCell>{review.comment}</TableCell>
                    <TableCell>{review.rating}</TableCell>
                    <TableCell>
                      <Button
                        variant="filled"
                        color="black"
                        onClick={() => handleDeleteReview(review._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No reviews for this product.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewsModalClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllProducts;
