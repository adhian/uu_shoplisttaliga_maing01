import { useDataController, useDataSelection, Lsi } from "uu5g05";
import Uu5Elements, { Grid } from "uu5g05-elements";
import { PieChart } from "uu5chartsg01";
import Config from "../config/config";
import importLsi from "../../lsi/import-lsi.js";

function InfoBar({ toggleShowNotSelected, showNotSelected }) {
  let { data } = useDataController();
  let { selectedData, isDisplayedSelected } = useDataSelection();

  const pieChartData = [
    {
      value: selectedData.length,
      label: "Completed",
    },
    {
      value: data.length - selectedData.length,
      label: "Not completed",
    },
  ];

  const pieChartSerieList = [
    {
      valueKey: "value",
      labelKey: "label",
    },
  ];

  return (
    <div>
      <Uu5Elements.Button
        className={Config.Css.css({ width: "60%" })}
        icon={"uugds-search"}
        colorScheme="light-green"
        onClick={() => toggleShowNotSelected()}
      >
        {showNotSelected ? (
          <Lsi import={importLsi} path={["Filter", "showAll"]} />
        ) : (
          <Lsi import={importLsi} path={["Filter", "notCompleted"]} />
        )}
      </Uu5Elements.Button>

      {
        <Uu5Elements.Block className={Config.Css.css({ width: "100%", margin: 10 })}>
          {isDisplayedSelected
            ? ` Displaying ${data.length} selected item(s).`
            : ` ${selectedData.length} item(s) completed out of ${data.length} total.`}
          <Grid>
            <PieChart data={pieChartData} seriesList={pieChartSerieList} />
          </Grid>
        </Uu5Elements.Block>
      }
    </div>
  );
}

export default InfoBar;
