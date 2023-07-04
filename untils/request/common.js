// 公共的一些拦截

export async function requestConfig(
    ins,
    options,
    successHandler = null,
    fallHandler = null,
    completeHandler = null
  ) {
    // 基础配置 请求头和基本路劲
  
    ins.header = options.header || ins.header;
    ins.baseUrl = options.baseUrl || ins.baseUrl;
  
    // 基础配置
  
    let config = {
      url: ins.baseUrl + options.url,
      header: ins.header,
    };
  
    if (ins.requestInterceptor) {
      // 请求拦截处理
  
      let _cg = null;
      try {
        _cg = await ins.requestInterceptor(Object.assign({}, options, config));
      } catch (e) {
        // 请求异常处理
  
        return false;
      }
      // 配置项为空或者是错误失败的情况，不需要请求
  
      if (!_cg || typeof _cg !== "object") {
        return false;
      }
  
      // 更新配置项
      Object.assign(options, _cg);
  
      // 更新基本的配置项，改变一些请求的url和头部的拦截
  
      config.url = options.url;
      config.header = options.header;
    }
  
    const type = options.type || "request";
  
    //   配置属性项的属性细节，不直接进行配置，移除不需要的属性
    if (type === "request") {
      config["data"] = options.data || options.params || {};
      config["method"] = options.method || "GET";
      config["dataType"] = options.dataType || "json";
      config["responseType"] = options.responseType || "text";
    } else if (type === "upload") {
      config["filePath"] = options.filePath;
      config["name"] = options.filePath;
      config["method"] = options.filePath || "POST";
      config["formData"] = options.filePath;
      config["fileType"] = options.filePath || "image";
      delete config.header["Content-Type"];
    }
  
    return config;
  }
  