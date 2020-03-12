import FetchError from "./errors/FetchError";
import ColumnChart from "./components/ColumnChart";
import Tooltip from "./components/Tooltip";
import ErrorNotificationMessage from "./components/notifications/ErrorNotificationMessage";
import Utils from "./services/Utils";
import CalendarRangePicker from "./components/calendar/CalendarRangePicker";
import DataProvider from "./services/DataProvider";

// Calendar Range Picker component
const calendar = document.getElementById("range-picker-root");
const to = new Date();
const from = new Date(to - (30 * 24 * 60 * 60 * 1000));


calendar.append(new CalendarRangePicker(from, to));

// ColumnChart component
const chart = document.getElementById("charts-root");

chart.append(new ColumnChart(Utils.getChartData("orders"), "dashboard__chart_orders"));
chart.append(new ColumnChart(Utils.getChartData("sales", "$"), "dashboard__chart_sales"));
chart.append(new ColumnChart(Utils.getChartData("customers"), "dashboard__chart_customers"));

new Tooltip();

document.addEventListener("pointerdown", event => {
  const $target = event.target.closest(".sidebar__toggler");
  
  if ($target) {
    document.body.classList.toggle("is-collapsed-sidebar");
  }
});

// handle uncaught failed fetch through
window.addEventListener('unhandledrejection', event => {
  if (event.reason instanceof FetchError) {
    const parent = document.body.querySelector(".notification__container");

    new ErrorNotificationMessage({message: event.reason.message}).show(parent);
  }
});

DataProvider.getDashboardBestsellers().then(data => {
  console.log(data);
});

