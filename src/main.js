window.onload = function () {
  let element = this.document.getElementById("sidebar-content-load-view");
  element.appendChild(addSidebarGroup());
};

// 
// SECTION: Add Sidebar Group / Add Sidebar Group List Item
//
function addSidebarGroup() {
  let nextIdSuffix = getNextIdSuffixByClassName("sidebar-group", "number");

  let groupDiv = document.createElement("div");
  groupDiv.className = "sidebar-group";
  groupDiv.id = `sidebar-group-${nextIdSuffix}`;

  groupDiv.innerHTML =
    `
    <div class='sidebar-group-header'>
      <div class="sidebar-group-header-title">Group ${nextIdSuffix}</div>
      <button class="sidebar-group-header-add" onclick="sidebarAddGroupListItemClick(event)">+</button>
    </div>
    <div class='sidebar-group-list'>
    </div>
    `;

  addSidebarGroupListItem(groupDiv);

  return groupDiv;
}

function addSidebarGroupListItem(groupHTMLDivElement) {
  let insertIntoSidebarGroupList = Array.from(groupHTMLDivElement.children).find(child => child.className.includes("sidebar-group-list"));
  if (insertIntoSidebarGroupList === undefined) return;

  let sidebarGroupListItemIdSuffix = getNextIdSuffixByClassName("sidebar-group-list-item", "letter");
  let sidebarGroupListItemIdPrefix = "sidebar-group-list-item";

  insertIntoSidebarGroupList.appendChild(createNewSidebarGroupListItem(sidebarGroupListItemIdPrefix, sidebarGroupListItemIdSuffix));
}

function createNewSidebarGroupListItem(sidebarGroupListItemIdPrefix, sidebarGroupListItemIdSuffix) {
  let newListItem = document.createElement("div");
  newListItem.id = `${sidebarGroupListItemIdPrefix}-${sidebarGroupListItemIdSuffix}`;
  newListItem.className = "sidebar-group-list-item";

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
  
  document.getElementById(event.currentTarget.parentNode.parentNode.id).remove();
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
  addSidebarGroupListItem(event.currentTarget.parentNode.parentNode);
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
