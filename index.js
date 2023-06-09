"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = exports.db = void 0;
const nodemongooselib_1 = __importDefault(require("nodemongooselib"));
const MediaEdges_1 = __importDefault(require("./db/MediaEdges"));
async function initDb(config) {
    await (0, nodemongooselib_1.default)(config);
    if (!exports.db)
        exports.db = {
            MediaEdges: MediaEdges_1.default,
        };
}
exports.initDb = initDb;
//# sourceMappingURL=index.js.map