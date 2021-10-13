import {
    Button,
    Chip,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
    Typography,
    withStyles

  } from "@material-ui/core";
  import axios from "axios";
  import React, { useState,useEffect } from "react";
  import { useForm } from "react-hooks-helper";
  import Lottie from "react-lottie";
  import FloatCard from "../../components/FloatCard";
  import BACKEND_URL from "../../Config";
  import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
  import MailRoundedIcon from "@material-ui/icons/MailRounded";
  import SnackBarAlert from "../../components/SnackBarAlert";
  import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import Loading from "../../components/Loading";
const jwt = require("jsonwebtoken");

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.tuftsBlue,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.whiteHover,
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles((theme) => ({
    activeChip: {
      backgroundColor: theme.palette.green,
      color: theme.palette.black,
    },
    inactiveChip: {
      backgroundColor: theme.palette.lightRed,
      color: theme.palette.black,
    },
    button: {
      backgroundColor: theme.palette.red,
      color: "white",
      margin: 10,
      borderRadius: 25,
      paddingLeft: 10,
      paddingRight: 10,
      "&:hover": {
        backgroundColor: theme.palette.redHover,
        color: "white",
      },
    },
    category: {
      alignSelf: "left",
      backgroundColor: theme.palette.tagYellow,
    },
    location: {
      backgroundColor: theme.palette.tagYellow,
    },
  }));
  function Reports() {
    const classes = useStyles();
    const [alertShow, setAlertShow] = useState(false);
    const [alertData, setAlertData] = useState({ severity: "", msg: "" });
    const displayAlert = () => {
      return (
        <SnackBarAlert
          open={alertShow}
          onClose={handleAlertClose}
          severity={alertData.severity}
          msg={alertData.msg}
        />
      );
    };
    const handleAlert = () => {
      setAlertShow(true);
    };
    const handleAlertClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setAlertShow(false);
    };
    const token = sessionStorage.getItem("userToken");
  const userData = jwt.decode(token, { complete: true }).payload;
  const [state, setState] = useState({
    allOrders: [],
  });
  const allOrders = state.allOrders;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/report`)
      .then((res) => {
        if (res.data.success) {
          setState({
            allOrders: res.data.reportData,
          });
        }
      });
  }, []);
  
    
  
    return allOrders.length ? (
        <TableContainer component={Paper}>
          {displayAlert()}
          <Table className={classes.table} aria-label="customized table">
            <colgroup>
              <col style={{ width: "35%" }} />
              <col style={{ width: "35%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Phone</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">No Of Orders</StyledTableCell>
          
              </TableRow>
            </TableHead>
            <TableBody>
              {allOrders.map((row, index) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.element.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.element.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.element.mobile}</StyledTableCell>
                  <StyledTableCell align="center">{row.element.address.street+","+row.element.address.city+","+row.element.address.disrict}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.presCount}
                  </StyledTableCell>
                 
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          
        </TableContainer>
      ) : (
        <Loading />
      );
  }
  
  export default Reports;
  