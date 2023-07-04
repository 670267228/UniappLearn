/* const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8081/v1/api"
    : "https:www.gzamon.wang/api"; */

// 一些开发请求中的配置环境

import Request from "./request";

// 请求路径

var baseUrl = "http://localhost:3000";
// #ifdef APP-PLUS || MP-WEIXIN
// baseUrl = "http://122.51.183.19";
// #endif

const config = {
  baseUrl: baseUrl,
};

const reqInterceptor = async (options) => {
  uni.showLoading({
    title: "加载中.....",
  });

  _requestLog(options, "成功通过");

  return options;
};

const resInterceptor = async (response, conf = {}) => {
  uni.hideLoading();
  const statusCode = response.statusCode;
  if (statusCode >= 200 && statusCode < 300) {
    _responseLog(response, conf, "response 200-299");
    return response.data;
  } else if (statusCode === 500) {
    console.log("statusCode:" + statusCode);
    uni.showToast({
      icon: "none",
      title: "服务器报错",
    });
    _responseLog(response, conf, "response 500");

    return {
      // 根据当前字段判断是否reject  主要配置reject返回的内容
      wakaryReqToReject: true,
      msg: "服务器错误",
      res: response,
    };
  } else {
    uni.showToast({
      icon: "none",
      title: "服务器异常",
    });
    _responseLog(response, conf, "response 300-499");
    return {
      wakaryReqToReject: true,
      msg: "这是提示的信息",
      res: response,
    };
  }
};

const req = new Request(config, reqInterceptor, resInterceptor);

// 请求日志打印

function _requestLog(req, describe = null) {
  // 不同环境配置不同的输出内容
  if (process.env.NODE_ENV === "development") {
  }
}

function _responseLog(res, conf = {}, describe = null) {
  let _statusCode = res.statusCode;
  if (process.env.NODE_ENV === "development") {
  }

  if (_statusCode === 500) {
  }
}

export default req;
