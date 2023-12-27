import { Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config";
import importLsi from "../../lsi/import-lsi.js";

const selectButtonClassName = Config.Css.css`
position: absolute;
top: 0;
right: 0;
display: none;

`;

const tileClassName = ({ selected }) => Config.Css.css`
height: 100px;
border: 3px solid rgb(189, 189, 189);
overflow: hidden;
border-radius: 15px;
position: relative;
display: inline-block;
width: 450px;
margin: 10px;



${
  selected ? `&>.${selectButtonClassName} { display: block; }` : `&:hover>.${selectButtonClassName} { display: block; }`
}
`;

function CustomTile(props) {
  const { item, onToggleSelected, selected } = props;

  return (
    <Uu5Elements.Tile className={tileClassName(item)}>
      <Uu5Elements.ListItem
        colorScheme={selected ? "dark-green" : undefined}
        className={Config.Css.css({ margin: 10, borderRadius: 10 })}
        actionList={[{ icon: "uugds-delete", colorScheme: "red", onClick: props.onDelete }]}
      >
        <Uu5Elements.Button
          className={Config.Css.css({
            width: 40,
            maxWidth: "100%",
            borderRadius: 50,
            marginRight: 15,
            alignItems: "center",
          })}
          /*className={selectButtonClassName}*/
          colorScheme={selected ? "dark-green" : undefined}
          onClick={() => onToggleSelected(item)}
        >
          <Uu5Elements.Icon icon="uugds-check" />
        </Uu5Elements.Button>
        {item.name} {"/"}{" "}
        {
          <Uu5Elements.Badge colorScheme={"dark-blue"} significance={"common"}>
            {" "}
            <Lsi import={importLsi} path={["CreateNewItem", "createdBy"]} /> {item.author}{" "}
          </Uu5Elements.Badge>
        }
      </Uu5Elements.ListItem>
    </Uu5Elements.Tile>
  );
}

export default CustomTile;
