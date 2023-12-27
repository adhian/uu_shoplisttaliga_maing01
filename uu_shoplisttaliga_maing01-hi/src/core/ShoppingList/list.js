import { useCallback, useDataController, useDataSelection, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import config from "../config/config";
import CustomTile from "./customTile";
import importLsi from "../../lsi/import-lsi.js";

function List({ showNotSelected, handleDelete }) {
  let { displayedData } = useDataController();
  let { isSelected, addSelected, removeSelected } = useDataSelection();
  let toggleSelected = useCallback(
    (itemData) => (isSelected(itemData) ? removeSelected(itemData) : addSelected(itemData)),
    [isSelected, addSelected, removeSelected]
  );

  let itemsToDisplay = showNotSelected
    ? displayedData.filter((item) => !isSelected(item)) // Filter not selected items
    : displayedData; // Display all items

  return itemsToDisplay.length > 0 ? (
    <div>
      {itemsToDisplay.map((item) =>
        item ? (
          <CustomTile
            item={item}
            key={item.id}
            name={item.name}
            selected={isSelected(item)}
            onToggleSelected={toggleSelected}
            onDelete={() => handleDelete(item.id)}
          />
        ) : null
      )}
    </div>
  ) : (
    <div>
      <Uu5Elements.Block
        className={config.Css.css({ width: 400, width: "100%" })}
        header={
          <Uu5Elements.Text category="story" segment="heading" type="h2">
            <Lsi import={importLsi} path={["CreateNewItem", "noItem"]} />
          </Uu5Elements.Text>
        }
      ></Uu5Elements.Block>
    </div>
  );
}

export default List;
