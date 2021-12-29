import React from "react";
import Head from "next/head";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grow from "@material-ui/core/Grow";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const specialBreakpoint = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 769,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(13),
    marginBottom: theme.spacing(5),
  },
  dFlex: {
    display: "flex",
  },
  root: {
    width: "100%",
    marginBottom: theme.spacing(7),
  },
  heading: {
    color: "#a0a0a0",
    fontSize: theme.typography.pxToRem(18),
    flexShrink: 0,
    [specialBreakpoint.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(15),
    },
  },
  square: {
    width: "100%",
    height: "auto",
  },
  accordion: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  AccordionDetails: {
    [specialBreakpoint.breakpoints.down("xs")]: {
      paddingLeft: 2,
      paddingRight: 2,
    },
  },
}));

export default function SizeGuide(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("kraft-xbag");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Head>
        <title>شرکت مریخ (لوتوس) - راهنمای سایز</title>
      </Head>
      <React.Fragment>
        <Container maxWidth="lg">
          <Typography variant="h5" component="h1" className={classes.title}>
            راهنمای سایز محصولات
          </Typography>
          <div className={classes.root}>
            <Accordion
              expanded={expanded === "kraft-xbag"}
              onChange={handleChange("kraft-xbag")}
              className={classes.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="kraft-xbag-content"
                id="kraft-xbag-header"
              >
                <Typography className={classes.heading}>
                  راهنمای سایز بگ کرافت
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                classes={{
                  root: classes.AccordionDetails,
                }}
              >
                <Grid container spacing={1}>
                  {[...Array(4).keys()].map((index) => (
                    <Grow
                      key={index}
                      in={expanded === "kraft-xbag"}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(expanded === "kraft-xbag"
                        ? { timeout: 250 * index }
                        : {})}
                    >
                      <Grid item xs={12} sm={6}>
                        <Avatar
                          variant="square"
                          src={`/kraft-xbag/${index + 1}.jpg`}
                          className={classes.square}
                        />
                      </Grid>
                    </Grow>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "glossy-xbag"}
              onChange={handleChange("glossy-xbag")}
              className={classes.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="glossy-xbag-content"
                id="glossy-xbag-header"
              >
                <Typography className={classes.heading}>
                  راهنمای سایز بگ گلاسه
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                classes={{
                  root: classes.AccordionDetails,
                }}
              >
                <Grid container spacing={1}>
                  {[...Array(18).keys()].map((index) => (
                    <Grow
                      in={expanded === "glossy-xbag"}
                      key={index}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(expanded === "glossy-xbag"
                        ? { timeout: 150 * index }
                        : {})}
                    >
                      <Grid item xs={12} sm={6}>
                        <Avatar
                          variant="square"
                          src={`/glossy-xbag/${index + 1}.jpg`}
                          className={classes.square}
                        />
                      </Grid>
                    </Grow>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "fantasy-xmemo"}
              onChange={handleChange("fantasy-xmemo")}
              className={classes.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="fantasy-xmemo-content"
                id="fantasy-xmemo-header"
              >
                <Typography className={classes.heading}>
                  راهنمای سایز دفترچه
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                classes={{
                  root: classes.AccordionDetails,
                }}
              >
                <Grid container spacing={1}>
                  {[...Array(6).keys()].map((index) => (
                    <Grow
                      key={index}
                      in={expanded === "fantasy-xmemo"}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(expanded === "fantasy-xmemo"
                        ? { timeout: 150 * index }
                        : {})}
                    >
                      <Grid item xs={12} sm={6}>
                        <Avatar
                          variant="square"
                          src={`/fantasy-xmemo/${index + 1}.jpg`}
                          className={classes.square}
                        />
                      </Grid>
                    </Grow>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "metal-box"}
              onChange={handleChange("metal-box")}
              className={classes.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="metal-box-content"
                id="metal-box-header"
              >
                <Typography className={classes.heading}>
                  راهنمای سایز متال باکس
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                classes={{
                  root: classes.AccordionDetails,
                }}
              >
                <Grid container spacing={1}>
                  {[...Array(15).keys()].map((index) => (
                    <Grow
                      key={index}
                      in={expanded === "metal-box"}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(expanded === "metal-box"
                        ? { timeout: 150 * index }
                        : {})}
                    >
                      <Grid item xs={12} sm={6}>
                        <Avatar
                          variant="square"
                          src={`/metal-box/${index + 1}.jpg`}
                          className={classes.square}
                        />
                      </Grid>
                    </Grow>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "kit-box"}
              onChange={handleChange("kit-box")}
              className={classes.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="kit-box-content"
                id="kit-box-header"
              >
                <Typography className={classes.heading}>
                  راهنمای سایز کیت باکس
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                classes={{
                  root: classes.AccordionDetails,
                }}
              >
                <Grid container spacing={1}>
                  {[...Array(2).keys()].map((index) => (
                    <Grow
                      key={index}
                      in={expanded === "kit-box"}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(expanded === "kit-box"
                        ? { timeout: 150 * index }
                        : {})}
                    >
                      <Grid item xs={12} sm={6}>
                        <Avatar
                          variant="square"
                          src={`/kit-box/${index + 1}.webp`}
                          className={classes.square}
                        />
                      </Grid>
                    </Grow>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
        </Container>
      </React.Fragment>
    </>
  );
}
