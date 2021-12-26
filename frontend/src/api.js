import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** Reptifeed API
 * 
 * The ReptifeedApi class centralizes all possible calls to the backend.
 * If writing more calls to the backend or the Reptifeed API, put them here!
 */

class ReptifeedApi {
  /** If there is a token, it is stored in this variable and can be called with ReptifeedApi.token */
  static token;

  /** request: centralizes the core logic of all API calls in this class.
   * All furture calls to be written will follow the following format:
   * 
   * const res = await this.request(endpoint, data, method);
   * return res.value;
   */
  static async request(endpoint, data = {}, method = 'get') {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = {Authorization: `Bearer ${this.token}`};
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, headers, params })).data;
    } catch (err) {
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    };
  };

  /////////////////
  // USER ROUTES //
  /////////////////

  static async register(data) {
    const res = await this.request('auth/register', data, 'post');
    return res; // Returns { id, token }
  };

  static async login(data) {
    const res = await this.request('auth/login', data, 'post');
    return res; // Returns { id, token }
  };

  static async createUser(data) {
    const res = await this.request('users', data, 'post');
    return res;
  };

  static async getAllUsers() {
    const res = await this.request('users');
    return res.users;
  };

  static async getUser(id) {
    const res = await this.request(`users/${id}`);
    return res.user;
  };

  static async updateUser(id, data) {
    const res = await this.request(`users/${id}`, data, 'patch');
    return res.updatedUser
  };

  static async deleteUser(id) {
    const res = await this.request(`users/${id}`, {}, 'delete');
    return res.deleted;
  };

  ////////////////////
  // REPTILE ROUTES //
  ////////////////////

  static async createReptile(data) {
    const res = await this.request(`reptiles`, data, 'post');
    return res.reptile;
  };

  static async getAllReptiles() {
    const res = await this.request(`reptiles`);
    return res.reptiles;
  };

  static async getReptilesByOwner(ownerId) {
    const res = await this.request(`reptiles/owner/${ownerId}`);
    return res.reptiles;
  }

  static async getReptile(id) {
    const res = await this.request(`reptiles/${id}`);
    return res.reptile;
  };

  static async updateReptile(id, data) {
    const res = await this.request(`reptiles/${id}`, data, 'patch');
    return res.reptile;
  };
  
  static async deleteReptile(id) {
    const res = await this.request(`reptiles/${id}`, {}, 'delete');
    return res.deleted;
  };

  ///////////////////
  // PANTRY ROUTES //
  ///////////////////

  static async getPantry(userId) {
    const res = await this.request(`pantries/${userId}`);
    return res.pantry;
  };

  static async addToPantry(userId, data) {
    const res = await this.request(`pantries/${userId}`, data, 'post');
    return res.newFood;
  };

  static async removeFromPantry(userId, foodName) {
    const res = await this.request(`pantries/${userId}/${foodName}`, {}, 'delete');
    return res.deleted;
  };

  /////////////////////
  // FOOD API ROUTES //
  /////////////////////

  static async getFoodsBySpecies(species, searchTerm = '') {
    const res = await this.request(`api/${species}/foods`, searchTerm);
    return res.foods;
  };
  
  static async getFood(species, food) {
    const res = await this.request(`api/${species}/foods/${food}`);
    return res.food;
  };

  static async getFoodByType(species, type) {
    const res = await this.request(`api/${species}/types/${type}`);
    return res.foods;
  };
  
  static async getTreats(species) {
    const res = await this.request(`api/${species}/treats`);
    return res.treats;
  };
};

export default ReptifeedApi;