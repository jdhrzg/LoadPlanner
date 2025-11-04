window.onload = function () {
  let element = this.document.getElementById("sidebar-content-load-view");
  element.appendChild(addSidebarGroup());
};

function addSidebarGroup() {
  let nextIdIdentifier = getNextIdIdentifierByClassName("sidebar-group", "number");

  let groupDiv = document.createElement("div");
  groupDiv.className = "sidebar-group";
  groupDiv.id = `sidebar-group-${nextIdIdentifier}`;

  groupDiv.innerHTML =
    `
    <div class='sidebar-group-header'>
      <div class="sidebar-group-header-title">Group ${nextIdIdentifier}</div>
      <button class="sidebar-group-header-add">+</button>
    </div>
    <div class='sidebar-group-list'>
    </div>
    `;

  return groupDiv;
}

function addSidebarGroupListItem(insertIntoSidebarGroupNumber) {
  let insertIntoSidebarGroup = document.getElementById(
    `sidebar-group-${groupNumber}`
  );

  let insertIntoSidebarGroupList = undefined;
  for (let child of insertIntoSidebarGroup.children) {
    if (child.className.contains("sidebar-group-list")) {
      insertIntoSidebarGroupList = child;
    }
  }

  let sidebarGroupListItemLetter = getNextIdIdentifierByClassName("sidebar-group-list-item", "letter");
  let sidebarGroupListItemId = `sidebar-group-list-item-${sidebarGroupListItemLetter}`;

  insertIntoSidebarGroupList.appendChild(createNewSidebarGroupListItem());
}

function getNextIdIdentifierByClassName(className, letterOrNumber) {
  let largestSidebarGroupNumber = undefined;
  for (let element in document.getElementsByClassName(className)) {
    let sidebarGroupNumber = element.id.split("-").at(-1);
    if (sidebarGroupNumber > largestSidebarGroupNumber) {
      largestSidebarGroupNumber = sidebarGroupNumber;
    }
  }  
  if (largestSidebarGroupNumber === undefined) return (letterOrNumber == "letter") ? "A" : 1;
  else return largestSidebarGroupNumber;
}

function createNewSidebarGroupListItem(sideBarGroupListItemId) {
  let newListItem = document.createElement("div");
  newListItem.id = sideBarGroupListItemId;
  newListItem.class = "sidebar-group-list-item";

  newListItem.innerHTML = `
  <label for='length'>L:</label>
  <input type="text" id='length'></input>
  <label for='width'>W:</label>
  <input type="text" id='width'></input>
  <label for='height'>H:</label>
  <input type="text" id='height'></input>
  `;

  return newListItem;
}

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
