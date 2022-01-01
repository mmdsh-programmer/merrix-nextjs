import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import { Avatar } from "@material-ui/core";
import { CartContext } from "src/helpers/CartContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "100%",
    backgroundColor: "#fcfcfc",
  },
  button: {
    minWidth: "25px",
    padding: "1px 1px",
  },
  borderlessButton: {
    border: "none",
  },
  coloredBorderButton: {
    borderBottom: "1px solid rgba(245, 0, 87, 0.5) !important",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  topMargin: {
    marginTop: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "rgb(160,160,160)",
  },
  middleLine: {
    color: "rgb(102,102,102)",
  },
  code: {
    fontSize: "0.77rem",
    color: "rgb(160,160,160)",
  },
  media: {
    height: 358,
  },
  cardDescription: {
    flexDirection: "row-reverse",
    minHeight: 78,
  },
  customChip: {
    position: "absolute",
    right: 0,
    top: 15,
    minWidth: 65,
    borderRadius: 0,
    //backgroundColor: "#50bb50",
  },
  showPieces: {
    fontSize: "0.77rem",
    color: "rgb(160,160,160)",
    marginTop: 10,
    direction: "initial",
  },
  pack: {
    alignSelf: "center",
    whiteSpace: "pre",
    direction: "initial",
    fontSize: "0.81rem",
  },
  customBox: {
    marginTop: 10,
  },
  new: {
    width: 30,
    height: "auto",
    objectFit: "contain",
    borderRadius: 0,
    marginLeft: 5,
  },
  CardActionArea: {
    "&:hover": {
      "& $hoverImage": {
        opacity: 1,
      },
    },
  },
  cardImage: {
    opacity: 1,
  },
  hoverImage: {
    borderRadius: 0,
    width: "100%",
    height: 358,
    position: "absolute",
    top: 0,
    left: 0,
    transition: "all 0.4s",
    opacity: 0,
  },
  avatarImage: {
    objectFit: "contain",
  },
}));

export default function ProductCard(props) {
  const classes = useStyles();
  const ref = React.useRef(null);
  const [count, setCount] = React.useState(0);
  const { cartItems, increase, addProduct, decrease, removeProduct } =
    React.useContext(CartContext);
  const [show, setShow] = React.useState(false);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const selectedCartItem = (id) => {
    return cartItems.filter((e) => e.id === id);
  };

  const splitName = (name) => {
    const firstRow = name.split("|")[0];
    const firstRowTemp = name.split("|")[1];
    const secondRow =
      typeof firstRowTemp !== "undefined" && firstRowTemp.split("—")[0];
    const splitedName = { firstRow: firstRow, secondRow: secondRow };
    return splitedName;
  };

  const handleShowPack = () => {
    const count = isInCart(props) ? selectedCartItem(props.id)[0].quantity : 0;
    if (count + 1 == 1) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1800);
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.CardActionArea}>
        <CardMedia
          component="img"
          alt={props.title}
          height="358"
          image={
            props.image.length > 0
              ? props.image[0].src
              : "https://merrix.com/wp-content/uploads/woocommerce-placeholder.png"
          }
          title={props.title}
          classes={{
            img: classes.cardImage,
          }}
        />
        {props.image.length > 1 && (
          <Avatar
            alt="second image"
            src={props.image[1].src}
            className={classes.hoverImage}
            imgProps={{
              style: {
                objectFit: "cover",
              },
            }}
          />
        )}
      </CardActionArea>
      <CardActions
        classes={{
          root: classes.cardAction,
        }}
      >
        <Grid container spacing={1} className={classes.cardDescription}>
          <Grid item xs={10}>
            <Box
              component="div"
              display="flex"
              textOverflow="ellipsis"
              flexDirection="row-reverse"
              alignItems="center"
              overflow="hidden"
              className={classes.customBox}
            >
              {props.new && (
                <Avatar
                  alt="new"
                  src="/new.png"
                  className={classes.new}
                  imgProps={{
                    style: {
                      objectFit: "contain",
                    },
                  }}
                />
              )}
              <Tooltip
                title={splitName(props.title).secondRow}
                arrow
                placement="top"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
              >
                <Typography
                  variant="body1"
                  component="h2"
                  align="right"
                  className={classes.middleLine}
                  noWrap
                >
                  {splitName(props.title).secondRow}
                </Typography>
              </Tooltip>
            </Box>
            <Typography
              variant="body1"
              component="h2"
              className={classes.showPieces}
            >
              Package: {props.pieces} pcs
            </Typography>
            <Typography
              variant="body1"
              component="h2"
              align="right"
              className={classes.code}
            >
              X Code: {props.sku}
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.buttonContainer}>
            <ButtonGroup orientation="vertical">
              {isInCart(props) && (
                <Button
                  aria-label="reduce"
                  size="small"
                  variant="outlined"
                  color="secondary"
                  className={[classes.button, classes.coloredBorderButton].join(
                    " "
                  )}
                  onClick={() => {
                    handleShowPack();
                    setCount(Math.max(count - 1, 0));
                    selectedCartItem(props.id)[0].quantity === 1
                      ? removeProduct(props)
                      : decrease(props);
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
              )}
              {isInCart(props) && (
                <Button
                  aria-label="count"
                  size="small"
                  variant="outlined"
                  style={{ visibility: show ? "hidden" : "visible" }}
                  className={[classes.button, classes.borderlessButton].join(
                    " "
                  )}
                >
                  {isInCart(props) ? selectedCartItem(props.id)[0].quantity : 0}
                </Button>
              )}
              <Button
                aria-label="increase"
                size="small"
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  handleShowPack();
                  setCount(count + 1);
                  isInCart(props) ? increase(props) : addProduct(props);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            {show && (
              <Typography
                variant="body1"
                component="h2"
                className={[classes.pack, "animate__fadeInLeft"].join(" ")}
              >
                {isInCart(props) ? selectedCartItem(props.id)[0].quantity : 0}
                {"\t"}
                package
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
