import React, { useContext, useEffect } from 'react'
import './serialList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { get_serial, create_serial, delete_serial } from '../../context/serialcontext/apiCalls';
import { serialContext } from "../../context/serialcontext/SerialContext"

export default function SerialList() {
    const { serials, dispatch } = useContext(serialContext);

    console.log("the dispatch function is",serials)

    useEffect(() => {
        get_serial(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        delete_serial(dispatch, id);
    };

    const columns = [
        { field: "cont_id", headerName: "ID", width: 120 },
        {
            field: "cont_title",
            headerName: "Movie",
            width: 150,
        },
        { field: "genre", headerName: "Genre", width: 120 },
        { field: "release_time", headerName: "year", width: 120 },
        { field: "age_limit", headerName: "limit", width: 120 },
        { field: "ratting", headerName: "Ratting", width: 120 },

        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            to={{ pathname: "/content/" + params.row.cont_id, movie: params.row }}
                        >
                            <button className="productListButton">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.cont_id)}
                        />
                    </>
                );
            },
        },
    ];
    return (
        <div className='productList'>
            <h4 className='content_list_title'>Serial List</h4>
            <DataGrid
                rows={serials}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                pageSize={8}
                getRowId={(r) => r.cont_id}
            />
        </div>
    )
}
