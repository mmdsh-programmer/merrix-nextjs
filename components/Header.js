import React from "react";
import Link from "next/link";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Badge } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { CartContext } from "../src/helpers/CartContext";
import { FilterContext } from "src/helpers/FilterContext";
import Search from "./Search";
import pages from "../src/pages";

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
  root: {
    flexGrow: 1,
    "&$selected": {
      backgroundColor: "red",
      "&:hover": {
        backgroundColor: "yellow",
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  bottomMargin: {
    marginBottom: theme.spacing(8),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  flexNav: {
    display: "flex",
    margin: "auto",
    padding: 0,
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navItem: {
    width: "auto",
    minHeight: 76,
    "&:hover $primaryListItemText": {
      opacity: 1,
      height: "auto",
    },
    "&:hover $secondaryListItemText": {
      opacity: 0,
      height: 0,
      overflow: "hidden",
    },
  },
  avatar: {
    width: "55px",
    height: "55px",
    borderRadius: "0",
    marginRight: "7px",
  },
  secondaryItemText: {
    marginTop: "10px",
  },
  mrAuto: {
    marginRight: "auto",
  },
  styledButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  drawerButton: {
    margin: "5px 0",
  },
  active: {
    backgroundColor: "red",
  },
  dialogAppBar: {
    position: "relative",
    backgroundColor: "rgb(70,70,70)",
  },
  searchField: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    borderRadius: "0",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  cartEmptyText: {
    marginTop: theme.spacing(3),
  },
  mobileMenuIcon: {
    [specialBreakpoint.breakpoints.up("md")]: {
      display: "none",
    },
    [specialBreakpoint.breakpoints.down("sm")]: {
      marginRight: "0",
    },
  },
  merrixLogo: {
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  sortButton: {
    margin: theme.spacing(3),
    position: "fixed",
    bottom: "0",
    right: "0",
    zIndex: 999,
  },
  sortIcon: {
    marginTop: "13px",
    marginRight: "10px",
  },
  mainAppBar: {
    backgroundColor: "rgb(70,70,70)",
  },
  navItemText: {
    textAlign: "center",
  },
  square: {
    width: "140px",
    height: "auto",
    borderRadius: 0,
  },
  link: {
    [specialBreakpoint.breakpoints.down("sm")]: {
      margin: "auto",
    },
  },
  flex: {
    display: "flex",
  },
  stickyButtonGroup: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "#f7f7f7",
    zIndex: 1,
  },
  primaryListItemText: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: "visibility 0.5s, opacity 0.5s linear",
  },
  secondaryListItemText: {
    opacity: 1,
    height: "auto",
    transition: "visibility 0.5s, opacity 0.5s linear",
  },
  verticalDivider: {
    backgroundColor: "#FFF",
    height: 20,
    alignSelf: "center",
    margin: "0 10px",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  mobileHide: {
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const [auth, setAuth] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [loadCartCount, setLoadCartCount] = React.useState(true);
  const { setFilter } = React.useContext(FilterContext);

  const [openSearch, setOpenSearch] = React.useState(false);
  const { cartItems, itemCount, removeProduct } = React.useContext(CartContext);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleDrawerOpen = () => {
    setState((prevState) => ({ ...prevState, mainMenuOpen: true }));
  };

  const handleDrawerClose = () => {
    setState((prevState) => ({ ...prevState, mainMenuOpen: false }));
  };

  const filterCategories = (array, id) => {
    return array.filter((e) => e.parent === id);
  };

  const handleSearchOpen = () => {
    setOpenSearch(!openSearch);
  };

  const handleSearchClose = () => {
    setOpenSearch(false);
  };

  const splitTitle = (title) => {
    return title.split("-");
  };

  const emptyFilter = () => {
    setFilter({
      materials: [],
      sizes: [],
      style: [],
      usage: [],
    });
  };

  React.useEffect(() => {
    setLoadCartCount(false);
  }, []);

  return (
    <div className={classes.bottomMargin}>
      <AppBar position="absolute" className={classes.mainAppBar}>
        <Toolbar>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
            }}
            onClick={handleDrawerOpen}
            className={[classes.mrAuto, classes.mobileMenuIcon].join(" ")}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" onClick={() => emptyFilter()}>
            <a className={classes.link}>
              <Avatar alt="logo" src="/logo.png" className={classes.square} />
            </a>
          </Link>

          <List component="nav" className={classes.flexNav}>
            {pages.map((item, index) => (
              <Link
                href={`/categories/${item.id}/${encodeURIComponent(
                  item.pageName
                )}`}
                key={index}
              >
                <a className={classes.navLink}>
                  <ListItem
                    button
                    key={index}
                    className={[
                      classes.navItem,
                      { selected: classes.active },
                      "mobile-version",
                    ].join(" ")}
                    onClick={(e) => {
                      emptyFilter();
                    }}
                  >
                    <ListItemText
                      className={classes.navItemText}
                      primary={
                        <Typography
                          style={{ color: "white" }}
                          className={classes.primaryListItemText}
                        >
                          {splitTitle(item.pageName)[0]}
                        </Typography>
                      }
                      secondaryTypographyProps={{
                        style: {
                          color: "white",
                        },
                      }}
                      secondary={
                        <Typography
                          style={{ color: "white" }}
                          className={classes.secondaryListItemText}
                        >
                          {splitTitle(item.pageName).length > 1
                            ? splitTitle(item.pageName)[1]
                            : null}
                        </Typography>
                      }
                    />
                  </ListItem>
                </a>
              </Link>
            ))}
            <Link href={`/size-guide`}>
              <a className={classes.navLink}>
                <ListItem
                  button
                  className={[
                    classes.navItem,
                    { selected: classes.active },
                    "mobile-version",
                  ].join(" ")}
                  onClick={(e) => {
                    emptyFilter();
                  }}
                >
                  <ListItemText
                    className={classes.navItemText}
                    primary={
                      <Typography
                        style={{ color: "#17b0de" }}
                        className={classes.primaryListItemText}
                      >
                        SIZE GUIDE
                      </Typography>
                    }
                    secondary={
                      <Typography
                        style={{ color: "#17b0de" }}
                        className={classes.secondaryListItemText}
                      >
                        راهنمای سایز محصولات
                      </Typography>
                    }
                  />
                </ListItem>
              </a>
            </Link>
          </List>
          <Search open={openSearch} onClose={handleSearchClose} />

          {auth && (
            <div className={classes.flex}>
              <div className={[classes.flex, classes.mobileHide].join(" ")}>
                <IconButton
                  color="inherit"
                  aria-label="telegram"
                  onClick={() =>
                    window.open("https://t.me/merrix9111", "_blank")
                  }
                >
                  <TelegramIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="whatsapp"
                  onClick={() =>
                    window.open("https://wa.me/989357249111", "_blank")
                  }
                >
                  <WhatsAppIcon />
                </IconButton>
                <Divider
                  orientation="vertical"
                  className={classes.verticalDivider}
                />
              </div>
              <IconButton
                color="inherit"
                aria-label="search"
                onClick={handleSearchOpen}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="add to shopping cart"
                onClick={toggleDrawer(["right"], true)}
              >
                <Badge
                  badgeContent={loadCartCount ? 0 : itemCount}
                  max={2000}
                  color="secondary"
                >
                  <LocalMallOutlinedIcon />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          className={classes.cartDrawer}
        >
          <List className={classes.list}>
            {cartItems.length > 0 ? (
              cartItems.map((value, index) => (
                <ListItem button key={value.id}>
                  <ListItemAvatar>
                    <Badge
                      badgeContent={value.quantity}
                      max={2000}
                      color="secondary"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <Avatar
                        alt={value.title}
                        src={
                          typeof value.image !== undefined &&
                          value?.image[0].src
                        }
                        className={classes.avatar}
                      />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="p"
                        variant="body1"
                        color="textPrimary"
                      >
                        {value.title}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        removeProduct(value);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <Typography
                variant="body1"
                component="p"
                align="center"
                className={classes.cartEmptyText}
              >
                سبد سفارشات خالی است
              </Typography>
            )}
            {cartItems.length > 0 && (
              <ListItem className={classes.stickyButtonGroup}>
                <div className={classes.styledButton}>
                  <Link href="/cart">
                    <Button
                      className={classes.drawerButton}
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setState({ right: false });
                        console.log(state.right);
                      }}
                    >
                      ویرایش سفارش
                    </Button>
                  </Link>
                  <Link href="/checkout">
                    <Button
                      className={classes.drawerButton}
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setState({ right: false });
                        console.log(state.right);
                      }}
                    >
                      ثبت سفارش
                    </Button>
                  </Link>
                </div>
              </ListItem>
            )}
          </List>
        </Drawer>
        <Drawer
          anchor="left"
          open={state.mainMenuOpen}
          onClose={handleDrawerClose}
          className={classes.menuDrawer}
        >
          <List className={classes.list}>
            <div className={[classes.flex, classes.justifyCenter].join(" ")}>
              <IconButton
                color="inherit"
                aria-label="telegram"
                onClick={() => window.open("https://t.me/merrix9111", "_blank")}
              >
                <TelegramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="whatsapp"
                onClick={() =>
                  window.open("https://wa.me/989357249111", "_blank")
                }
              >
                <WhatsAppIcon />
              </IconButton>
            </div>
            <Link href="/">
              <a className={classes.navLink}>
                <ListItem
                  button
                  selected={selectedIndex === 4}
                  onClick={(event) => {
                    handleListItemClick(event, 4);
                    emptyFilter();
                    handleDrawerClose();
                  }}
                >
                  <ListItemText primary="صفحه اصلی" />
                </ListItem>
              </a>
            </Link>
            {pages.map((item, index) => (
              <React.Fragment key={index}>
                <Link href={`/categories/${item.id}/${item.pageName}`}>
                  <a className={classes.navLink}>
                    <ListItem
                      button
                      key={index}
                      className={[
                        classes.navItem,
                        { selected: classes.active },
                      ].join(" ")}
                      onClick={(e) => {
                        //handleDropDownOpen(e);
                        emptyFilter();
                        handleDrawerClose();
                      }}
                    >
                      <ListItemText primary={item.pageName} />
                    </ListItem>
                  </a>
                </Link>
              </React.Fragment>
            ))}
            <Link href="/size-guide">
              <a className={classes.navLink}>
                <ListItem
                  button
                  className={[
                    classes.navItem,
                    { selected: classes.active },
                  ].join(" ")}
                  onClick={(e) => {
                    handleDrawerClose();
                    emptyFilter();
                  }}
                >
                  <ListItemText
                    primary={"راهنمای سایز محصولات"}
                    primaryTypographyProps={{
                      style: {
                        color: "#17b0de",
                      },
                    }}
                  />
                </ListItem>
              </a>
            </Link>
          </List>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
