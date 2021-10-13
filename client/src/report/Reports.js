import React,{useRef} from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ReportTable from "./components/ReportTable";
import "./styles/Orders.css";
import ReactToPrint from 'react-to-print';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
    overflow: "unset",
  },
  content: {
    padding: 10,
    justifyContent: "center",
    display: "grid",
    justifyItems: "center",
  },
  textField: {
    alignSelf: "center",
    marginTop: "1em",
  },
  h2: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    marginBottom: 20,
  },
  h4: {
    color: theme.palette.black,
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    margin: 10,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  },
  lottie: {
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
  postJobSection: {
    minWidth: "100%",
  },
  featuredOrganizations: {
    minWidth: "100%",
  },
  rightSubColumn: {
    [theme.breakpoints.down("sm")]: {
      minWidth: "fit-content",
      paddingTop: 24,
    },
  },
}));

function Reports(props) {
  const classes = useStyles();
  const componentRef = useRef();

  return (
    <Grid
      item
      container
      xs={12}
      spacing={3}
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >

      <Grid item container xs={12}>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Grid
              container
              direction="row"
              spacing={3}
              justify="space-between"
              alignItems="center"
              style={{ maxWidth: "100%" }}
            >
              <Grid item xs={12}>
                <div class = "printme">
                <ReportTable />
                </div>
                <div class = "no-printme">
                <Button onClick={()=>{window.print()}}>Print</Button>
                </div>
                
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Reports;
