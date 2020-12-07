import React from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import AddItem from "./AddItem/AddItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "2rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  horizontalMenu: {
    display: "flex",
  },
  dropdownButton: {
    textTransform: "none",
  },
  link: {
    textDecoration: "none",
  },
}));

function Header(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      openDialog ||
      (anchorRef.current && anchorRef.current.contains(event.target))
    ) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const {
    location: { pathname },
  } = props;
  return (
    <div className={classes.root}>
      <MenuList className={classes.horizontalMenu}>
        <MenuItem component={Link} to={"/"} selected={pathname === "/"}>
          Все
        </MenuItem>
        <MenuItem component={Link} to={"red"} selected={pathname === "/red"}>
          Красный
        </MenuItem>
        <MenuItem component={Link} to={"blue"} selected={pathname === "/blue"}>
          Синий
        </MenuItem>
        <MenuItem
          component={Link}
          to={"green"}
          selected={pathname === "/green"}
        >
          Зелёный
        </MenuItem>
      </MenuList>

      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.dropdownButton}
        >
          Управление
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Button>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener
                  onClickAway={(e) => {
                    handleClose(e);
                  }}
                >
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    <AddItem
                      handleToggle={handleToggle}
                      openDialog={openDialog}
                      setOpenDialog={setOpenDialog}
                    />
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

export default withRouter(Header);
