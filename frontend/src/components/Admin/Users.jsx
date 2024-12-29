import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../../store/actions/adminActions";
import { Button, Typography } from "@material-tailwind/react";
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
  TextField,
  MenuItem,
} from "@mui/material";
import MetaData from "../layout/MetaData";

const Users = () => {
  const { users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleDeleteDialogOpen = (productId) => {
    setUserIdToDelete(productId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setUserIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (userIdToDelete) {
      dispatch(deleteUser(userIdToDelete));
      setOpenDeleteDialog(false);
      setUserIdToDelete(null);
    }
  };

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");

  const handleEditDialogOpen = (user) => {
    setSelectedUser(user);
    setRole(user?.role);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  const handleEditConfirm = () => {
    if (selectedUser && role) {
      const payload = { id: selectedUser._id, role: { role } };
      dispatch(updateUserRole(payload));
      setOpenEditDialog(false);
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="rounded-md bg-white flex flex-col gap-6 justify-center my-[2vmax] w-auto max-w-5xl shadow-lg p-10 custom-scrollbar overflow-y-auto">
      <MetaData title="Users - Admin" />
      <Typography variant="h4" component="h1" fontWeight="bold" mb={6}>
        Manage Orders
      </Typography>

      <TableContainer>
        <Table className="min-w-full" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Id</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user?._id}</TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-2">
                    <Button
                      variant="outlined"
                      color="black"
                      onClick={() => handleEditDialogOpen(user)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="filled"
                      color="black"
                      onClick={() => handleDeleteDialogOpen(user?._id)}
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

      {/* Edit user */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent className="flex flex-col gap-4">
          {selectedUser && (
            <>
              <Typography>
                <span style={{ fontWeight: "bold" }}>ID:</span>{" "}
                {selectedUser._id}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                {selectedUser.name}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                {selectedUser.email}
              </Typography>
              <hr />
              <Typography>
                <strong style={{ fontWeight: "bold" }}>Mobile:</strong>{" "}
                {selectedUser.mobile}
              </Typography>
              <Typography>
                <strong style={{ fontWeight: "bold" }}>Role:</strong>{" "}
                {selectedUser.role}
              </Typography>

              <TextField
                select
                label="User Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                fullWidth
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleEditConfirm}
            variant="filled"
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
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} variant="outlined">
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

export default Users;
