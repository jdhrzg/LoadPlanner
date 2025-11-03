window.onload = function () {
  let tabContent1 = document.getElementById("tab-content-1");
  for (let child of tabContent1.children) {
    if (child.classList.contains("sidebar-content")) {
      child.appendChild(addSidebarGroup(1));
    }
  }
};

function addSidebarGroup(groupNumber) {
  let groupDiv = document.createElement("div");
  groupDiv.id = `sidebar-group-${groupNumber}`;
  groupDiv.className = "sidebar-group";

  groupDiv.innerHTML = `
  <div class='sidebar-group-header'>
    <div class="sidebar-group-header-title">Group ${groupNumber}</div>
    <button class="sidebar-group-header-add">+</button>
  </div>
  <div class='sidebar-group-list'>
    <div class='sidebar-group-list-item'>
      <label for='length'>L:</label>
      <input type="text" id='length'></input>
      <label for='width'>W:</label>
      <input type="text" id='width'></input>
      <label for='height'>H:</label>
      <input type="text" id='height'></input>
    </div>
  </div>
  `;

  return groupDiv;
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
