import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import gsap from "gsap";

const useStyles = makeStyles((theme) => ({
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: "rgb(70,70,70)",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  overlayLoader: {},
  avatar: {
    width: "100%",
    height: "auto",
    borderRadius: 0,
    marginBottom: theme.spacing(2),
  },
  loadingText: {
    color: "#fff",
  },
}));

export default function Loading(props) {
  const classes = useStyles();
  const overlayRef = React.useRef();
  const overlayLoaderRef = React.useRef();

  const animateOut = () => {
    gsap.to(overlayRef.current, 0.6, {
      bottom: "100%",
      ease: "Power4.easeInOut",
      delay: 0.25,
    });
    gsap.to(overlayLoaderRef.current, 0.5, { y: "-40", opacity: 0 });
  };

  const animateOut_2 = () => {
    gsap.to(overlayRef.current, 0.6, {
      top: "100%",
      ease: "Power4.easeInOut",
      delay: 0.25,
    });
    gsap.to(overlayLoaderRef.current, 0.5, { y: "40", opacity: 0 });
  };

  const animateIn = () => {
    gsap.fromTo(
      overlayRef.current,
      0.6,
      { top: "100%", bottom: 0 },
      { top: 0, ease: "Power4.easeInOut" }
    );
    gsap.fromTo(
      overlayLoaderRef.current,
      0.5,
      { y: "40", opacity: 0, delay: 0.3 },
      { y: 0, opacity: 1, delay: 0.6, ease: "Power2.easeOut" }
    );
  };

  React.useEffect(() => {
    if (props.loading) animateIn();
  }, []);

  React.useEffect(() => {
    if (!props.loading) setTimeout(animateOut_2, 200);
  }, [props.Loading]);

  return (
    <div className={classes.overlay} ref={overlayRef} style={{ opacity: 1 }}>
      <div className={classes.overlayLoader} ref={overlayLoaderRef}>
        <Typography component="h2" variant="h2" className={classes.loadingText}>
          در حال بارگزاری...
        </Typography>
      </div>
    </div>
  );
}
