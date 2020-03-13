import FetchError from "./errors/FetchError";
import ColumnChart from "./components/ColumnChart";
import Tooltip from "./components/Tooltip";
import ErrorNotificationMessage from "./components/notifications/ErrorNotificationMessage";
import DataProvider from "./services/DataProvider";
import TempRangePicker from "./components/TempRangePicker";
import BestsellersTable from "./components/tables/BestsellersTable";

// ColumnChart component
const $chart = document.getElementById("charts-root");
const ordersChart = new ColumnChart("Orders", "dashboard__chart_orders");
const salesChart = new ColumnChart("Sales", "dashboard__chart_sales");
const customersChart = new ColumnChart("Customers", "dashboard__chart_customers");

$chart.append(ordersChart.$element);
$chart.append(salesChart.$element);
$chart.append(customersChart.$element);

// Calendar Range Picker component
document.addEventListener("date-select", event => {
  DataProvider.getOrders(event.detail).then(data => {
    ordersChart.update(data);
  });
  DataProvider.getSales(event.detail).then(data => {
    salesChart.update(data);
  });
  DataProvider.getCustomers(event.detail).then(data => {
    customersChart.update(data);
  });
});

const $calendar = document.getElementById("range-picker-root");
const to = new Date();
const from = new Date(to - (30 * 24 * 60 * 60 * 1000));
const rangePicker = new TempRangePicker({ from, to });

$calendar.append(rangePicker.$element);

rangePicker.dispatchEvent();

// Here will be my SortableTable component
const $bestsallers = document.getElementById("sortable-table-root");
const bestsallersTable = new BestsellersTable({
  isSortLocally: true
});

$bestsallers.append(bestsallersTable.$element);

DataProvider.getBestsellers().then(data => {
  bestsallersTable.update(data);
});

// Tooltip component
new Tooltip();

// Toggle sidebar
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