//@@viewOn:imports
import { Utils, createVisualComponent, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "../config/config.js";

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

const ListTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [archivedDialogOpen, setArchivedDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const actionList = props.hideDeleteIcon
      ? []
      : props.data.data.archived === "true"
      ? [
          {
            icon: "uugdsstencil-uiaction-archive",
            colorScheme: "green",
            tooltip: "Archived List",
            onClick: () => setArchivedDialogOpen(true),
          },
          { icon: "uugds-refresh", colorScheme: "primary", onClick: () => setUpdateDialogOpen(true) },
          { icon: "uugds-delete", colorScheme: "red", onClick: () => setDeleteDialogOpen(true) },
        ]
      : [
          {
            icon: "uugdsstencil-uiaction-archive",
            colorScheme: "neutral",
            tooltip: "Not Archived List",
            onClick: () => setArchivedDialogOpen(true),
          },
          { icon: "uugds-refresh", colorScheme: "primary", onClick: () => setUpdateDialogOpen(true) },
          { icon: "uugds-delete", colorScheme: "red", onClick: () => setDeleteDialogOpen(true) },
        ];

    return (
      <div>
        <Uu5TilesElements.Tile
          borderRadius="expressive"
          header={props.data.data.name}
          displayActionList={true}
          actionList={actionList}
          headerSignificance="highlighted"
          height={100}
          footer={
            <Uu5Elements.Link href="detailedList" colorScheme="dark-blue" significance="subdued">
              Detail of {props.data.data.name}{" "}
            </Uu5Elements.Link>
          }
        >
          Items to complet: {props.data.data.items}
        </Uu5TilesElements.Tile>

        <Uu5Elements.Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          header="Do you want delete?"
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
          info={props.data.data.name}
          actionList={[
            {
              children: "Delete",
              colorScheme: "negative",
              significance: "highlighted",
              icon: "uugds-delete",
              onClick: () => props.data.handlerMap.delete(),
            },
            { children: "Cancel", icon: "uugds-close", onClick: () => setDeleteDialogOpen(false) },
          ]}
        ></Uu5Elements.Dialog>

        <Uu5Elements.Dialog
          open={archivedDialogOpen}
          onClose={() => setArchivedDialogOpen(false)}
          header="Do you want archive this list?"
          icon={<Uu5Elements.Svg code="uugdssvg-svg-document" />} //todo find archive icon
          info={props.data.data.name}
          actionList={[
            {
              children: "Archive List",
              colorScheme: "green",
              significance: "highlighted",
              icon: "uugdsstencil-uiaction-archive",
              onClick: () => props.data.handlerMap.update(),
            },
            { children: "Cancel", icon: "uugds-close", onClick: () => setArchivedDialogOpen(false) },
          ]}
        ></Uu5Elements.Dialog>

        <Uu5Elements.Dialog
          open={updateDialogOpen}
          onClose={() => setUpdateDialogOpen(false)}
          header="Do you want update this list?"
          icon={<Uu5Elements.Svg code="uugdssvg-svg-document" />} //todo find update icon
          info={props.data.data.name}
          actionList={[
            {
              children: "Update List",
              colorScheme: "primary",
              significance: "highlighted",
              icon: "uugds-refresh",
              onClick: () => props.data.handlerMap.update(),
            },
            { children: "Cancel", icon: "uugds-close", onClick: () => setUpdateDialogOpen(false) },
          ]}
        ></Uu5Elements.Dialog>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListTile };
export default ListTile;
//@@viewOff:exports
