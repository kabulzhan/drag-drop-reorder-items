import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import SelectCategory from "./SelectCategory";
import ImageUpload from "./ImageUpload";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

function FormDialog(props) {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [imageToUpload, setImageToUpload] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    props.setOpenDialog(true);
  };

  const handleClose = () => {
    props.setOpenDialog(false);
    props.handleToggle();
  };

  const handleSubmit = () => {
    const formProps = { name, price, qty, category, imageToUpload };
    let valid = true;
    let errorsToSend = { ...errors };
    for (const property in formProps) {
      if (!formProps[property]) {
        valid = false;
        errorsToSend[`${property}Error`] = true;
        errorsToSend[`${property}ErrorMessage`] = "Обязательное поле";
      }
    }
    if (!valid) return setErrors(errorsToSend);
    setLoading(true);
    props.submitItem(formProps, handleClose);
  };

  const [errors, setErrors] = React.useState({
    priceError: false,
    priceErrorMessage: "",
    qtyError: false,
    qtyErrorMessage: "",
  });
  const validateInput = {
    validateName(e) {
      setErrors({
        ...errors,
        nameError: false,
        nameErrorMessage: "",
      });
      setName(e.target.value);
    },
    validatePriceNumber(e) {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          priceError: true,
          priceErrorMessage: "Должно быть числовое значение",
        });
        return setPrice("");
      }
      setErrors({
        ...errors,
        priceError: false,
        priceErrorMessage: "",
      });
      setPrice(e.target.value);
    },
    validateQtyNumber(e) {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          qtyError: true,
          qtyErrorMessage: "Должно быть числовое значение",
        });
        return setQty("");
      }
      setErrors({
        ...errors,
        qtyError: false,
        qtyErrorMessage: "",
      });
      setQty(e.target.value);
    },
    validateCategory(value) {
      setErrors({
        ...errors,
        categoryError: false,
        categoryErrorMessage: "",
      });
      setCategory(value);
    },
  };
  return (
    <div>
      <MenuItem onClick={handleClickOpen}>Добавить товар</MenuItem>
      <Dialog
        open={props.openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Добавить товар
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Название"
            type="text"
            fullWidth
            value={name}
            onInput={validateInput.validateName}
            error={errors.nameError}
            helperText={errors.nameErrorMessage}
          />
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <TextField
              value={price}
              margin="normal"
              id="price"
              type="number"
              fullWidth
              label="Цена"
              helperText={errors.priceErrorMessage}
              onInput={validateInput.validatePriceNumber}
              error={errors.priceError}
            />
            <span style={{ marginLeft: "1rem" }}>руб.</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <TextField
              value={qty}
              margin="normal"
              id="qty"
              type="number"
              fullWidth
              label="Количество"
              helperText={errors.qtyErrorMessage}
              onInput={validateInput.validateQtyNumber}
              error={errors.qtyError}
            />
            <span style={{ marginLeft: "1rem" }}>шт.</span>
          </div>
          <SelectCategory
            category={category}
            setCategory={validateInput.validateCategory}
            error={errors.categoryError}
            helperText={errors.categoryErrorMessage}
          />
          <ImageUpload
            imageToUpload={imageToUpload}
            setImageToUpload={setImageToUpload}
            error={errors.imageToUploadError}
          />
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button onClick={handleSubmit} color="primary">
                Добавить
              </Button>
              <Button onClick={handleClose} color="secondary">
                Отмена
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(null, actions)(FormDialog);
