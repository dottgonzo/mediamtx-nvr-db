"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MediaManagerSchema = new mongoose_1.Schema({
    edges: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "mediaedges" }],
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Member" }],
});
exports.default = (0, mongoose_1.model)("mediamanagers", MediaManagerSchema);
//# sourceMappingURL=mediamanagers.js.map