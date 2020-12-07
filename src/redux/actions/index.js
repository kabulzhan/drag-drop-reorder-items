import { ITEMS_RECEIVED } from "./types";
import axios from "axios";
const address = "https://backendforitems.herokuapp.com/items";

export const getItems = () => async (dispatch) => {
  try {
    const response = await axios.get(address);

    dispatch({ type: ITEMS_RECEIVED, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(address, {
      crossdomain: true,
      data: {
        id,
      },
    });
    console.log("Item deleted");
    dispatch({ type: ITEMS_RECEIVED, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const submitItem = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(address, formProps);
    callback();
    console.log(response.data);
    dispatch({ type: ITEMS_RECEIVED, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const reorderItem = (result, itemsToReorder) => async (dispatch) => {
  try {
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    let focalIndex = itemsToReorder[sourceIndex].indexForAll;
    if (destinationIndex > sourceIndex) {
      const itemAfter = itemsToReorder[destinationIndex + 1]
        ? itemsToReorder[destinationIndex + 1].indexForAll
        : itemsToReorder[destinationIndex].indexForAll + 50;
      focalIndex =
        (itemsToReorder[destinationIndex].indexForAll + itemAfter) / 2;
    } else if (destinationIndex < sourceIndex) {
      const itemBefore = itemsToReorder[destinationIndex - 1]
        ? itemsToReorder[destinationIndex - 1].indexForAll
        : itemsToReorder[destinationIndex].indexForAll - 50;
      focalIndex =
        (itemsToReorder[destinationIndex].indexForAll + itemBefore) / 2;
    }
    itemsToReorder[sourceIndex].indexForAll = focalIndex;
    console.log("reorder item action has been fired");
    // console.log(itemsToReorder);
    let req = {};
    req.id = itemsToReorder[sourceIndex]._id;
    req.updateInfo = {
      indexForAll: itemsToReorder[sourceIndex].indexForAll,
    };
    axios.put(address, req);
    dispatch({
      type: ITEMS_RECEIVED,
      payload: Array.from(itemsToReorder),
    });
  } catch (e) {
    console.log(e);
  }
};

export const reorderWithinCategory = (
  result,
  itemsToReorder,
  itemsFromState
) => async (dispatch) => {
  try {
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    let focalIndex = itemsToReorder[sourceIndex].indexForCategory;
    if (destinationIndex > sourceIndex) {
      const itemAfter = itemsToReorder[destinationIndex + 1]
        ? itemsToReorder[destinationIndex + 1].indexForCategory
        : itemsToReorder[destinationIndex].indexForCategory + 50;
      focalIndex =
        (itemsToReorder[destinationIndex].indexForAll + itemAfter) / 2;
    } else if (destinationIndex < sourceIndex) {
      const itemBefore = itemsToReorder[destinationIndex - 1]
        ? itemsToReorder[destinationIndex - 1].indexForCategory
        : itemsToReorder[destinationIndex].indexForCategory - 50;
      focalIndex =
        (itemsToReorder[destinationIndex].indexForCategory + itemBefore) / 2;
    }
    const requiredIndexFromState = itemsFromState.findIndex(
      (item) =>
        item.indexForCategory === itemsToReorder[sourceIndex].indexForCategory
    );
    itemsFromState[requiredIndexFromState].indexForCategory = focalIndex;
    console.log("reorderWithinCategory action has been fired");
    console.log(itemsFromState);
    let req = {};
    req.id = itemsFromState[requiredIndexFromState]._id;
    req.updateInfo = {
      indexForCategory: itemsFromState[requiredIndexFromState].indexForCategory,
    };
    axios.put(address, req);
    dispatch({
      type: ITEMS_RECEIVED,
      payload: Array.from(itemsFromState),
    });
  } catch (e) {
    console.log(e);
  }
};
