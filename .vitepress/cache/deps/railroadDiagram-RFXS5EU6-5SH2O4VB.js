import {
  db,
  getStyles,
  renderer
} from "./chunk-ICFMDZQH.js";
import {
  populateCommonDb
} from "./chunk-UOR73F4S.js";
import {
  MermaidParseError
} from "./chunk-7NVANKWM.js";
import "./chunk-WLOXCTCW.js";
import "./chunk-7BYBACHE.js";
import "./chunk-T74TDYMQ.js";
import "./chunk-XQUOO7YF.js";
import "./chunk-D223NA6E.js";
import {
  createRailroadServices
} from "./chunk-G5JH4ZOL.js";
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
import "./chunk-HES3K7BM.js";
import "./chunk-DLGGCRHX.js";
import {
  log
} from "./chunk-Z7LTCI4N.js";
import {
  __name
} from "./chunk-JNXZZ3FW.js";
import "./chunk-X25265O2.js";
import "./chunk-DC5AMYBS.js";

// node_modules/mermaid/dist/chunks/mermaid.core/railroadDiagram-RFXS5EU6.mjs
var langiumParser = createRailroadServices().Railroad.parser.LangiumParser;
var transformExpression = __name((expr) => {
  switch (expr.$type) {
    case "RailroadTerminalExpr":
      return {
        type: "terminal",
        value: expr.value
      };
    case "RailroadNonTerminalExpr":
      return {
        type: "nonterminal",
        name: expr.name
      };
    case "RailroadSpecialExpr":
      return {
        type: "special",
        text: expr.text
      };
    case "RailroadSequenceExpr": {
      const elements = expr.elements.map(transformExpression);
      return elements.length === 1 ? elements[0] : { type: "sequence", elements };
    }
    case "RailroadChoiceExpr": {
      const alternatives = expr.alternatives.map(transformExpression);
      return alternatives.length === 1 ? alternatives[0] : { type: "choice", alternatives };
    }
    case "RailroadOptionalExpr":
      return {
        type: "optional",
        element: transformExpression(expr.element)
      };
    case "RailroadOneOrMoreExpr":
      return {
        type: "repetition",
        element: transformExpression(expr.element),
        min: 1,
        max: Infinity
      };
    case "RailroadZeroOrMoreExpr":
      return {
        type: "repetition",
        element: transformExpression(expr.element),
        min: 0,
        max: Infinity
      };
    default:
      throw new Error(`Unsupported railroad expression: ${expr.$type}`);
  }
}, "transformExpression");
var transformRule = __name((rule) => {
  return {
    name: rule.name,
    definition: transformExpression(rule.definition)
  };
}, "transformRule");
var populateDb = __name((ast) => {
  populateCommonDb(ast, db);
  if (ast.title) {
    db.setTitle(ast.title);
  }
  ast.rules.map((rule) => db.addRule(transformRule(rule)));
}, "populateDb");
var parser = {
  parse: __name((input) => {
    db.clear();
    log.debug("[Railroad Parser] Starting Langium parse");
    const result = langiumParser.parse(input);
    if (result.lexerErrors.length > 0 || result.parserErrors.length > 0) {
      throw new MermaidParseError(result);
    }
    const ast = result.value;
    log.debug("[Railroad Parser] Parsed rules:", ast.rules.length);
    populateDb(ast);
    log.debug("[Railroad Parser] Parse complete");
  }, "parse"),
  parser: {
    yy: db
  }
};
var diagram = {
  parser,
  db,
  renderer,
  styles: getStyles
};
var railroadDiagram_default = diagram;
export {
  railroadDiagram_default as default,
  diagram
};
//# sourceMappingURL=railroadDiagram-RFXS5EU6-5SH2O4VB.js.map
