"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const _address = new Schema(
//   {
//     publicIp: { type: String, required: true },
//     localIp: { type: String },
//     publicPort: { type: String, required: true },
//     localPort: { type: String },
//     publicHostname: { type: String },
//   },
//   { timestamps: false, _id: false }
// );
const _ptzGatewaySchema = new mongoose_1.Schema({
    uri: { type: String, required: true },
    token: { type: String, required: true },
}, { timestamps: false, _id: false });
const _camPtzCapabilities = new mongoose_1.Schema({
    zoom: { type: Boolean },
    move: { type: Boolean },
    clickToCenter: { type: Boolean },
    gotoHome: { type: Boolean },
}, { timestamps: false, _id: false });
const _camUri = new mongoose_1.Schema({
    hostname: { type: String, required: true },
    port: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: false, _id: false });
const _camPtz = new mongoose_1.Schema({
    uri: { type: String, required: true },
    capabilities: { type: _camPtzCapabilities, required: true },
    id: { type: String, required: true },
    model: { type: String },
    cgiUri: { type: String },
    connectionTimeoutInSeconds: { type: Number },
    cameraUri: { type: _camUri, required: true },
}, { timestamps: false, _id: false });
const _cams = new mongoose_1.Schema({
    pathName: { type: String, required: true },
    mediaMtxPathConfig: { type: mongoose_1.Schema.Types.Mixed, required: true },
    ptz: { type: _camPtz },
}, { timestamps: false, _id: false });
const _mediaMtxServerAuth = new mongoose_1.Schema({
    type: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: false, _id: false });
const _mediaMtxServer = new mongoose_1.Schema({
    apiUri: { type: String, required: true },
    webrtcUri: { type: String, required: true },
    auth: { type: _mediaMtxServerAuth, required: true },
}, { timestamps: false, _id: false });
const NVRSchema = new mongoose_1.Schema({
    enabled: { type: Boolean, required: true },
    // address: {
    //   type: _address,
    //   required: true,
    // },
    ptzGateway: {
        type: _ptzGatewaySchema,
        required: true,
    },
    mediaMtxServer: {
        type: _mediaMtxServer,
        required: true,
    },
    cams: [_cams],
    syncTime: { type: Date, required: true },
});
exports.default = (0, mongoose_1.model)("NVRs", NVRSchema);
//# sourceMappingURL=NVRs.js.map