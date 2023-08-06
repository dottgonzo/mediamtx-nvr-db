"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _member = new mongoose_1.Schema({
    member: { type: mongoose_1.Schema.Types.ObjectId, ref: "Member" },
    role: { type: String, required: true },
}, { timestamps: false, _id: false });
const MediaManagerSchema = new mongoose_1.Schema({
    edges: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "mediaedges" }],
    members: [{ type: _member }],
    // cameras: [{ type: { type: Schema.Types.ObjectId, ref: "Camera" } }],
});
exports.default = (0, mongoose_1.model)("mediamanagers", MediaManagerSchema);
//# sourceMappingURL=mediamanagers.js.map