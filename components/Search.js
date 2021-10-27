import React from "react";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import searchresult from "../src/services/crud/search";
import { CartContext } from "../src/helpers/CartContext";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  searchTitle: {
    marginBottom: theme.spacing(5),
    width: "100%",
  },
  searchField: {
    marginBottom: theme.spacing(5),
  },
  dialogTitle: {
    "& h2": {
      fontSize: "1.5rem",
    },
    textAlign: "center",
    marginTop: theme.spacing(5),
  },
  searchGif: {
    width: "100%",
    height: "auto",
  },
  TableContainer: {
    marginBottom: theme.spacing(5),
  },
  dialog: {
    [specialBreakpoint.breakpoints.down("xs")]: {
      width: "95%",
    },
    cursor: `auto`,
  },
  dialogContent: {
    [specialBreakpoint.breakpoints.down("xs")]: {
      padding: "8px 0px",
    },
  },
  dialogRoot: {
    cursor: `url(/cancel.png) , auto`,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Search(props) {
  const classes = useStyles();
  const [searchResult, setSearchResult] = React.useState([]);
  const [searchLoading, setSearchLoading] = React.useState("first time");
  const { cartItems, increase, addProduct } = React.useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const isNew = (date) => {
    const now = new Date();
    const productCreatedTime = {
      day: Number(date.substr(8, 2)),
      month: Number(date.substr(5, 2)),
      year: Number(date.substr(0, 4)),
    };
    const currentTime = {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };
    const current = new Date(
      `${currentTime.month}/${currentTime.day}/${currentTime.year}`
    );
    const product = new Date(
      `${productCreatedTime.month}/${productCreatedTime.day}/${productCreatedTime.year}`
    );
    const diffTime = Math.abs(current - product);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 31) {
      return true;
    } else {
      return false;
    }
  };

  let typingTimer;
  let doneTypingInterval = 750;

  const handleKeyUp = (data) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => doneTyping(data), doneTypingInterval);
  };

  const handleKeyDown = () => {
    clearTimeout(typingTimer);
  };

  const doneTyping = (data) => {
    console.log("should do sth");
    setSearchLoading(true);
    searchresult
      .read(`/wc/v3/products?search=${data}&status=publish&order=asc`)
      .then((res) => {
        setSearchResult(typeof res.data != "undefined" && res.data);
        setSearchLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    setSearchLoading("first time");
    setSearchResult([]);
  }, [props.open]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      {...props}
      aria-labelledby="max-width-dialog-title"
      classes={{
        paper: classes.dialog,
        root: classes.dialogRoot,
      }}
    >
      <DialogTitle id="max-width-dialog-title" className={classes.dialogTitle}>
        جست و جو ...
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Container maxWidth="sm">
          <Grid container className={classes.container}>
            <TextField
              autoFocus
              margin="dense"
              id="search"
              name="search"
              label="کد محصول"
              type="search"
              variant="outlined"
              fullWidth
              className={classes.searchField}
              onKeyUp={(e) => handleKeyUp(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchResult.length > 0 && !searchLoading ? (
              <TableContainer
                component={Paper}
                className={classes.TableContainer}
              >
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">
                        تصویر محصول
                      </StyledTableCell>
                      <StyledTableCell align="left">محصول</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResult.map((row, index) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          <Avatar
                            src={
                              typeof row.images[0] !== "undefined"
                                ? row.images[0].src
                                : "https://merrix.com/wp-content/uploads/woocommerce-placeholder.png"
                            }
                            alt={
                              typeof row.images[0] !== "undefined"
                                ? row.images[0].alt
                                : null
                            }
                            className={classes.large}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ButtonGroup>
                            <Button
                              aria-label="increase"
                              onClick={() => {
                                const product = {
                                  image: row.images[0].src,
                                  title: row.name,
                                  key: index,
                                  id: row.id,
                                  sku: row.sku,
                                  stock: row.stock_quantity,
                                  new: isNew(row.date_created),
                                };
                                isInCart(product)
                                  ? increase(product)
                                  : addProduct(product);
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <>
                {searchLoading === "first time" ? null : searchLoading ? (
                  <Avatar
                    variant="square"
                    src="/search.gif"
                    className={classes.searchGif}
                  />
                ) : !searchLoading && searchResult.length === 0 ? (
                  <Typography
                    variant="h6"
                    className={classes.searchTitle}
                    align="center"
                  >
                    محصولی یافت نشد
                  </Typography>
                ) : null}
              </>
            )}
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
