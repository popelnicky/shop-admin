import FetchError from "../errors/FetchError";

export default class DataProvider {
  static BACKEND_URL = "https://course-js.javascript.ru/api/";
  static ORDERS_API = "dashboard/orders";
  static SALES_API = "dashboard/sales";
  static CUSTOMERS_API = "dashboard/customers";
  static BESTSELLERS_API = "dashboard/bestsellerss";

  static getDashboardOrders() {
    return this.get(`${this.BACKEND_URL}${this.ORDERS_API}`);
  }

  static getDashboardSales() {
    return this.get(`${this.BACKEND_URL}${this.SALES_API}`);
  }

  static getDashboardCustomers() {
    return this.get(`${this.BACKEND_URL}${this.CUSTOMERS_API}`);
  }

  static getDashboardBestsellers() {
    return this.get(`${this.BACKEND_URL}${this.BESTSELLERS_API}`);
  }

  // same as fetch, but throws FetchError in case of errors
  // status >= 400 is an error
  // network error / json error are errors
  static async get(url, params) {
    let response;

    try {
      response = await fetch(url, params);
    } catch (err) {
      throw new FetchError(response, "Network error has occurred.");
    }

    let body;

    if (!response.ok) {
      let errorText = response.statusText; // Not Found (for 404)

      try {
        body = await response.json();
        errorText = (body.error && body.error.message) || (body.data && body.data.error && body.data.error.message) || errorText;
      } catch (error) { /* ignore failed body */ }

      let message = `Error ${response.status}: ${errorText}`;

      throw new FetchError(response, body, message);
    }

    try {
      return await response.json();
    } catch (err) {
      throw new FetchError(response, null, err.message);
    }
  }
}
