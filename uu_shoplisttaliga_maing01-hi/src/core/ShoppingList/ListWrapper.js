import React, { useState } from "react";
import { DataControllerProvider, Lsi, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import InfoBar from "./infoBar";
import List from "./list";
import CreateModal from "./createModal";
import Config from "../config/config";
import UsersInfo from "../UserList/usersInfo";
import Uu5Forms from "uu5g05-forms";
import importLsi from "../../lsi/import-lsi.js";

const INITIAL_SHOPPING_LIST = [
  { id: Utils.String.generateId(), name: "Hammer", author: "John Doe" },
  { id: Utils.String.generateId(), name: "Scissor", author: "Mariah Done" },
  { id: Utils.String.generateId(), name: "Paper", author: "John Doe" },
  { id: Utils.String.generateId(), name: "Stone", author: "Serena Doe" },
];

function ListWrapper() {
  const [showNotSelected, setShowNotSelected] = useState(false);
  const [itemList, setItemList] = useState(INITIAL_SHOPPING_LIST);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shoppingListName, setShoppingListName] = useState("Shopping List");

  const toggleShowNotSelected = () => {
    setShowNotSelected(!showNotSelected);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const actionList = selectedUser?.isOwner ? [{ icon: "uugds-pencil", onClick: () => setModalOpen(true) }] : [];

  const handleDelete = (id) => {
    const updatedItemList = itemList.filter((item) => item.id !== id);
    setItemList(updatedItemList);
  };

  const handleAddItem = (newItemData) => {
    const newItem = {
      id: Utils.String.generateId(),
      name: newItemData.name,
      author: newItemData.author,
    };
    setItemList([...itemList, newItem]);
  };
  // change name list extract data from form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newListName = e.data.value.listName;
    setShoppingListName(newListName);
    setModalOpen(false);
  };

  return (
    <div>
      <UsersInfo onUserSelect={handleUserSelection} />
      <Uu5Elements.Block className={Config.Css.css({ alignItems: "center" })}>
        <Uu5Elements.Block
          className={Config.Css.css({ width: 450, maxWidth: "100%", textAlign: "center" })}
          actionList={actionList}
          header={
            <Uu5Elements.Text category="story" segment="heading" type="h3">
              {shoppingListName}
            </Uu5Elements.Text>
          }
          headerseparator
        >
          <DataControllerProvider data={itemList || []} selectable>
            <CreateModal onSubmit={handleAddItem} />
            <InfoBar toggleShowNotSelected={toggleShowNotSelected} showNotSelected={showNotSelected} />

            <List showNotSelected={showNotSelected} handleDelete={handleDelete} />
          </DataControllerProvider>

          <Uu5Forms.Form.Provider onSubmit={handleSubmit}>
            <Uu5Elements.Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              header={<Lsi import={importLsi} path={["ListNameModal", "label"]} />}
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
                    <Lsi import={importLsi} path={["ListNameModal", "changeName"]} />
                  </Uu5Forms.SubmitButton>
                </div>
              }
            >
              <Uu5Forms.FormText
                name="listName"
                label={<Lsi import={importLsi} path={["ListNameModal", "changeName"]} />}
              />
            </Uu5Elements.Modal>
          </Uu5Forms.Form.Provider>
        </Uu5Elements.Block>
      </Uu5Elements.Block>
    </div>
  );
}

export default ListWrapper;
