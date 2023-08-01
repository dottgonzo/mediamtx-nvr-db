"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = exports.db = void 0;
const nodemongooselib_1 = __importDefault(require("nodemongooselib"));
const mediaedges_1 = __importDefault(require("./db/mediaedges"));
const mediamanagers_1 = __importDefault(require("./db/mediamanagers"));
const members_1 = __importDefault(require("./db/members"));
async function initDb(config) {
    await (0, nodemongooselib_1.default)(config);
    if (!exports.db)
        exports.db = {
            mediaedges: mediaedges_1.default,
            members: members_1.default,
            mediamanagers: mediamanagers_1.default,
        };
}
exports.initDb = initDb;
//# sourceMappingURL=index.js.map