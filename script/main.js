$(document).ready(() => {
  $("#moveSurnamesButton").click(() => {
    let surnamesMap = getSurnamesMap();
    moveSurnames(surnamesMap, removeMovedSurnames);
  });
  initModals();
});

function removeMovedSurnames(surnamesMap) {
  surnamesMap.forEach((groupList, group) => {
    if (group) {
      groupList.forEach(surname => {
        $(
          `#surnameList li h3:contains('${surname.replace("\n", "")}')`
        ).remove();
      });
    }
  });
}

function moveSurnames(surnamesMap, removeSurnames) {
  let removedSurnamesMap = new Map();
  surnamesMap.forEach((groupList, group) => {
    if (group) {
      $(`#${group}`).append(constructList(groupList));
    }
    if (groupList.length > 0) {
      removedSurnamesMap.set(group, groupList);
    }
  });
  removeSurnames(removedSurnamesMap);
}

function getSurnamesMap() {
  let surnamesMap = new Map();
  let surnames = $("#surnameListWrapper .list li")
    .get()
    .map(li => li.innerText);
  let groups = $("#surnameGroupListWrapper .list li")
    .get()
    .map(li => li.id);
  groups.forEach(group => {
    let groupSurnames = surnames.filter(surname => surname.startsWith(group));
    surnamesMap.set(group, groupSurnames);
  });
  return surnamesMap;
}

function constructList(groupList) {
  let items = "";
  groupList.forEach(listItem => {
    items += `<li><h3>${listItem}</h3></li>`;
  });
  return `<ul class="list sublist level2">${items}</ul>`;
}
