const SIDEBAR_GROUP_LIST_ITEM_CONTAINER = "sidebar-group-list-item-container";
const SIDEBAR_GROUP_LIST_ITEM_CLASS_NAME = "sidebar-group-list-item";
const SIDEBAR_GROUP_CLASS_NAME = "sidebar-group";
const SIDEBAR_GROUP_LIST_ITEM_CONTAINER_INPUT_VALUES = SIDEBAR_GROUP_LIST_ITEM_CONTAINER + "-input-values";

window.onload = function () {
  let element = this.document.getElementById("sidebar-content-load-view");

  if (!doesSavedSidebarGroupListItemsExist()) {
    element.appendChild(addSidebarGroupWithDefaultListItem());
  } else {
    element.appendChild(addSidebarGroupWithSavedListItems());
  }  
};

// 
// SECTION: Add Sidebar Group / Add Sidebar Group List Item
//
function addSidebarGroupWithDefaultListItem() {
  let sidebarGroup = createNewSidebarGroup();

  let sidebarGroupListItemIdSuffix = getNextIdSuffixByClassName("sidebar-group-list-item", "letter");
  addSidebarGroupListItem(sidebarGroup, sidebarGroupListItemIdSuffix);

  return sidebarGroup;
}

function addSidebarGroupWithSavedListItems() {
  let sidebarGroup = createNewSidebarGroup();

  let savedSidebarGroupListItemSuffixes = getSavedValuesById(SIDEBAR_GROUP_LIST_ITEM_CLASS_NAME, []);
  for (let suffix of savedSidebarGroupListItemSuffixes) {
    addSidebarGroupListItem(sidebarGroup, suffix);
  }

  return sidebarGroup;
}

function createNewSidebarGroup() {
  let nextIdSuffix = getNextIdSuffixByClassName("sidebar-group", "number");

  let sidebarGroup = document.createElement("div");
  sidebarGroup.className = SIDEBAR_GROUP_CLASS_NAME;
  sidebarGroup.id = `${SIDEBAR_GROUP_CLASS_NAME}-${nextIdSuffix}`;

  sidebarGroup.innerHTML =
    `
    <div class='sidebar-group-header'>
      <div class="sidebar-group-header-title">Group ${nextIdSuffix}</div>
      <button class="sidebar-group-header-add" onclick="sidebarAddGroupListItemClick(event)">+</button>
    </div>
    <div class='sidebar-group-list'>
    </div>
    `;
    
  return sidebarGroup;
}

function addSidebarGroupListItem(parentSidebarGroup, sidebarGroupListItemIdSuffix) {
  let insertIntoSidebarGroupList = Array.from(parentSidebarGroup.children).find(child => child.className.includes("sidebar-group-list"));
  if (insertIntoSidebarGroupList === undefined) return;

  let newSidebarGroupListItem = createNewSidebarGroupListItem(SIDEBAR_GROUP_LIST_ITEM_CLASS_NAME, sidebarGroupListItemIdSuffix);
  insertIntoSidebarGroupList.appendChild(newSidebarGroupListItem);
  
  saveAllChildSidebarGroupListItems(insertIntoSidebarGroupList);
}

function createNewSidebarGroupListItem(sidebarGroupListItemClassName, sidebarGroupListItemIdSuffix) {
  let sidebarGroupListItemX = document.createElement("div");
  sidebarGroupListItemX.id = `${sidebarGroupListItemClassName}-${sidebarGroupListItemIdSuffix}`;
  sidebarGroupListItemX.className = sidebarGroupListItemClassName;
 
  let sidebarGroupListItemContainer = document.createElement("div");
  sidebarGroupListItemContainer.className = SIDEBAR_GROUP_LIST_ITEM_CONTAINER;

  sidebarGroupListItemContainer.innerHTML = `
  <button class="sidebar-group-list-item-delete">x</button>
  <label for='length-${sidebarGroupListItemIdSuffix}'>L:</label>
  <input type="text" id='length-${sidebarGroupListItemIdSuffix}'></input>
  <label for='width-${sidebarGroupListItemIdSuffix}'>W:</label>
  <input type="text" id='width-${sidebarGroupListItemIdSuffix}'></input>
  <label for='height-${sidebarGroupListItemIdSuffix}'>H:</label>
  <input type="text" id='height-${sidebarGroupListItemIdSuffix}'></input>
  <div class="sidebar-group-list-item-label">${sidebarGroupListItemIdSuffix}</div>
  `;
  
  sidebarGroupListItemX.appendChild(sidebarGroupListItemContainer);

  // Attach delete click
  let sidebarGroupListItemDelete = Array.from(sidebarGroupListItemContainer.childNodes).find(x => x.className == "sidebar-group-list-item-delete");
  if (sidebarGroupListItemDelete != null) {
    sidebarGroupListItemDelete.addEventListener('click', function(event) {
      if (document.getElementsByClassName("sidebar-group-list-item").length <= 1) return;
  
      let currentSidebarGroupList = sidebarGroupListItemX.parentNode;
  
      document.getElementById(sidebarGroupListItemX.id).remove();
  
      saveAllChildSidebarGroupListItems(currentSidebarGroupList);
      removeInputValuesBySidebarGroupListItemSuffix(sidebarGroupListItemIdSuffix);
    });
  }

  // Attach blur event
  for (let element of Array.from(sidebarGroupListItemContainer.childNodes).filter(x => x.tagName == "INPUT")) {
    element.addEventListener('blur', function(event) {
      saveInputValueById(event.currentTarget);
    });
  }

  // Apply saved values
  let inputValuesById = getSavedValuesById(SIDEBAR_GROUP_LIST_ITEM_CONTAINER_INPUT_VALUES, {});
  for (let [key, value] of Object.entries(inputValuesById)) {
    if (key.split("-")?.at(-1) === sidebarGroupListItemIdSuffix) {
      let input = sidebarGroupListItemContainer.querySelector(`#${key}`);
      input.value = value;
    }
  }

  return sidebarGroupListItemX;
}

//
// SECTION: Save / Load Sidebar Group List Item Container Input Values
//
function saveInputValueById(inputElement) {
  let existingInputValuesById = JSON.parse(localStorage.getItem(SIDEBAR_GROUP_LIST_ITEM_CONTAINER_INPUT_VALUES));

  if (existingInputValuesById == null) {
    existingInputValuesById = {};
  }
  
  existingInputValuesById[inputElement.id] = inputElement.value;

  localStorage.setItem(SIDEBAR_GROUP_LIST_ITEM_CONTAINER_INPUT_VALUES, JSON.stringify(existingInputValuesById));
}

function removeInputValuesBySidebarGroupListItemSuffix(sidebarGroupListItemSuffix) {
  let inputValuesById = getSavedValuesById(SIDEBAR_GROUP_LIST_ITEM_CONTAINER_INPUT_VALUES, {});

  const inputValuesWithSuffixMatchesRemoved = Object.fromEntries(Object.entries(inputValuesById).filter(([key, _]) => key.split("-").at(-1) !== sidebarGroupListItemSuffix));

  localStorage.setItem(SIDEBAR_GROUP_LIST_ITEM_CONTAINER_INPUT_VALUES, JSON.stringify(inputValuesWithSuffixMatchesRemoved));
}

//
// SECTION: Save / Load Sidebar Group List Items
//
function doesSavedSidebarGroupListItemsExist() {
  return localStorage.getItem(SIDEBAR_GROUP_LIST_ITEM_CLASS_NAME)?.length > 0;
}

function saveAllChildSidebarGroupListItems(sidebarGroupList) {
  let sidebarGroupListItemIdSuffixes = [];

  for (let child of Array.from(sidebarGroupList.children).filter(x => x.className == SIDEBAR_GROUP_LIST_ITEM_CLASS_NAME)) {
    sidebarGroupListItemIdSuffixes.push(child.id.split('-').at(-1));
  }

  localStorage.setItem(SIDEBAR_GROUP_LIST_ITEM_CLASS_NAME, JSON.stringify(sidebarGroupListItemIdSuffixes));
}

//
// SECTION: Generic Save / Load
//
function getSavedValuesById(id, defaultReturnValue) {
  let savedValues = defaultReturnValue;

  if (localStorage.getItem(id)?.length > 0) {
    savedValues = JSON.parse(localStorage.getItem(id));
  }

  return savedValues;
}


function getNextIdSuffixByClassName(className, letterOrNumber) {
  let largestSidebarGroupSuffix = "";
  for (let element of document.getElementsByClassName(className)) {
    let sidebarGroupSuffix = element.id.split("-").at(-1);
    if (sidebarGroupSuffix > largestSidebarGroupSuffix) {
      largestSidebarGroupSuffix = sidebarGroupSuffix;
    }
  }
  
  if (largestSidebarGroupSuffix === "") { 
    return (letterOrNumber == "letter") ? "A" : 1;
  } else if (letterOrNumber == "letter") {
    let nextCharCode = 0;
    let charCode = largestSidebarGroupSuffix.charCodeAt(0);
    if (charCode >= 90) { // "Z"
      nextCharCode = 97; // "a"
    } else if (charCode >= 122) { // "z"
      nextCharCode = 65; // "A"
    } else {
      nextCharCode = charCode + 1;
    }
    return String.fromCharCode(nextCharCode);
  } else if (letterOrNumber == "number") {
    return largestSidebarGroupSuffix + 1;
  }
}

function sidebarAddGroupListItemClick(event) {
  let sidebarGroupListItemIdSuffix = getNextIdSuffixByClassName(SIDEBAR_GROUP_LIST_ITEM_CLASS_NAME, "letter");
  addSidebarGroupListItem(event.currentTarget.parentNode.parentNode, sidebarGroupListItemIdSuffix);
}


//
// SECTION: Tab Click
//
function tabButtonClick(event) {
  // Clear "active" class from all tab elements and tab-content elements
  let tabButtons = Array.from(document.getElementsByClassName("tab-button"));
  tabButtons.forEach((tabButton) => {
    tabButton.classList.remove("active");
  });

  let tabContents = Array.from(document.getElementsByClassName("tab-content"));
  tabContents.forEach((tabContent) => {
    tabContent.classList.remove("active");
  });

  // Add "active" class to selected tab element and associated tab-content
  event.srcElement.classList.add("active");

  let associatedTabContent = document.getElementById(
    `tab-content-${event.srcElement.id.split("-")[2]}`
  );
  associatedTabContent.classList.add("active");
}


//
// SECTION: Sidebar Toggle
//
function toggleSidebar(event) {
  let sidebarContents = Array.from(
    document.getElementsByClassName("sidebar-content")
  );
  let mainContents = Array.from(
    document.getElementsByClassName("main-content")
  );

  sidebarContents.forEach((sidebarContent) => {
    if (sidebarContent.classList.contains("active")) {
      event.currentTarget.innerText = ">";
      sidebarContent.classList.remove("active");

      mainContents.forEach((mainContent) => {
        mainContent.classList.remove("sidebar-active");
      });
    } else {
      event.currentTarget.innerText = "<";
      sidebarContent.classList.add("active");

      mainContents.forEach((mainContent) => {
        mainContent.classList.add("sidebar-active");
      });
    }
  });
}
