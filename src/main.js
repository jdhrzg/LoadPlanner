const SIDEBAR_GROUP_LIST_ITEM_CLASS_NAME = "sidebar-group-list-item";
const SIDEBAR_GROUP_CLASS_NAME = "sidebar-group";

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

  let savedSidebarGroupListItemSuffixes = getSavedSidebarGroupListItemSuffixes();
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
  let newListItem = document.createElement("div");
  newListItem.id = `${sidebarGroupListItemClassName}-${sidebarGroupListItemIdSuffix}`;
  newListItem.className = sidebarGroupListItemClassName;

  newListItem.innerHTML = `
  <div class="sidebar-group-list-item-container">
    <button class="sidebar-group-list-item-delete" onclick="sidebarGroupListItemDeleteClick(event)">x</button>
    <label for='length'>L:</label>
    <input type="text" id='length'></input>
    <label for='width'>W:</label>
    <input type="text" id='width'></input>
    <label for='height'>H:</label>
    <input type="text" id='height'></input>
    <div class="sidebar-group-list-item-label">${sidebarGroupListItemIdSuffix}</div>
  </div>
  `;

  return newListItem;
}

function sidebarGroupListItemDeleteClick(event) {
  if (document.getElementsByClassName("sidebar-group-list-item").length <= 1) return;
  
  let currentSidebarGroupListItem = event.currentTarget.parentNode.parentNode;
  let currentSidebarGroupList = currentSidebarGroupListItem.parentNode;

  document.getElementById(currentSidebarGroupListItem.id).remove();

  saveAllChildSidebarGroupListItems(currentSidebarGroupList);
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

function getSavedSidebarGroupListItemSuffixes() {
  let sidebarGroupListItemSuffixes = [];

  if (localStorage.getItem(SIDEBAR_GROUP_LIST_ITEM_CLASS_NAME)?.length > 0) {
    sidebarGroupListItemSuffixes = JSON.parse(localStorage.getItem(SIDEBAR_GROUP_LIST_ITEM_CLASS_NAME));
  }

  return sidebarGroupListItemSuffixes;
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
