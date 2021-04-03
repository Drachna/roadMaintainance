import React, { useContext, useEffect, useState } from 'react';
import useTable from '../../UIControls/Table'
import {
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Button,
  IconButton,
} from '@material-ui/core'
import { RiThumbUpFill } from "react-icons/ri";
import { Controls } from '../../UIControls/Controls'
import { ComplainContext } from '../../../Contexts/Complains/complainsContext';
import { fetchAllComplains } from '../../../Services/Api/getMethodCalls';
import Upvote from '../Upvote/Upvote'
import { AuthContext } from '../../../Contexts/Authentication/AuthContext';
import Header from '../../Layouts/Header/Header';
import PopUp from '../../UIControls/PopUp';
import { useStyles } from '../../../assets/styles/showTableStyles'
import { headCells } from '../../../assets/data/optionArrays'
import {FETCH_ALL_COMPLAINS} from '../../../Reducers/actionTypes'

const ShowComplaintsTable = (props) => {

  const classes = useStyles()
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const { complains, dispatchComplains } = useContext(ComplainContext)
  const { authState } = useContext(AuthContext)
  const [editComplaint, setEditComplaint] = useState(null)
  const [loading, setLoading] = useState(true)
  const { TableContainer, TableHeader, TablePagenations, recordsAfterPagingAndSorting } = useTable(complains, headCells, filterFn)

  useEffect(() => {
    fetchAllComplains()
      .then(res => {
        if (res && !res.response)
          dispatchComplains({ type: FETCH_ALL_COMPLAINS, payload: res.data })
          setLoading(false)
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
      <div className={classes.container}>
        <Header title="COMPLAINTS LIST"></Header>
        <Toolbar className={classes.toolbar}>
          <h1 className={classes.header}></h1>
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
                    {authState === 'NOT_LOGGED_IN' ? 'View Details' : 'Take Action'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </TableContainer>
        <TablePagenations />
        <PopUp
          title="Login"
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
        >
          <Upvote editComplaint={editComplaint} setOpenPopUp={setOpenPopUp} />
        </PopUp>
      </div>
    </>
  );
};

export default ShowComplaintsTable;