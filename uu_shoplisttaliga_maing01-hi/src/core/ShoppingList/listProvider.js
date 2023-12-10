//@@viewOn:imports
import { Utils, createComponent, useDataList, useState, useEffect } from "uu5g05";
import Calls from "calls";
import Config from "../config/config.js";
import Uu5Elements from "uu5g05-elements";
import ListView from "./listView.js";

//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: 32,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const dataList = useDataList({
      handlerMap: {
        load: Calls.loadShoppingLists,
        create: Calls.createShoppingList,
      },
      itemHandlerMap: {
        delete: Calls.deleteShoppingList,
        update: Calls.updateShoppingList,
      },
    });

 /*    const [data, setData] = useState(dataList.data);

    const addToList = (newList) => {
      console.log("Adding new list: ", newList);
      const updatedData = [...data, newList];
      setData(updatedData);
      console.log("Updated data: ", updatedData);
    };
    useEffect(() => {
      setData(dataList.data);
    }, [dataList.data]);
 */

    let result;

    switch (dataList.state) {
      case "pendingNoData":
        result = <Uu5Elements.Pending size="max" />;
        break;
      case "itemPending":
        result = <Uu5Elements.Pending size="max" />;
        break;
      case "error":
        result = <Uu5Elements.Alert header="Cannot create Shopping list" priority="error" />;
        break;
      case "errorNoData":
        result = <Uu5Elements.Alert header="Data for Shopping List cannot be loaded" priority="error" />;
        break;

      default:
        if ("ready")
          result = <ListView data={dataList.data} onCreate={dataList.handlerMap.create} /* addToList={addToList} */ />;
        else {
          console.error("Not known state", dataList.state);
          result = "ERROR";
        }
    }

    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return result;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
