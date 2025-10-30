function tabButtonClick(event) {
  // Clear "active" class from all tab elements and tab-content elements
  var tabButtons = Array.from(document.getElementsByClassName("tab-button"));
  tabButtons.forEach((tabButton) => {
    tabButton.classList.remove("active");
  });

  var tabContents = Array.from(document.getElementsByClassName("tab-content"));
  tabContents.forEach((tabContent) => {
    tabContent.classList.remove("active");
  });

  // Add "active" class to selected tab element and associated tab-content
  event.srcElement.classList.add("active");

  var associatedTabContent = document.getElementById(
    `tab-content-${event.srcElement.id.split("-")[2]}`
  );
  associatedTabContent.classList.add("active");
}

function toggleSidebar(event) {
  var sidebarContents = Array.from(
    document.getElementsByClassName("sidebar-content")
  );
  var mainContents = Array.from(
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
