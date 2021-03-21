import React, { useContext, useEffect, useState } from 'react';
import useTable from '../../Controls/Table'
import { TableBody, TableRow, makeStyles, TableCell, Toolbar, Button, IconButton,
   Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import { RiThumbUpFill } from "react-icons/ri";
import { Controls } from '../../Controls/Controls'
import { ComplainContext } from '../../../Contexts/Complains/complainsContext';
import { fetchAllComplains } from '../../../Services/Api/getMethodCalls';
import Upvote from '../Upvote/Upvote'
import { GrClose } from "react-icons/gr";
import { AuthContext } from '../../../Contexts/Authentication/AuthContext';
import Header from '../../Home/Header';

const useStyles=makeStyles({
  container:{
padding:'20px'
  },
  toolbar:{
    display:'flex'
  },
  header:{
    float:'left',
    flexGrow:1
  },
  searchBox:{
    float:'right'
  }
})

const headCells = [
  { id: '_id', label: 'Complain Number' },
  { id: 'upvote', label: 'Upvotes' },
  { id: 'description', label: 'Description' },
  { id: 'status', label: 'Status' },
  { id: 'locality', label: 'Locality' },
  { id: 'action', label: 'Action' }

  // { id: 'department', label: 'Department', disableSorting: true },
]


const ShowComplaintsTable = (props) => {
  const classes=useStyles()
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const { complains, dispatchComplains } = useContext(ComplainContext)
  const {authState}=useContext(AuthContext)
  const [editComplaint, setEditComplaint] = useState(null)
  const [loading,setLoading]=useState(true)
  const { TableContainer, TableHeader, TablePagenations, recordsAfterPagingAndSorting } = useTable(complains, headCells, filterFn)

  useEffect(() => {
    fetchAllComplains()
      .then(res => {
        console.log(authState);
        if (res)
        dispatchComplains({ type: 'FETCH_ALL_COMPLAINS', payload: res })
       setLoading(false)
      }).catch(err => {
        console.log(err);
      })
  }, [])

  const [openPopUp, setOpenPopUp] = React.useState(null);

  const handleUpvote = (complaint) => {
    setOpenPopUp(true);
    setEditComplaint(complaint)
  };


  const searchComplain = (e) => {
    let target = e.target
    setFilterFn({

      fn: items => {
        if (target.value === "")
          return items;
        else
          return items.filter(x => x._id.toLowerCase().includes(target.value))
      }
    })
  }

  const handleClick = (record) => {
    props.history.push({
      pathname: '/getComplain',
      state: { complainDetails: record }
    })
  }

  return (
    <>
    <Header title=" Complaints List"></Header>
    <div className={classes.container}>
      <Toolbar className={classes.toolbar}>
        <h1 className={classes.header}>
          {/* Complaints List */}
        </h1>
        <Controls.Input
          label="Search Complain"
          onChange={searchComplain}
        >

        </Controls.Input>
      </Toolbar>
      <TableContainer>
        <TableHeader />
        <TableBody>
          {!loading && complains && recordsAfterPagingAndSorting().map((record, index) => (
            <TableRow key={index}>
              <TableCell>
                {(record._id).toUpperCase()}
              </TableCell>
              <TableCell>
                {record.upvote.count}
                <IconButton onClick={() => handleUpvote(record)}>
                  <RiThumbUpFill />
                </IconButton >
              </TableCell>
              <TableCell>
                {record.description}
              </TableCell>
              <TableCell>
                {record.status}
              </TableCell>
              <TableCell>
                {record.locality}
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleClick(record)}>
                  
                  {authState==='NOT_LOGGED_IN'?'View Details':'Take Action'}
                </Button>
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>

      </TableContainer>
      <TablePagenations />
      <Dialog open={openPopUp} maxWidth="md">
        <DialogTitle style={{ background: 'black' }}>
          <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Upvote Complaint
              </Typography>
            <IconButton>
              <GrClose style={{ background: 'white' }} onClick={() => setOpenPopUp(false)} />
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent dividers>
          <Upvote editComplaint={editComplaint} setOpenPopUp={setOpenPopUp} />
        </DialogContent>
      </Dialog>

    </div>
    </>
  );
};

export default ShowComplaintsTable;