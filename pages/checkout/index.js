import React from "react";
import Head from "next/head";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "components/Button";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import citiesImport from "src/services/citiesImport";
import provinceImport from "src/services/provinceImport";
import { CartContext } from "src/helpers/CartContext";
import product from "src/services/crud/products";
import order from "src/services/crud/order";

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
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(13),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 1),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  alert: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(3),
  },
  dialogIcon: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 20,
  },
  actionColor: {
    color: "green",
    fontSize: 50,
  },
  dialogAction: {
    justifyContent: "center",
  },
  dialogTitle: {
    "& h2": {
      fontSize: "1.75rem",
      [specialBreakpoint.breakpoints.down("xs")]: {
        fontSize: "1.3rem",
      },
    },
  },
  okButton: {
    minWidth: 250,
  },
}));

const steps = ["???????????? ??????"];

export default function Checkout() {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [activeStep, setActiveStep] = React.useState(0);
  const { cartItems, handleCheckout } = React.useContext(CartContext);
  const [finalProvince, setFinalProvince] = React.useState("");
  const [finalCities, setFinalCities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [outOfStockProducts, setOutOfStockProducts] = React.useState([]);
  const [phone, setPhone] = React.useState([]);
  const [messageOpen, setMessageOpen] = React.useState(false);

  const selectedProvId = (value) => {
    setFinalProvince(value);
    return provinceImport.filter((e) => e.name === value);
  };

  const selectedCityId = (value) => {
    setFinalCities(citiesImport.filter((e) => e.province_id === value));
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = selectedProvId(e.target.value);
    selectedCityId(selectedProvince[0].id);
  };

  const handleCityChange = (e) => {
    console.log(e.target.value);
  };

  const checkPhone = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const handleMessageOpen = () => {
    setMessageOpen(true);
  };

  const handleMessageClose = () => {
    setMessageOpen(false);
  };

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    setLoading(true);
    setOutOfStockProducts([]);
    console.log(formData);
    let products = [];
    const { data } = await product.read(`/wc/v3/products?per_page=2000`);
    let notAvailableProducts = [];
    cartItems.map((item) => {
      let found = data.find((searchItem) => searchItem.sku === item.sku);
      if (found.stock_quantity < item.quantity)
        notAvailableProducts.push({
          ...item,
          outOfStock: item.quantity - found.stock_quantity,
        });
    });
    setOutOfStockProducts(notAvailableProducts);
    if (notAvailableProducts.length === 0) {
      cartItems.map((item) => {
        products.push({ product_id: item.id, quantity: item.quantity });
      });
      sendData(formData, products);
    } else {
      setLoading(false);
      toast.error("???????? ?????????? ?????? ?????????????? ?????? ?????????????? ????????.");
    }
    console.log("outofstock", notAvailableProducts);
  };

  const sendData = async (data, products) => {
    const finalData = {
      payment_method: "?????????? ??????????",
      payment_method_title: "???????????? ???????????? ??????????",
      set_paid: true,
      billing: {
        first_name: data.firstName,
        last_name: data.lastName,
        address_1: data.address,
        billing_company: data.shopName,
        address_2: "",
        city: data.city,
        company: data.shopName,
        state: data.province,
        postcode: "",
        country: "IR",
        phone: data.phone.toString(),
      },
      shipping: {
        first_name: data.firstName,
        last_name: data.lastName,
        billing_company: data.shopName,
        address_1: data.address,
        address_2: "",
        city: data.city,
        state: data.province,
        company: data.shopName,
        postcode: "",
        country: "IR",
      },
      line_items: products,
    };
    console.log(outOfStockProducts.length);
    try {
      const result = await order.create(
        finalData,
        "/wc/v3/orders?status=processing"
      );
      handleMessageOpen();
      handleCheckout();
      reset();
    } catch (error) {
      toast.error(`?????????? ???? ?????? ?????????? ???? ??????. (${error})`);
    } finally {
      setLoading(false);
    }
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const AlertDialog = () => {
    return (
      <div>
        <Dialog
          open={messageOpen}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <div className={classes.dialogIcon}>
            <CheckCircleIcon fontSize="large" className={classes.actionColor} />
          </div>
          <DialogTitle
            id="alert-dialog-slide-title"
            classes={{
              root: classes.dialogTitle,
            }}
          >
            ?????????? ?????? ???? ???????????? ?????? ????
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              ?????????????? ???? ???? ???????? ?????? ???? ?????? ???????? ??????????????.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            classes={{
              root: classes.dialogAction,
            }}
          >
            <Button
              color="primary"
              onClick={handleMessageClose}
              variant="outlined"
              className={classes.okButton}
            >
              ??????????
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>???????? ???????? (??????????) - ?????? ??????????</title>
      </Head>
      <React.Fragment>
        <main className={classes.layout}>
          {cartItems.length > 0 && (
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                ?????? ??????????
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {outOfStockProducts.length > 0
                ? outOfStockProducts.map((item) => (
                    <Alert severity="error" className={classes.alert}>
                      ???????????? ?????????? ?????????? {item.title} ???? ?????????? {item.outOfStock}{" "}
                      ???????? ???????? ???? ?????????? ???????????? ?????? ????????????
                    </Alert>
                  ))
                : null}
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order
                      confirmation, and will send you an update when your order
                      has shipped.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className={classes.form}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="firstName"
                            label="??????"
                            fullWidth
                            autoComplete="given-name"
                            variant="outlined"
                            {...register("firstName", { required: true })}
                            helperText={
                              errors.firstName ? "?????? ???? ???????? ????????" : null
                            }
                            error={!!errors.firstName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="lastName"
                            label="?????? ????????????????"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            {...register("lastName", { required: true })}
                            helperText={
                              errors.lastName
                                ? "?????? ???????????????? ???? ???????? ????????"
                                : null
                            }
                            error={!!errors.lastName}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="shopName"
                            label="?????? ??????????????"
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="outlined"
                            defaultValue=""
                            {...register("shopName", { required: true })}
                            helperText={
                              errors.shopName
                                ? "?????? ?????????????? ???? ???????? ????????"
                                : null
                            }
                            error={!!errors.shopName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            required
                            error={!!errors.province}
                          >
                            <InputLabel id="province">??????????</InputLabel>
                            <Controller
                              render={({
                                field: { onChange, value, name },
                              }) => (
                                <Select
                                  labelId="province-label"
                                  label="??????????"
                                  onChange={(e) => {
                                    onChange(e);
                                    handleProvinceChange(e);
                                  }}
                                  value={value ? value : ""}
                                  name={name}
                                >
                                  {provinceImport.map((prov) => (
                                    <MenuItem value={prov.name} key={prov.id}>
                                      {prov.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                              name="province"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }}
                            />
                            {errors.province && (
                              <FormHelperText>
                                ?????????? ???????????????? ???????? ????????
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            required
                            error={!!errors.city}
                          >
                            <InputLabel id="city">??????</InputLabel>
                            <Controller
                              render={({
                                field: { onChange, value, name },
                              }) => (
                                <Select
                                  labelId="city-label"
                                  label="??????"
                                  onChange={(e) => {
                                    onChange(e);
                                    handleCityChange(e);
                                  }}
                                  value={value ? value : ""}
                                  name={name}
                                >
                                  {finalCities.map((cities) => (
                                    <MenuItem
                                      value={cities.name}
                                      key={cities.id}
                                    >
                                      {cities.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                              name="city"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }}
                            />
                            {errors.city && (
                              <FormHelperText>
                                ?????? ???????????????? ???????? ????????
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="address"
                            label="????????"
                            fullWidth
                            autoComplete="given-address"
                            variant="outlined"
                            {...register("address", { required: true })}
                            helperText={
                              errors.address ? "???????? ???? ???????? ????????" : null
                            }
                            error={!!errors.address}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="phone"
                            name="phone"
                            label="?????????? ???????????? (?????????? ??????????????)"
                            fullWidth
                            type="tel"
                            autoComplete="given-phone"
                            variant="outlined"
                            value={phone}
                            {...register("phone", {
                              required: true,
                              onChange: (e) => {
                                checkPhone(e);
                              },
                            })}
                            helperText={
                              errors.phone
                                ? "?????????? ?????????? ???? ???? ?????????? ???????? ????????"
                                : null
                            }
                            error={!!errors.phone}
                          />
                        </Grid>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          type="submit"
                          loading={loading}
                        >
                          ?????? ??????????
                        </Button>
                      </Grid>
                    </form>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          )}
          {cartItems.length === 0 && (
            <Typography component="h1" variant="h4" align="center">
              ?????? ?????????????? ?????? ???????? ??????. ???????? ?????????? ?????? ?????????????? ?????? ???? ??????????
              ????????????
            </Typography>
          )}

          <AlertDialog />
        </main>
      </React.Fragment>
    </>
  );
}
