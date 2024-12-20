import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from './Slice';
import { Box, Button, Dialog, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import {Deletedilog} from './Delete'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function BasicTable({setId}) {
    const [open, setOpen] = useState(false);
    const items = useSelector((store) => store.user.items);
    const [id,setid] =useState(null);
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.user.searchQuery);
    const sortOrder = useSelector((state) => state.user.sortOrder);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    const handleDeleteClick = (index) => {
        console.log(index)
        setid(index)
        setOpen(true);
    };

    const handleConfirmDelete = () => {
        console.log(id)
         dispatch(deleteUser(id));
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        setid(null)
    };

   

    const filteredUsers = [...items]
    .filter((user) => {
      const query = searchQuery.toLowerCase();
      return (
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.emailid.toLowerCase().includes(query) ||
        user.mobileNo.toString().includes(query) ||
        user.username.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'A-Z') {
        return a.firstName.localeCompare(b.firstName);
      } else if (sortOrder === 'Z-A') {
        return b.firstName.localeCompare(a.firstName);
      }
      return 0; 
    });
       

    return (
        <>
            <TableContainer component={Paper} sx={{ width: '90%' ,margin:'3vh'}}>
                <div style={{  padding: '16px', fontSize: '18px', fontWeight: 'bold' }}>List Users</div>
                <Table sx={{ width: '99%', paddingLeft: '1vw' }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#EFF4FA' }}>
                            <TableCell>Name</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="right">Mobile no</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Action&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {filteredUsers.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" sx={{ fontSize: '15px', width: '25vw' }}>
                                    <div>
                                        <div>{`${user.firstName} ${user.lastName}`}</div>
                                        <div style={{ fontSize: '12px', color: '#999' }}>{user.emailid}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        sx={{
                                            backgroundColor: '#1E90FF',
                                            color: 'white',
                                            borderRadius: '16px',
                                            fontWeight: 'bold',
                                            padding: '0 8px',
                                            width: '10vw',
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">{user.mobileNo}</TableCell>
                                <TableCell align="right">{user.username}</TableCell>
                                <TableCell align="right">
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', color: 'grey', fontWeight: '100' }}>
                                        <EditIcon  onClick={() =>  setId(user.userId)}/>
                                        <DeleteIcon onClick={() => handleDeleteClick(index)} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} onClick={Deletedilog} fullWidth maxWidth="xs">
            <Deletedilog
                    handleClose={handleClose}
                    handleConfirmDelete={handleConfirmDelete}

                />
                
            </Dialog>

           
        </>
    );
}
