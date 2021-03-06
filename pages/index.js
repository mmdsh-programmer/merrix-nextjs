import React from "react";
import Head from "next/head";
import Link from "next/link";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";

const specialBreakpoint = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContainer: {
    [specialBreakpoint.breakpoints.down("md")]: {
      paddingLeft: "5px",
      paddingRight: "5px",
    },
  },
  container: {
    width: "auto",
    margin: 0,
  },
  dFlex: {
    display: "flex",
    width: "auto",
    height: "auto",
    [specialBreakpoint.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    "&:hover $hoverInfo": {
      opacity: 1,
    },
    "&:hover $square": {
      opacity: 0.1,
    },
  },
  cardInfo: {
    position: "relative",
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  loading: {
    margin: "auto",
    marginTop: theme.spacing(5),
    display: "flex",
  },
  container: {
    width: "auto",
    margin: 0,
  },
  link: {
    width: "100%",
    color: "#999",
  },
  square: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    borderRadius: 0,
    opacity: 1,
    transition: "all .5s",
    [specialBreakpoint.breakpoints.down("xs")]: {
      height: "auto",
    },
  },
  hoverInfo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    transition: "all .5s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  gutterBottom: {
    width: "100%",
    height: theme.spacing(5),
  },
}));

export default function Home() {
  const classes = useStyles();

  const firstPageItems = [
    {
      href: "/categories/211",
      slug: "X BOX-????????",
      searchParams: [{ material: "?????? ????????" }, { size: 1 }],
      image: "/kit-box.webp",
      description: "X BOX",
    },
    {
      href: "/categories/179",
      slug: "X MEMO-????????????",
      searchParams: [{ material: "???????????? ???????? ??????????" }, { size: 2 }],
      image: "/sketch-booklet.webp",
      description: "X MEMO",
    },
    {
      href: "/categories/171",
      slug: "X BAG-????",
      searchParams: [{ material: "??????????" }, { size: 2 }],
      image: "/kraft-bag.webp",
      description: "X BAG",
    },
    {
      href: "/categories/171",
      slug: "X BAG-????",
      searchParams: [{ material: "??????????" }, { size: 3 }],
      image: "/fancy-bag.webp",
      description: "X BAG",
    },
    {
      href: "/categories/270",
      slug: "TISSUE BOX-???????? ???????????? ??????????",
      searchParams: [],
      image: "/nex-box.webp",
      description: "NEX BOX",
    },
    {
      href: "/categories/211",
      slug: "X BOX-????????",
      searchParams: [],
      image: "/metal-pot.webp",
      description: "Metal Pot",
    },
  ];

  return (
    <React.Fragment>
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Grid container className={classes.container} spacing={2}>
          {firstPageItems.map(
            ({ href, slug, searchParams, image, description }, index) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                className={classes.dFlex}
                key={index}
              >
                <div className={classes.cardInfo}>
                  <Link
                    href={{
                      pathname: `${href}/${encodeURIComponent(slug)}`,
                      search: searchParams
                        .map((param) => {
                          if (
                            Object.values(param).some((val) => val !== null)
                          ) {
                            return `${Object.keys(param)}=${Object.values(
                              param
                            )}`;
                          }
                        })
                        .join("&"),
                    }}
                    className={classes.link}
                  >
                    <a>
                      <Avatar
                        alt="logo"
                        src={image}
                        className={classes.square}
                      />
                    </a>
                  </Link>
                  <div className={classes.hoverInfo}>
                    <Typography
                      variant="h5"
                      component="h5"
                      className={classes.title}
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              </Grid>
            )
          )}
        </Grid>
        <div className={classes.gutterBottom}></div>
      </Container>
    </React.Fragment>
  );
}
