import { requestConfig } from "./common";

// 一些请求方面的封装

export default class Request {
  constructor(
    config = {},
    reqInterceptor = null,
    resInterceptor = null,
    successHandler = null,
    failHandler = null,
    completeHandler = null
  ) {
    // 基础配置

    this.baseUrl = config.baseUrl;
    (this.header = config.header || {
      "Content-Type": "application/json;charset=UTF-8",
    }),
      // 一些请求的基础配置设置

      (this.success = successHandler);
    this.fail = failHandler;
    this.complete = completeHandler;

    // 拦截器
    this.requestInterceptor = reqInterceptor;
    this.responseInterceptor = resInterceptor;
  }

  async request(
    options,
    successHandler = null,
    failHandler = null,
    completeHandler = null
  ) {
    const task = options.task || false;
    const type = options.type || "request";

    // 删除配置任务

    let config = null;

    try {
      config = await requestConfig(
        this,
        options,
        successHandler,
        failHandler,
        completeHandler
      );
    } catch (e) {
      // 失败返回错误
      return Promise.reject(e);
    }
    // 如果配置是空的或者不是一个对象的状况

    if (!config || typeof config != "object") {
      return Promise.reject({});
    }

    const that = this;

    // 处理任务存在的情况

    if (task) {
      config["success"] = (response) => {
        if (that.responseInterceptor) {
          that.responseInterceptor(response, config);
        }
        that.success && that.success(response);
        successHandler && successHandler(response);
      };
      config["fail"] = (response) => {
        that.fail && that.fail(response);
        failHandler && failHandler(response);
      };
      config["complete"] = (response) => {
        that.complete && that.complete(response);
        completeHandler && completeHandler(response);
      };

      if (type === "request") {
        return uni.request(config);
      } else if (type === "upload") {
        return uni.uploadFile(config);
      } else {
        return uni.downloadFile(config);
      }
      return;
    }
    return new Promise((resolve, reject) => {
      config["success"] = (response) => {
        let _res = null;
        if (that.responseInterceptor) {
          _res = that.responseInterceptor(response, config);
        }
        that.success && that.success(response);
        successHandler && successHandler(response);

        // 判断promise状态

        if (_res.wakaryReqReject) {
          delete _res.wakaryReqReject;
          reject(_res);
        } else {
          resolve(_res);
        }
      };
      config["fail"] = (error) => {
        that.fail && that.fail(error);
        failHandler && failHandler(error);

        //    失败返回reject

        reject(error);
      };

      config["complete"] = (response) => {
        that.complete && that.complete(response);
        completeHandler && completeHandler(response);
      };

      if (type === "request") {
        uni.request(config);
      } else if (type === "upload") {
        uni.uploadFile(config);
      } else {
        uni.downloadFile(config);
      }
    });
  }
}
