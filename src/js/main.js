import ColumnChart from "./components/ColumnChart";
import NotificationManager from "./components/notifications/NotificationManager";
import Utils from "./services/Utils";
import { ordersData, salesData, customersData } from "./data/common";


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
    notificationManager.show(Utils.getMessageData());
  });
});