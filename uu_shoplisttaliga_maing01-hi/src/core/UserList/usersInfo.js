import { useState, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config";

const INITIAL_USERS_LIST = [
  { id: Utils.String.generateId(), userName: "John Doe", isOwner: true },
  { id: Utils.String.generateId(), userName: "Mariah Doe", isOwner: false },
  { id: Utils.String.generateId(), userName: "Serena Doe", isOwner: false },
];

function UsersInfo({ onUserSelect }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  //add member
  const [userList, setUserList] = useState(INITIAL_USERS_LIST);
  // delete member
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [selectedUser, setSelectedUser] = useState(INITIAL_USERS_LIST[1]);
  //to do leave list
  const handleLeaveList = () => {
    setUserList(userList.filter((user) => user.id !== selectedUser.id));
    setSelectedUser(INITIAL_USERS_LIST[0]);
    setLeaveModalOpen(false);
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
        { icon: "uugds-plus", children: "Add Member", onClick: () => setModalOpen(true) },
        {
          icon: "uugds-delete",
          children: "Remove Member",
          colorScheme: "red",
          onClick: () => {
            setUserIdToDelete(userOptions.id);
            setDeleteModalOpen(true);
          },
        },

        {
          children: "Select Member",
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
        { icon: "uugds-delete", children: "LEAVE LIST", colorScheme: "red", onClick: () => setLeaveModalOpen(true) },
        {
          children: "Select Member",
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
          {selectedUser.isOwner && <Uu5Elements.Badge size="m">OWNER</Uu5Elements.Badge>}
        </Uu5Elements.Text>
      }
      actionList={actionList}
    >
      <Uu5Forms.Form.Provider onSubmit={handleAddUser}>
        <Uu5Elements.Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          header=" Add New Member to List"
          footer={
            <div>
              <Uu5Forms.CancelButton
                className={Config.Css.css({ margin: 10 })}
                icon="uugds-close"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Uu5Forms.CancelButton>
              <Uu5Forms.SubmitButton icon="uugds-check">Add Member</Uu5Forms.SubmitButton>
            </div>
          }
        >
          <Uu5Forms.FormText name="member" label="Member Name: " />
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>

      <Uu5Forms.Form.Provider onSubmit={handleDeleteUser}>
        <Uu5Elements.Modal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          header="Remove Member"
          footer={
            <div>
              <Uu5Forms.CancelButton
                className={Config.Css.css({ margin: 10 })}
                icon="uugds-close"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Uu5Forms.CancelButton>
              <Uu5Forms.SubmitButton icon="uugds-delete" colorScheme="red">
                Remove Member
              </Uu5Forms.SubmitButton>
            </div>
          }
        >
          <Uu5Forms.FormSelect name="author" label="Select Member to Delete" itemList={userOptions} />
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>

      <Uu5Forms.Form.Provider
        onSubmit={(e) => {
          e.preventDefault();
          handleLeaveList();
        }}
      >
        <Uu5Elements.Modal
          open={leaveModalOpen}
          onClose={() => setLeaveModalOpen(false)}
          header=" You are going to leave from list."
          footer={
            <div>
              <Uu5Forms.CancelButton
                className={Config.Css.css({ margin: 10 })}
                icon="uugds-close"
                onClick={() => setLeaveModalOpen(false)}
              >
                Cancel
              </Uu5Forms.CancelButton>
              <Uu5Forms.SubmitButton icon="uugds-check" colorScheme="red">
                I want to leave!
              </Uu5Forms.SubmitButton>
            </div>
          }
        ></Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    </Uu5Elements.Block>
  );
}

export default UsersInfo;
