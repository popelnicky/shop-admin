import FetchError from "../errors/FetchError";

export default class DataProvider {
  static BACKEND_URL = "https://course-js.javascript.ru/api/";
  static ORDERS_API = "dashboard/orders";
  static SALES_API = "dashboard/sales";
  static CUSTOMERS_API = "dashboard/customers";
  static BESTSELLERS_API = "dashboard/bestsellers";

  static async getOrders({from , to} = {}) {
    const data = await this.get(`${this.BACKEND_URL}${this.ORDERS_API}`);
    
    return this.getConvertedDataForCharts(data, from, to);
  }

  static async getSales({from , to} = {}) {
    const data = await this.get(`${this.BACKEND_URL}${this.SALES_API}`);

    return this.getConvertedDataForCharts(data, from, to);
  }

  static async getCustomers({from , to} = {}) {
    const data = await this.get(`${this.BACKEND_URL}${this.CUSTOMERS_API}`);

    return this.getConvertedDataForCharts(data, from, to);
  }

  static getBestsellers() {
    return this.get(`${this.BACKEND_URL}${this.BESTSELLERS_API}`);
  }

  static getConvertedDataForCharts(data, from, to) {
    const start = new Date(from);
    const end = new Date(to);
    const target = Object.entries(data).filter(item => {
      const current = new Date(item[0]);

      return current >= start && current <= end;
    });
    const max = new Array(...target).sort((left, right) => {
      if (left[1] > right[1]) return 1;
      if (left[1] == right[1]) return 0;
      if (left[1] < right[1]) return -1;
    })[target.length - 1][1];
    const values = target.reduce((result, item) => {
      const current = new Date(item[0]);
      const date = current.toLocaleString("en", { year: "numeric", month: "short", day: "numeric" });
      const value = item[1];
      const rate = parseInt((50 * value) / max, 10);
      
      result.push({ rate, date, value })

      return result;
    }, []);
    const amount = values.reduce((result, item) => {
      result += item.value;

      return result;
    }, 0);

    return { amount, values };
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
