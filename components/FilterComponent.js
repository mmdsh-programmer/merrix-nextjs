import React, { memo, useEffect } from "react";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { FilterContext } from "src/helpers/FilterContext";
import Toolbar from "@material-ui/core/Toolbar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import TuneIcon from "@material-ui/icons/Tune";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import _without from "lodash/without";
import productsFilters from "src/services/filters/productsFilter";

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
  sortButton: {
    margin: theme.spacing(3),
    position: "fixed",
    bottom: "0",
    right: "0",
    zIndex: 999,
    backgroundColor: "rgb(70,70,70)",
    "&:hover": {
      backgroundColor: "rgb(70,70,70)",
    },
    "&:active": {
      backgroundColor: "rgb(70,70,70)",
    },
  },
  sortIcon: {
    marginTop: "13px",
    marginRight: "10px",
  },
  filterDrawerContainer: {
    width: 300,
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  slider: {
    minWidth: 250,
    maxWidth: 250,
    alignSelf: "center",
    margin: theme.spacing(4),
    marginTop: theme.spacing(6),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  filterBar: {
    backgroundColor: "rgb(240,240,240)",
    marginBottom: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    position: "sticky",
    top: "0",
    zIndex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  formControl: {
    minWidth: "100%",
    maxWidth: 300,
    margin: theme.spacing(2),
    marginTop: 0,
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileFormControl: {
    minWidth: 210,
    maxWidth: 300,
    margin: theme.spacing(2),
    marginTop: 0,
  },
  openSizeButton: {
    width: "200px",
    height: "auto",
    backgroundColor: "transparent",
    border: "1px solid rgba(0, 0, 0, 0.27)",
    color: "rgba(0, 0, 0, 0.5)",
    boxShadow: "none",
    fontSize: "1rem",
    margin: theme.spacing(2),
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgba(0, 0, 0, 0.5)",
      border: "1px solid rgba(0, 0, 0, 0.57)",
      boxShadow: "none",
    },
  },
  buttonContainer: {
    backgroundColor: "#fcfcfc",
    position: "sticky",
    bottom: "0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  submit: {
    margin: theme.spacing(1),
  },
  mobileFilterButton: {
    minWidth: 250,
    maxWidth: 450,
    [specialBreakpoint.breakpoints.up("md")]: {
      display: "none",
    },
  },
  container: {
    marginTop: theme.spacing(10),
  },
  fixedSubmitContainer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  fixedSubmit: {
    borderRadius: 0,
    minHeight: 50,
  },
  mobileFilterToolbar: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(10),
    justifyContent: "center",
  },
  dFlex: {
    display: "flex",
    justifyContent: "center",
  },
  filterGridContainer: {
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  getContentAnchorEl: null,
};

function FilterComponent(props) {
  const classes = useStyles();
  const [openMobileFilter, setOpenMobileFilter] = React.useState(false);
  const { setFilter, filter } = React.useContext(FilterContext);
  const defaultFilterText = "همه";
  const [material, setMaterial] = React.useState(
    filter.materials.length ? [...filter.materials] : [defaultFilterText]
  );
  const [size, setSize] = React.useState(
    filter.sizes.length ? [...filter.sizes] : [defaultFilterText]
  );

  const [{ xwrap }, { xbox }, { xbag }, { xmemo }, { tissue }] =
    productsFilters;
  const { slug } = props;

  const handleSelectedItem = (selectedItem) => {
    const [{ sizes } = {}] = [
      ...checkSlug().filter(({ material }) => material === selectedItem),
    ];
    return sizes || [...Array.from({ length: 18 }, (_, i) => i + 1)];
  };

  const checkSlug = () => {
    switch (slug) {
      case "X WRAP | کادوپیچ":
        return xwrap;
      case "X BOX | باکس":
        return xbox;
      case "X BAG | بگ":
        return xbag;
      case "TISSUE BOX | باکس دستمال کاغذی":
        return tissue;
      case "X MEMO | دفترچه":
        return xmemo;
      default:
        return null;
    }
  };

  const hasSize = () => {
    switch (slug) {
      case "X BOX | باکس":
      case "X BAG | بگ":
      case "TISSUE BOX | باکس دستمال کاغذی":
      case "X MEMO | دفترچه":
        return true;
      case "X WRAP | کادوپیچ":
      default:
        return false;
    }
  };

  const [selectedSizes, setSelectedSizes] = React.useState(
    filter?.materials?.length
      ? [...handleSelectedItem(filter.materials)]
      : [...Array.from({ length: 18 }, (_, i) => i + 1)]
  );

  const handleSingleSelectChange = (select, event) => {
    const {
      value: [, selectedItem],
    } = { ...event.target };

    console.log(selectedItem);

    switch (select) {
      case "material": {
        setSelectedSizes(handleSelectedItem(selectedItem));
        setMaterial([selectedItem || defaultFilterText]);
        setSize([defaultFilterText]);
        break;
      }

      case "size": {
        setSize([selectedItem || defaultFilterText]);
        break;
      }

      default:
        break;
    }
  };

  const handleSubmit = () => {
    setFilter({
      ...filter,
      materials: material.includes(defaultFilterText) ? [] : material,
      sizes: size.includes(defaultFilterText) ? [] : size,
    });
  };

  const handleMobileFilterOpen = () => {
    setOpenMobileFilter(true);
  };

  const handleMobileFilterClose = () => {
    setOpenMobileFilter(false);
  };

  const handleChipDelete = (e, value, destination) => {
    e.preventDefault();
    switch (destination) {
      case "material": {
        setFilter({
          ...filter,
          materials: material.length === 1 ? [] : _without(material, value),
        });
        break;
      }
      case "size": {
        setFilter({
          ...filter,
          sizes: size.length === 1 ? [] : _without(size, value),
        });
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    const [initialSelectedSizes] =
      checkSlug().filter((item) => item.material === filter.materials[0]) || [];
    setSelectedSizes(
      initialSelectedSizes?.sizes || [
        ...Array.from({ length: 18 }, (_, i) => i + 1),
      ]
    );
  }, []);

  return (
    <React.Fragment>
      {checkSlug().length > 0 ? (
        <Toolbar className={classes.filterBar}>
          {/* ----------------mobile filters-------------------- */}
          <Button
            variant="outlined"
            color="default"
            className={classes.mobileFilterButton}
            startIcon={<TuneIcon />}
            onClick={handleMobileFilterOpen}
          >
            فیلتر ها
          </Button>
          <Dialog
            fullScreen
            open={openMobileFilter}
            onClose={handleMobileFilterClose}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleMobileFilterClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  فیلتر ها
                </Typography>
              </Toolbar>
            </AppBar>

            <Toolbar className={classes.mobileFilterToolbar}>
              {checkSlug().length > 0 && (
                <FormControl className={classes.mobileFormControl} fullWidth>
                  <InputLabel id="demo-mutiple-checkbox-label">نوع</InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={material}
                    onChange={(e) => handleSingleSelectChange("material", e)}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={value === "ویلو" ? "ویلو (مخمل)" : value}
                                className={classes.chip}
                                clickable
                                deleteIcon={
                                  value !== defaultFilterText ? (
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  ) : (
                                    <CheckCircleIcon
                                      onMouseDown={(event) => {
                                        event.stopPropagation();
                                        handleSubmit();
                                      }}
                                    />
                                  )
                                }
                                onDelete={(e) =>
                                  handleChipDelete(e, value, "material")
                                }
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {checkSlug().map(({ material: name }, index) => (
                      <MenuItem key={index} value={name}>
                        <FormControlLabel
                          control={<Radio />}
                          checked={material.indexOf(name) > -1}
                        />
                        <ListItemText
                          primary={name === "ویلو" ? "ویلو (مخمل)" : name}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {hasSize() && selectedSizes.length > 0 && (
                <FormControl className={classes.mobileFormControl} fullWidth>
                  <InputLabel id="size-mutiple-checkbox-label">سایز</InputLabel>
                  <Select
                    labelId="size-mutiple-checkbox-label"
                    id="size-mutiple-checkbox"
                    multiple
                    value={size}
                    onChange={(e) => handleSingleSelectChange("size", e)}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={
                                  value !== defaultFilterText
                                    ? `سایز ${value}`
                                    : value
                                }
                                className={classes.chip}
                                clickable
                                deleteIcon={
                                  value !== defaultFilterText ? (
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  ) : (
                                    <CheckCircleIcon
                                      onMouseDown={(event) => {
                                        event.stopPropagation();
                                        handleSubmit();
                                      }}
                                    />
                                  )
                                }
                                onDelete={(e) =>
                                  handleChipDelete(e, value, "size")
                                }
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {!selectedSizes.includes(defaultFilterText) &&
                      selectedSizes.map((name, index) => (
                        <MenuItem key={index} value={name}>
                          <FormControlLabel
                            control={<Radio />}
                            checked={size.indexOf(name) > -1}
                          />
                          <ListItemText primary={`سایز ${name}`} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            </Toolbar>

            <div className={classes.fixedSubmitContainer}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<TuneIcon />}
                onClick={handleMobileFilterOpen}
                fullWidth
                className={classes.fixedSubmit}
                onClick={() => {
                  handleSubmit();
                  handleMobileFilterClose();
                }}
              >
                اعمال فیلتر ها
              </Button>
            </div>
          </Dialog>

          {/* ----------------desktop filters-------------------- */}
          <Grid container spacing={2} className={classes.filterGridContainer}>
            {checkSlug().length > 0 && (
              <Grid item xs={12} sm={4} md={3} className={classes.dFlex}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label">نوع</InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    value={material}
                    multiple
                    onChange={(e) => handleSingleSelectChange("material", e)}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={value === "ویلو" ? "ویلو (مخمل)" : value}
                                className={classes.chip}
                                clickable
                                deleteIcon={
                                  value !== defaultFilterText ? (
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  ) : (
                                    <CheckCircleIcon
                                      onMouseDown={(event) => {
                                        event.stopPropagation();
                                        handleSubmit();
                                      }}
                                    />
                                  )
                                }
                                onDelete={(e) =>
                                  handleChipDelete(e, value, "material")
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  value === defaultFilterText && handleSubmit();
                                }}
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {checkSlug().map(({ material: name }, index) => (
                      <MenuItem key={index} value={name}>
                        <FormControlLabel
                          control={<Radio />}
                          checked={material.indexOf(name) > -1}
                        />
                        <ListItemText
                          primary={name === "ویلو" ? "ویلو (مخمل)" : name}
                        />
                      </MenuItem>
                    ))}
                    <div className={classes.buttonContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                      >
                        اعمال
                      </Button>
                    </div>
                  </Select>
                </FormControl>
              </Grid>
            )}
            {hasSize() && selectedSizes.length > 0 && (
              <Grid item xs={12} sm={4} md={3} className={classes.dFlex}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="size-mutiple-checkbox-label">سایز</InputLabel>
                  <Select
                    labelId="size-mutiple-checkbox-label"
                    id="size-mutiple-checkbox"
                    multiple
                    value={size}
                    onChange={(e) => handleSingleSelectChange("size", e)}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={
                                  value !== defaultFilterText
                                    ? `سایز ${value}`
                                    : value
                                }
                                className={classes.chip}
                                clickable
                                deleteIcon={
                                  value !== defaultFilterText ? (
                                    <CancelIcon
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  ) : (
                                    <CheckCircleIcon
                                      onMouseDown={(event) => {
                                        event.stopPropagation();
                                        handleSubmit();
                                      }}
                                    />
                                  )
                                }
                                onDelete={(e) =>
                                  handleChipDelete(e, value, "size")
                                }
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {!selectedSizes.includes(defaultFilterText) &&
                      selectedSizes.map((name, index) => (
                        <MenuItem key={index} value={name}>
                          <FormControlLabel
                            control={<Radio />}
                            checked={size.indexOf(name) > -1}
                          />
                          <ListItemText primary={`سایز ${name}`} />
                        </MenuItem>
                      ))}
                    <div className={classes.buttonContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                      >
                        اعمال
                      </Button>
                    </div>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      ) : null}
    </React.Fragment>
  );
}

export default memo(FilterComponent);
