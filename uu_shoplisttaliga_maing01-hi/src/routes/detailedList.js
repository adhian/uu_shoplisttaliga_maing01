//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ListWrapper from "../core/ShoppingList/ListWrapper.js";
import Uu5Elements from "uu5g05-elements";

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

let DetailedList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailedList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    return (
      <div {...attrs}>
        <Uu5Elements.Link href="home">Home</Uu5Elements.Link>
        <ListWrapper />
      </div>
    );
    //@@viewOff:render
  },
});

DetailedList = withRoute(DetailedList, { authenticated: true });

//@@viewOn:exports
export { DetailedList };
export default DetailedList;
//@@viewOff:exports
