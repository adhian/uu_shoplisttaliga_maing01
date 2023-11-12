import { useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config";

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
        Create New Item
      </Uu5Elements.Button>

      <Uu5Forms.Form.Provider onSubmit={handleSubmit}>
        <Uu5Elements.Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          header="Create New Item"
          footer={
            <div>
              <Uu5Forms.CancelButton
                className={Config.Css.css({ margin: 10 })}
                icon="uugds-close"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Uu5Forms.CancelButton>
              <Uu5Forms.SubmitButton icon="uugds-check">Create</Uu5Forms.SubmitButton>
            </div>
          }
        >
          <Uu5Forms.FormText name="name" label="Name for new item" />

          <Uu5Forms.FormSelect
            name="author"
            label="Author of created item"
            //TO DO render member in itemList
            itemList={[
              { value: "John Doe", children: "John Doe" },
              { value: "Mariah Doe", children: "Mariah Doe" },
              { value: "Serena Doe", children: "Serena Doe" },
            ]}
          />
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    </div>
  );
}

export default CreateModal;
