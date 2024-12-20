import * as React from 'react';
import { useState,useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { addUser ,editUser} from './Slice';

export function AddUserForm(props) {
    const dispatch = useDispatch();
    const { handleClose, id} = props;

    const [edituser] =useState(JSON.parse(localStorage.getItem('items') ) ?.find(item =>item.userId  === id));    
    console.log(edituser)

  
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: '',
        superAdmin: { read: false, write: false, delete: false },
        admin: { read: false, write: false, delete: false },
        employee: { read: false, write: false, delete: false },
        user: { read: false, write: false, delete: false },
    });
    useEffect(()=>{
        if(edituser){
            
            setData({
                userId:edituser.userId,
                firstName: edituser.firstName,
                lastName: edituser.lastName,
                email: edituser.emailid,
                mobile: edituser.mobileNo,
                username: edituser.username,
                password: edituser.Password,
                confirmPassword: edituser.confirmPassword,
                role: edituser.role,
                superAdmin: {...edituser.superAdmin},
                admin: {...edituser.admin},
                employee: {...edituser.employee},
                user: {...edituser.user}
            })
        }
    } , [edituser])

    function addData() {
        const { userId, firstName, lastName, email, mobile, username, password, confirmPassword, role } = data;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (
            !userId.trim() ||
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !mobile.trim() ||
            !username.trim() ||
            !password.trim() ||
            !confirmPassword.trim() ||
            !role.trim()
        ) {
            setErrorMessage("Please fill in all required fields without spaces.");
            return;
        }

        if (data.password !== data.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        if (!mobileRegex.test(mobile)) {
            setErrorMessage("Please enter a valid 10-digit mobile number.");
            return;
        }
        // if (!passwordRegex.test(password)) {
        //     setErrorMessage("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
        //     return;
        // }

        const newItem = {
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            emailid: data.email,
            mobileNo: data.mobile,
            username: data.username,
            Password: data.password,
            confirmPassword: data.confirmPassword,
            role: data.role,
            superAdmin: data.superAdmin,
            admin: data.admin,
            employee: data.employee,
            user: data.user,
        };

        if (id) {
            // Edit user
            dispatch(editUser(newItem)); // editUser action required in Redux
            console.log("User edited:", newItem);
        } else {
            // Add new user
            dispatch(addUser(newItem));
            console.log("User added:", newItem);
        }
        handleClose();
    }

    function inputFields(e) {
        setErrorMessage('');
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function tablehandler(e) {
        const { name, checked } = e.target;
        const [role, permission] = name.split('.');

        setData((prev) => ({
            ...prev,
            [role]: {
                ...prev[role],
                [permission]: checked,
            },
        }));
    }

    return (
        <Box sx={{ padding: '1vw', width: '100%', overflowX: 'hidden', margin: '0' }}>
            <form onSubmit={addData}>
                <div className="add">
                    <DialogTitle>{id ? "Edit user " : "Add user"}</DialogTitle>
                    <CloseIcon onClick={handleClose} />
                </div>

                {errorMessage && (
                    <Box sx={{ color: 'red', marginBottom: '10px' }}>
                        <strong>{errorMessage}</strong>
                    </Box>
                )}

                <TextField placeholder="User ID *" required fullWidth size="small" sx={{ marginRight: '16px', marginBottom: '10px' }} onChange={inputFields} name="userId" value={data.userId} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <TextField placeholder="First Name *" required fullWidth size="small" sx={{ marginRight: '16px' }} onChange={inputFields} name="firstName" value={data.firstName}/>
                    <TextField placeholder="Last Name *" required fullWidth size="small" name="lastName" onChange={inputFields}  value={data.lastName}/>
                </div>

                <div style={{ display: 'flex', gap: '1vw' }}>
                    <TextField placeholder="Email ID *" required fullWidth size="small" type="email" sx={{ marginBottom: '16px' }} name="email" onChange={inputFields}value={data.email} />
                    <TextField placeholder="Mobile No" type="number" fullWidth size="small" name="mobile" onChange={inputFields} value={data.mobile}/>

                    <FormControl fullWidth size="small">
                        <InputLabel>Select Role Type</InputLabel>
                        <Select required onChange={inputFields} name="role" value={data.role }>
                            <MenuItem value="superadmin">Super Admin</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="employee">Employee</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField placeholder="Username *" required fullWidth size="small" sx={{ marginRight: '16px' }} name="username" onChange={inputFields}  value={data.username}  />
                    <TextField placeholder="Password *" required type="password" fullWidth size="small" sx={{ marginRight: '16px' }} name="password" onChange={inputFields} value={data.password}   />
                    <TextField placeholder="Confirm Password *" required type="password" fullWidth size="small" name="confirmPassword" onChange={inputFields} value={data.confirmPassword}  />
                </div>

                <Box sx={{ marginTop: '20px' }}>
                    <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#EFF4FA' }}>
                                <TableCell>Module Permission</TableCell>
                                <TableCell align="center">Read</TableCell>
                                <TableCell align="center">Write</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Super Admin</TableCell>
                                <TableCell align="center">
                                    <Checkbox name="superAdmin.read" checked={data.superAdmin.read} onChange={tablehandler} />
                                </TableCell>
                                <TableCell align="center">
                                    <Checkbox name="superAdmin.write" checked={data.superAdmin.write} onChange={tablehandler} />
                                </TableCell>
                                <TableCell align="center">
                                    <Checkbox name="superAdmin.delete" checked={data.superAdmin.delete} onChange={tablehandler} />
                                </TableCell>
                            </TableRow>

                            <TableRow sx={{ minHeight: '1vh' }} >
                            <TableCell sx={{ height: '1vh' }}>Admin</TableCell>
                            <TableCell sx={{ height: '1vh' }} align="center">
                                <Checkbox
                                    name="admin.read"
                                    checked={data.admin.read}
                                    onChange={tablehandler}
                                />
                            </TableCell>
                            <TableCell sx={{ height: '1vh' }} align="center">
                                <Checkbox
                                    name="admin.write" 
                                    checked={data.admin.write}
                                    onChange={tablehandler}
                                />
                            </TableCell>
                            <TableCell sx={{ height: '1vh' }} align="center">
                                <Checkbox
                                    name="admin.delete"
                                    checked={data.admin.delete}
                                    onChange={tablehandler}
                                />
                            </TableCell>
                        </TableRow>


                        <TableRow sx={{ minHeight: '1vh' }}>
                            <TableCell sx={{ height: '1vh' }} >Employee</TableCell>
                            <TableCell sx={{ height: '1vh' }} align="center">
                                <Checkbox name='employee.read'
                                    checked={data.employee.read}
                                    onChange={tablehandler} />
                            </TableCell>
                            <TableCell sx={{ height: '1vh' }} align="center">
                                <Checkbox name='employee.write'
                                    checked={data.employee.write}
                                    onChange={tablehandler} />
                            </TableCell>
                            <TableCell sx={{ height: '1vh' }} align="center">
                                <Checkbox name='employee.delete'
                                    checked={data.employee.delete}
                                    onChange={tablehandler} />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ minHeight: '1vh' }}>
                            <TableCell sx={{ height: '1vh' }} >User</TableCell>
                            <TableCell sx={{ height: '1vh' }} align="center">
                                <Checkbox name='User.read'
                                    checked={data.user.read}
                                    onChange={tablehandler} />
                            </TableCell>
                            <TableCell sx={{ height: '1vh' }} align="center">
                                <Checkbox name='User.write'
                                    checked={data.user.write}
                                    onChange={tablehandler} />
                            </TableCell>
                            <TableCell sx={{ height: '1vh' }} align="center">
                                <Checkbox name='User.delete'
                                    checked={data.user.delete}
                                    onChange={tablehandler} />
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '20px', gap: '2vw' }}>
                    <Button variant="contained" color="primary" type="submit" onClick={addUser}>  {id? "edit user" : "add user"}
                     
                    </Button>
                    <Button variant="text" color="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

