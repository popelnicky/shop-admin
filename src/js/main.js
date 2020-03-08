import ColumnChart from "./components/ColumnChart";
import Tooltip from "./components/Tooltip";
// import NotificationManager from "./components/notifications/NotificationManager";
import Utils from "./services/Utils";

// ColumnChart component
const chart = document.getElementById("charts-root");

chart.append(new ColumnChart(Utils.getChartData("orders"), "dashboard__chart_orders"));
chart.append(new ColumnChart(Utils.getChartData("sales", "$"), "dashboard__chart_sales"));
chart.append(new ColumnChart(Utils.getChartData("customers"), "dashboard__chart_customers"));

// NotificationManager and NotificationMessage components
/* const notificationButton = document.getElementById("btn");
const notificationContainer = document.querySelector(".notification__container");
const notificationManager = new NotificationManager(notificationContainer, 5);
  
notificationButton.addEventListener("pointerdown", () => {
  notificationManager.show(Utils.getMessageData());
}); */

new Tooltip();