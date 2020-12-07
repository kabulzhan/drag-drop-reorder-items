import React from "react";
import { connect } from "react-redux";
import ItemComponent from "./components/Item/Item";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorderItem, reorderWithinCategory } from "./redux/actions";

const ProductList = ({
  items,
  reorderItem,
  reorderWithinCategory,
  location: { pathname },
}) => {
  const style = {
    marginTop: "3rem",
    width: "60vw",
    listStyleType: "none",
  };
  let itemsToRender = null;
  pathname = pathname.slice(1);

  if (pathname) {
    itemsToRender = items
      .filter((item) => item.category === pathname)
      .sort((a, b) => a.indexForCategory - b.indexForCategory);
  } else {
    itemsToRender = items.sort((a, b) => a.indexForAll - b.indexForAll);
  }
  console.log("Product list page has been rendered");
  // console.log(itemsToRender);

  const handleOnDragEnd = (result) => {
    // console.log(result);
    if (pathname) {
      // return console.log("reorderwithincategory");
      return reorderWithinCategory(result, itemsToRender, items);
    }
    reorderItem(result, itemsToRender, pathname);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="products">
        {(provided) => (
          <ul
            style={style}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {itemsToRender.map((item, index) => (
              <Draggable key={item._id} draggableId={item._id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ItemComponent item={item} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => ({
  items: state.items.items,
});

export default connect(mapStateToProps, { reorderItem, reorderWithinCategory })(
  ProductList
);
