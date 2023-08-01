"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const memberSchema = new mongoose_1.Schema({
    status: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
});
// 3. Create a Model.
const Member = (0, mongoose_1.model)("Member", memberSchema);
exports.default = Member;
//# sourceMappingURL=members.js.map