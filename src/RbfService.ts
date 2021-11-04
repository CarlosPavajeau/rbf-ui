import { EvalRbf, FitRbf, InitRbf, RbfResponse } from 'models';

import HttpClient from './core/http';

const RbfService = {
  /**
   * Send request to init rbf
   * @param data request body
   */
  init: async (data: InitRbf) => {
    const response = await HttpClient.post<RbfResponse>('/rbf/init', data);
    return response.data;
  },
  /**
   * Send a request to fit rbf
   * @param data request body
   */
  fit: async (data: FitRbf) => {
    const response = await HttpClient.post<RbfResponse>('/rbf/fit', data);
    return response.data;
  },
  /**
   * Send a request to eval rbf
   * @param data request body
   */
  eval: async (data: EvalRbf) => {
    const response = await HttpClient.patch<number>('/rbf/eval', data);
    return response.data;
  },
};

export default RbfService;
