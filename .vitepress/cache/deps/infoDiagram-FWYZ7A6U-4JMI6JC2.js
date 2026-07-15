import {
  parse
} from "./chunk-7NVANKWM.js";
import "./chunk-WLOXCTCW.js";
import "./chunk-7BYBACHE.js";
import "./chunk-T74TDYMQ.js";
import "./chunk-XQUOO7YF.js";
import "./chunk-D223NA6E.js";
import "./chunk-G5JH4ZOL.js";
import "./chunk-7QV5LHHI.js";
import "./chunk-VSGZBCGW.js";
import "./chunk-E3DKZNOQ.js";
import "./chunk-NF4YVJDK.js";
import "./chunk-4D54LLJX.js";
import "./chunk-ARQWDEZH.js";
import "./chunk-ON5DZRO7.js";
import "./chunk-CUVWAPZL.js";
import "./chunk-3LRMBH6U.js";
import "./chunk-TKCMEPRN.js";
import {
  selectSvgElement
} from "./chunk-HES3K7BM.js";
import {
  configureSvgSize
} from "./chunk-DLGGCRHX.js";
import {
  log
} from "./chunk-Z7LTCI4N.js";
import {
  __name
} from "./chunk-JNXZZ3FW.js";
import "./chunk-X25265O2.js";
import "./chunk-DC5AMYBS.js";

// node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-FWYZ7A6U.mjs
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: "11.16.0" + (true ? "" : "-tiny")
};
var getVersion = __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-FWYZ7A6U-4JMI6JC2.js.map
