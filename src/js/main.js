import ColumnChart from "./components/ColumnChart";
import NotificationManager from "./components/NotificationManager";
import Utils from "./services/Utils";
import { ordersData, salesData, customersData, notificationsData } from "./data/common";


// ColumnChart component
document.addEventListener("DOMContentLoaded", () => {
  const ordersChart = document.querySelector(".dashboard__chart_orders");
  const salesChart = document.querySelector(".dashboard__chart_sales");
  const customersChart = document.querySelector(".dashboard__chart_customers");

  ordersChart.append(new ColumnChart(ordersData));
  salesChart.append(new ColumnChart(salesData));
  customersChart.append(new ColumnChart(customersData));
});

// NotificationManager and NotificationMessage components
document.addEventListener("DOMContentLoaded", () => {
  const notificationButton = document.getElementById("btn");
  const notificationContainer = document.querySelector(".notification__container");
  const notificationManager = new NotificationManager(notificationContainer, 5);
    
  notificationButton.addEventListener("click", () => {
    notificationManager.show(notificationsData[Utils.getRandomNumber(0, notificationsData.length)]);
  });
});