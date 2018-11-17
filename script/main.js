$(document).ready(() => {
  $("#moveSurnamesButton").click(() => {
    let surnamesMap = getSurnamesMap();
    moveSurnames(surnamesMap, removeMovedSurnames);
  });
  $("#addSuffixButton").click(() => {
    addSuffixes();
  });

  initModals();
});

function addSuffixes() {
  $("#surnameGroupList .level2").each((index, element) => {
    let suffix = resolveSuffix(index + 1);
    $(element)
      .find("li h3")
      .each((subitemIndex, header) => {
        if (!suffixPresents(header.innerText)) {
          header.innerText += `:${suffix}`;
        }
      });
  });
}

function suffixPresents(text) {
  for (let key of Object.keys(suffixes)) {
    if (text.endsWith(suffixes[key])) return true;
  }
  return false;
}

function resolveSuffix(number) {
  if (number < 0 || !Number.isInteger(number)) {
    let message = "Incorrect 'position' value: " + number;
    throw new Error(message);
    pushNotification("INTERNAL ERROR", message, NotificationType.DANGER, 3000);
  }
  return suffixes[number];
}

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
      if (!listExists(group)) {
        $(`#${group}`).append(constructList(groupList));
      } else {
        $(`#${group} .level2`).append(constructListItems(groupList));
      }
    }
    if (groupList.length > 0) {
      removedSurnamesMap.set(group, groupList);
    }
  });
  removeSurnames(removedSurnamesMap);
}

function listExists(group) {
  return $(`#${group} .level2`).get().length != 0;
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
  let items = constructListItems(groupList);
  return `<ul class="list sublist level2">${items}</ul>`;
}

function constructListItems(groupList) {
  let items = "";
  groupList.forEach(listItem => {
    items += `<li><h3>${listItem}</h3></li>`;
  });
  return items;
}

let suffixes = {
  "1": "first",
  "2": "second",
  "3": "third",
  "4": "fourth",
  "5": "fifth",
  "6": "sixth",
  "7": "seventh",
  "8": "eighth",
  "9": "nineth",
  "10": "tenth",
  "11": "eleventh",
  "12": "twelfth",
  "13": "thirteenth",
  "14": "fourteenth",
  "15": "fifteenth",
  "16": "sixteenth",
  "17": "seventeenth",
  "18": "eighteenth",
  "19": "nineteenth",
  "20": "twentieth"
};
