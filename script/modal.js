function initModals() {
  $("#addSurnameButton").click(toggleAddSurnameModal);
  $("#addSurnameGroupButton").click(toggleAddSurnameGroupModal);
  $("#addSurnameModal .close").click(toggleAddSurnameModal);
  $("#addSurnameGroupModal .close").click(toggleAddSurnameGroupModal);
  $(window).click(clickOutsideModal);
  $(document).keydown(event => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
  $(document).keyup(event => {
    keyPressed(event, "Escape", event => {
      if ($("#addSurnameModal").css("display") === "block") {
        toggleAddSurnameModal();
      }
      if ($("#addSurnameGroupModal").css("display") === "block") {
        toggleAddSurnameGroupModal();
      }
    });
    keyPressed(event, "Enter", event => {
      if ($("#addSurnameModal").css("display") === "block") {
        $("#saveSurnameButton").trigger("click");
      }
      if ($("#addSurnameGroupModal").css("display") === "block") {
        $("#saveSurnameGroupButton").trigger("click");
      }
    });
  });
  $("#saveSurnameButton").click(() => {
    insertSurname($("#surnameInput").val(), () => {
      toggleAddSurnameModal();
      pushNotification(
        "SUCCESS",
        "New surname has been added",
        NotificationType.SUCCESS,
        3000
      );
      $("#surnameInput").val("");
    });
  });
  $("#saveSurnameGroupButton").click(() => {
    insertSurnameGroup($("#surnameGroupInput").val(), () => {
      toggleAddSurnameGroupModal();
      pushNotification(
        "SUCCESS",
        "New surname group has been added",
        NotificationType.SUCCESS,
        3000
      );
      $("#surnameGroupInput").val("");
    });
  });
}

function toggleAddSurnameModal() {
  $("#addSurnameModal").css("display", (index, oldValue) => {
    if (oldValue === "none") {
      return "block";
    } else return "none";
  });
  $("#surnameInput").focus();
}

function toggleAddSurnameGroupModal() {
  $("#addSurnameGroupModal").css("display", (index, oldValue) => {
    if (oldValue === "none") {
      return "block";
    } else return "none";
  });
  $("#surnameGroupInput").focus();
}

function clickOutsideModal(event) {
  if (event.target === $("#addSurnameModal").get()[0]) {
    toggleAddSurnameModal();
  }
  if (event.target === $("#addSurnameGroupModal").get()[0]) {
    toggleAddSurnameGroupModal();
  }
}

function keyPressed(event, keyName, handler) {
  if (event.key === keyName) handler(event);
}

function insertSurname(surname, handler) {
  if (surname) {
    let newSurnameElement = `<li><h3>${surname}</h3></li>`;
    $("#surnameList").append(newSurnameElement);
    handler();
  }
}

function insertSurnameGroup(groupName, handler) {
  if (groupName) {
    let newSurnameGroupElement = `<li id="${groupName}"><h3>Group "${groupName}":</h3></li>`;
    $("#surnameGroupList").append(newSurnameGroupElement);
    handler();
  }
}
