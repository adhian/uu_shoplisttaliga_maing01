import { useState, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config";
import importLsi from "../../lsi/import-lsi.js";

function CreateModal({ onSubmit }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (e) => {
    // extract data from form
    const formData = e.data.value;

    onSubmit(formData);
    setModalOpen(false); //close the modal after submission
  };

  return (
    <div>
      <Uu5Elements.Button
        className={Config.Css.css({ width: "80%", marginBottom: 10 })}
        icon={"uugds-plus"}
        colorScheme="primary"
        onClick={() => setModalOpen(true)} //open the modal
      >
        <Lsi import={importLsi} path={["CreateNewItem", "title"]} />
      </Uu5Elements.Button>

      <Uu5Forms.Form.Provider onSubmit={handleSubmit}>
        <Uu5Elements.Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          header={<Lsi import={importLsi} path={["CreateNewItem", "title"]} />}
          footer={
            <div>
              <Uu5Forms.CancelButton
                className={Config.Css.css({ margin: 10 })}
                icon="uugds-close"
                onClick={() => setModalOpen(false)}
              >
                <Lsi import={importLsi} path={["Button", "cancel"]} />
              </Uu5Forms.CancelButton>
              <Uu5Forms.SubmitButton icon="uugds-check">
                <Lsi import={importLsi} path={["CreateNewItem", "create"]} />
              </Uu5Forms.SubmitButton>
            </div>
          }
        >
          <Uu5Forms.Form.View gridLayout={{ xs: "name, author", s: "name author" }}>
            <Uu5Forms.FormText name="name" label={<Lsi import={importLsi} path={["CreateNewItem", "nameLabel"]} />} />

            <Uu5Forms.FormSelect
              name="author"
              label={<Lsi import={importLsi} path={["CreateNewItem", "author"]} />}
              //TO DO render member in itemList
              itemList={[
                { value: "John Doe", children: "John Doe" },
                { value: "Mariah Doe", children: "Mariah Doe" },
                { value: "Serena Doe", children: "Serena Doe" },
              ]}
            />
          </Uu5Forms.Form.View>
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    </div>
  );
}

export default CreateModal;
