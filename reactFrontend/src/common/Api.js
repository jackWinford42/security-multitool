import axios from "axios";

const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 */

class RamtApi {
  // the token for interactive with the API will be stored here.
  static token;
  static user;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${RamtApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  static async getCurrUser(email) {
    let res = await this.request(`users/${email}`);
    return res.user;
  }

  static async investigate(susData) {
    let res = await this.request(`investigate`, susData, "post");
    return res;
  }

  static async delCurrUser(email) {
    let res = await this.request(`users/${email}`, {} ,"delete");
    return res;
  }

  static async editCurrUser(newData) {
    let res = await this.request(`users/${RamtApi.user.email}`, newData, "patch");
    return res;
  }

  static async dumpUserHistory(email) {
    let res = await this.request(`uHist/${email}/dump`, {}, "delete");
    return res;
  }

  static async getUserHistory(email) {
    let res = await this.request(`uHist/${email}`)
    return res;
  }

  static async getSiteHistory(range) {
    let res = await this.request(`siteHist/${range}`)
    return res;
  }
}

export default RamtApi;