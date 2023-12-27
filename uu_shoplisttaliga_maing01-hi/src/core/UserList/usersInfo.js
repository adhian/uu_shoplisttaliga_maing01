import { useState, Utils, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config";
import importLsi from "../../lsi/import-lsi.js";

const INITIAL_USERS_LIST = [
  { id: Utils.String.generateId(), userName: "John Doe", isOwner: true },
  { id: Utils.String.generateId(), userName: "Mariah Doe", isOwner: false },
  { id: Utils.String.generateId(), userName: "Serena Doe", isOwner: false },
];

function UsersInfo({ onUserSelect }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  //add member
  const [userList, setUserList] = useState(INITIAL_USERS_LIST);
  // delete member
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [selectedUser, setSelectedUser] = useState(INITIAL_USERS_LIST[1]);
  //to do leave list
  const handleLeaveList = () => {
    setUserList(userList.filter((user) => user.id !== selectedUser.id));
    setSelectedUser(INITIAL_USERS_LIST[0]);
    setLeaveDialogOpen(false);
  };

  //delete member
  const handleDeleteUser = (e) => {
    e.preventDefault();
    const userIdToDelete = e.data.value.author;

    setUserList(userList.filter((user) => user.id !== userIdToDelete));
    setDeleteModalOpen(false);
  };

  //create itemList for formSelect
  const userOptions = userList.map((user) => ({
    value: user.id,
    children: user.userName,
  }));
  //add user function

  const handleAddUser = (e) => {
    const addNewUser = {
      id: Utils.String.generateId(),
      userName: e.data.value.member,
      isOwner: false,
    };

    const updatedUserList = [...userList, addNewUser];
    setUserList(updatedUserList);
    setModalOpen(false);
  };

  const renderedUserList = userList.map((user) => ({
    children: user.userName,
    onClick: () => {
      onUserSelect(user);
      setSelectedUser(user);
    },
  }));

  const actionList = selectedUser.isOwner
    ? [
        {
          icon: "uugds-plus",
          children: <Lsi import={importLsi} path={["Member", "addMember"]} />,
          onClick: () => setModalOpen(true),
        },
        {
          icon: "uugds-delete",
          children: <Lsi import={importLsi} path={["Member", "removeMember"]} />,
          colorScheme: "red",
          onClick: () => {
            setUserIdToDelete(userOptions.id);
            setDeleteModalOpen(true);
          },
        },

        {
          children: <Lsi import={importLsi} path={["Member", "selectMember"]} />,
          primary: true,
          collapsedChildren: "Update",
          itemList: renderedUserList,
        },
        {
          children: renderedUserList.length,

          collapsedChildren: "Update",
        },
      ]
    : [
        {
          icon: "uugds-delete",
          children: <Lsi import={importLsi} path={["Member", "leaveList"]} />,
          colorScheme: "red",
          onClick: () => setLeaveDialogOpen(true),
        },
        {
          children: <Lsi import={importLsi} path={["Member", "selectMember"]} />,
          primary: true,
          collapsedChildren: "Update",
          itemList: renderedUserList,
        },
        {
          children: renderedUserList.length,

          collapsedChildren: "Update",
        },
      ];

  return (
    <Uu5Elements.Block
      header={
        <Uu5Elements.Text category="story" segment="heading" type="h2">
          {selectedUser.userName}
          {selectedUser.isOwner && (
            <Uu5Elements.Badge size="m">
              <Lsi import={importLsi} path={["Owner", "label"]} />
            </Uu5Elements.Badge>
          )}
        </Uu5Elements.Text>
      }
      actionList={actionList}
    >
      <Uu5Forms.Form.Provider onSubmit={handleAddUser}>
        <Uu5Elements.Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          header={<Lsi import={importLsi} path={["Member", "addMemberModal"]} />}
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
                <Lsi import={importLsi} path={["Member", "addMember"]} />
              </Uu5Forms.SubmitButton>
            </div>
          }
        >
          <Uu5Forms.FormText name="member" label={<Lsi import={importLsi} path={["Member", "addMemberModalName"]} />} />
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>

      <Uu5Forms.Form.Provider onSubmit={handleDeleteUser}>
        <Uu5Elements.Modal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          header={<Lsi import={importLsi} path={["Member", "removeMember"]} />}
          footer={
            <div>
              <Uu5Forms.CancelButton
                className={Config.Css.css({ margin: 10 })}
                icon="uugds-close"
                onClick={() => setDeleteModalOpen(false)}
              >
                <Lsi import={importLsi} path={["Button", "cancel"]} />
              </Uu5Forms.CancelButton>
              <Uu5Forms.SubmitButton icon="uugds-delete" colorScheme="red">
                <Lsi import={importLsi} path={["Member", "removeMember"]} />
              </Uu5Forms.SubmitButton>
            </div>
          }
        >
          <Uu5Forms.FormSelect
            name="author"
            label={<Lsi import={importLsi} path={["Member", "removeMemberSelect"]} />}
            itemList={userOptions}
          />
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>

      <Uu5Elements.Dialog
        open={leaveDialogOpen}
        onClose={() => setLeaveDialogOpen(false)}
        header={<Lsi import={importLsi} path={["Member", "leaveListModalText"]} />}
        icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
        actionList={[
          {
            children: <Lsi import={importLsi} path={["Member", "leaveButton"]} />,
            colorScheme: "negative",
            significance: "highlighted",
            icon: "uugds-delete",
            onClick: () => handleLeaveList(),
          },
          {
            children: <Lsi import={importLsi} path={["Button", "cancel"]} />,
            icon: "uugds-close",
            onClick: () => setLeaveDialogOpen(false),
          },
        ]}
      ></Uu5Elements.Dialog>
    </Uu5Elements.Block>
  );
}

export default UsersInfo;
