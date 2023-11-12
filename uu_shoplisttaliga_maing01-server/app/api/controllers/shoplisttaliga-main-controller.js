"use strict";
const ShoplisttaligaMainAbl = require("../../abl/shoplisttaliga-main-abl.js");

class ShoplisttaligaMainController {
  init(ucEnv) {
    return ShoplisttaligaMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ShoplisttaligaMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ShoplisttaligaMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ShoplisttaligaMainController();
