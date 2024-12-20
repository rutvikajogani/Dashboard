import React, { useState ,useEffect} from 'react';

import Button from '@mui/material/Button';
import SimpleDialog from '@mui/material/Dialog';
import { AddUserForm } from './Adduser';
import { Dropdowns } from './Dropdown';
import {  searching } from './Slice';
import {  useDispatch } from 'react-redux';


export function Userdashboard({id, setId}) {
  console.log('id');
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(id ? true : false);
  }, [id]);

  const handleAddUserClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setId(null)
    setOpen(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    if (query === '') {
      dispatch(searching('')); 
    } else {
      dispatch(searching(query.trim()));
    }
  };

 
  return (
    <>
      <div className="Userdashboard">
        <h1>Users Dashboard</h1>
        <div className="searchbarmain">
          <div className="searchbar">
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            
              className="search"
            />
          </div>
          <div className="Addbuttom">
            <Button variant="outlined" onClick={handleAddUserClick} >
              Add user +
            </Button>
          </div>
          <Dropdowns className="drop" />
        </div>
      </div>

      

      <SimpleDialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
      >
        <AddUserForm handleClose={handleClose}  id={id}/>
      </SimpleDialog>
    </>
  );
}
