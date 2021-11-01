import React from "react";
import Head from "next/head";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "components/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import Badge from "@material-ui/core/Badge";
import { CartContext } from "src/helpers/CartContext";
import coupon from "src/services/crud/coupons";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

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

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(13),
    marginBottom: theme.spacing(5),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: "0",
  },
  coupon: {
    marginRight: theme.spacing(2),
    width: "170px",
  },
  couponButton: {
    height: "2.8em",
  },
  goToCheckout: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    width: theme.spacing(30),
    margin: "auto",
  },
  dFlex: {
    display: "flex",
  },
}));

export default function Cart(props) {
  const classes = useStyles();
  const { cartItems, increase, addProduct, decrease, removeProduct } =
    React.useContext(CartContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = React.useState(false);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const selectedCartItem = (id) => {
    return cartItems.filter((e) => e.id === id);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    const result = await coupon.read(`/wc/v3/coupons?code=${data.coupon}`);
    setLoading(false);
    result.data.length > 0
      ? toast.success("کد تخفیف اعمال شد")
      : toast.error("کد تخفیف صحیح نیست");
  };

  return (
    <>
      <Head>
        <title>شرکت مریخ (لوتوس) - ویرایش سفارش</title>
      </Head>

      <React.Fragment>
        <Container maxWidth="md">
          <Typography variant="h5" component="h1" className={classes.title}>
            ویرایش سفارش
          </Typography>
          {cartItems.length > 0 ? (
            <React.Fragment>
              <TableContainer component={Paper}>
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
                    {cartItems.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          <Badge
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            badgeContent={row.quantity}
                            color="secondary"
                          >
                            <Avatar
                              alt={row.title}
                              src={
                                typeof row !== "undefined"
                                  ? row?.image[0].src
                                  : null
                              }
                              className={classes.large}
                            />
                          </Badge>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.title}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ButtonGroup orientation="vertical">
                            <Button
                              aria-label="increase"
                              size="small"
                              onClick={() => {
                                increase(row);
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                            {isInCart(row) && (
                              <Button
                                aria-label="reduce"
                                size="small"
                                onClick={() => {
                                  selectedCartItem(row.id)[0].quantity === 1
                                    ? removeProduct(row)
                                    : decrease(row);
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </Button>
                            )}
                            <Button
                              aria-label="remove"
                              size="small"
                              onClick={() => {
                                removeProduct(row);
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                  <caption>
                    <form
                      className={classes.root}
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <TextField
                        id="coupon"
                        label="افزودن کد تخفیف"
                        variant="outlined"
                        size="small"
                        className={classes.coupon}
                        {...register("coupon", {
                          required: "پر کردن این فیلد اجباری است",
                        })}
                        helperText={
                          errors.coupon ? "کد تخفیف را وارد کنید" : null
                        }
                        error={!!errors.coupon}
                        required
                      />
                      <Button
                        variant="outlined"
                        type="submit"
                        className={classes.couponButton}
                        loading={loading}
                      >
                        اعمال
                      </Button>
                    </form>
                  </caption>
                </Table>
              </TableContainer>
              <Grid container spacing={3} className={classes.dFlex}>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    onClick={() => history.push(`/checkout`)}
                    className={classes.goToCheckout}
                  >
                    ثبت سفارش
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            <Typography variant="body1" component="p" align="center">
              سبد سفارشات خالی است
            </Typography>
          )}
        </Container>
      </React.Fragment>
    </>
  );
}
