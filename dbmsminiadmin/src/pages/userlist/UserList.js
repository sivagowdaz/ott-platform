import React, { useEffect, useContext } from 'react'
import './userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { userContext } from '../../context/usercontext/UserContext';
import { get_all_users, delete_user } from '../../context/usercontext/apiCalls'



export default function UserList() {

    const {userList, dispatch, error, isFetching } = useContext(userContext)

    useEffect(() => {
        get_all_users(dispatch)
    }, [dispatch])

    const handleDelete = async (email) => {
        console.log("inside the hadledelete")
        delete_user(dispatch, email)
    }


    console.log("the user List is", dispatch, userList, error, isFetching)




    const columns = [
        { field: 'email', headerName: 'EMAIL', width: 260 },
        {
            field: 'username', headerName: 'Username', width: 250, renderCell: (params) => {
                return (
                    <div className='userListUser'>
                        <img src={params.row.profilePic} alt="" className='UserListImage' />
                        <span>{params.row.username}</span>
                    </div>
                )
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`user/${params.row.email}`}>
                            <button className="userListButton">Edit</button>
                        </Link>
                        <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row.email)} />
                    </>
                )
            }
        }
    ];


    return (
        <div className='userList'>
            <h4 className='content_list_title'>User List</h4>
            <DataGrid
                rows={userList || []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                pageSize={8}
                getRowId={(r) => r.email}
            />
        </div>
    )
}
