//@@viewOn:imports
import { Utils, createVisualComponent, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import Config from "../config/config.js";
import ListTile from "./listTile.js";

const FILTER_DEFINITION_LIST = [
  {
    key: "archive",
    label: "not-Archived",
    filter: (item, value) => {
      if (value) {
        return item.data.archived === "false";
      }
      return true;
    },
    inputType: "bool",
  },
];

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

const ListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
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
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [activeFilterList, setActiveFilterList] = useState([]);
    const [value, setValue] = useState(false);
    const actionList = [
      { component: <Uu5TilesControls.FilterButton type="bar" /> },
      {
        icon: "uugds-plus",
        children: "Add List",
        significance: "highlighted",

        onClick: () => setCreateModalOpen(true),
      },
    ];

    return (
      <div {...attrs}>
        <Uu5Tiles.ControllerProvider
          data={props.data}
          filterDefinitionList={FILTER_DEFINITION_LIST}
          filterList={activeFilterList}
          onFilterChange={(e) => setActiveFilterList(e.data.filterList)}
        >
          <Uu5Elements.Block
            header={
              <Uu5Elements.Text category="story" segment="heading" type="h3">
                Dashboard Shopping Lists{" "}
                <Uu5Elements.Toggle
                  value={value}
                  onChange={(e) => setValue(e.data.value)}
                  label={<Uu5Elements.Badge>OWNER</Uu5Elements.Badge>}
                  colorScheme="primary"
                />
              </Uu5Elements.Text>
            }
            actionList={actionList}
          >
            <Uu5TilesControls.FilterBar />
            <Uu5TilesElements.Grid tileMinWidth={300} tileMaxWidth={400}>

              {<ListTile hideDeleteIcon={!value} />}

              
            </Uu5TilesElements.Grid>
          </Uu5Elements.Block>{" "}
        </Uu5Tiles.ControllerProvider>

        <Uu5Forms.Form.Provider
          key={createModalOpen}
          // async TO DO

          onSubmit={async (e) => {
            const newList = {
              id: Utils.String.generateId(),
              name: e.data.value.newListName,
              archived: "false",
              items: 0,
            };

            await props.onCreate(newList);
            //props.addToList(newList);
            setCreateModalOpen(false);
          }}
        >
          <Uu5Elements.Modal
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            header="Create New Shopping List"
            footer={
              <>
                <Uu5Forms.CancelButton
                  className={Config.Css.css({ margin: 10 })}
                  icon="uugds-close"
                  onClick={() => setCreateModalOpen(false)}
                >
                  Cancel
                </Uu5Forms.CancelButton>
                <Uu5Forms.SubmitButton icon="uugds-check">Add List</Uu5Forms.SubmitButton>
              </>
            }
          >
            <Uu5Forms.FormText name="newListName" required label="New Shopping List Name: " />
          </Uu5Elements.Modal>
        </Uu5Forms.Form.Provider>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports
