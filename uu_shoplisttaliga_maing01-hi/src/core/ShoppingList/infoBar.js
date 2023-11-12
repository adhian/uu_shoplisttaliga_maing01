import { useDataController, useDataSelection } from "uu5g05";
import Uu5Elements from "uu5g05-elements";

import Config from "../config/config";

function InfoBar({ toggleShowNotSelected, showNotSelected }) {
  let { data } = useDataController();
  let { selectedData, isDisplayedSelected } = useDataSelection();

  return (
    <div>
      <Uu5Elements.Button
        className={Config.Css.css({ width: "60%" })}
        icon={"uugds-search"}
        colorScheme="light-green"
        onClick={() => toggleShowNotSelected()}
      >
        {showNotSelected ? "Show All" : "Show only Not Completed"}
      </Uu5Elements.Button>

      <Uu5Elements.Block className={Config.Css.css({ width: "100%", margin: 10 })}>
        {isDisplayedSelected
          ? ` Displaying ${data.length} selected item(s).`
          : ` Completed ${selectedData.length} item(s) out of ${data.length} total.`}
      </Uu5Elements.Block>
    </div>
  );
}

export default InfoBar;
