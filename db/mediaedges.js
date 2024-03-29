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
    clickByClick: { type: Boolean },
    joystick: { type: Boolean },
}, { timestamps: false, _id: false });
const _camUri = new mongoose_1.Schema({
    hostname: { type: String, required: true },
    port: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: false, _id: false });
const _camPtz = new mongoose_1.Schema({
    id: { type: String, required: true },
    cameraUri: { type: _camUri, required: true },
    // uri: { type: String, required: true },
    model: { type: String },
    cgiUri: { type: String },
    connectionTimeoutInSeconds: { type: Number },
    capabilities: { type: _camPtzCapabilities, required: true },
}, { timestamps: false, _id: false });
const _cams = new mongoose_1.Schema({
    pathName: { type: String, required: true },
    type: { type: String, required: true },
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
    rtspUri: { type: String, required: true },
    auth: { type: _mediaMtxServerAuth, required: true },
}, { timestamps: false, _id: false });
const _mediaEdgeConfigTemplate = new mongoose_1.Schema({
    syncTime: { type: Date, required: true },
    mediaMtxServer: {
        type: _mediaMtxServer,
        required: true,
    },
    ptzGateway: {
        type: _ptzGatewaySchema,
        required: true,
    },
    cloudServerHostname: { type: String, required: true },
    cams: [_cams],
}, { timestamps: false, _id: false });
const _mediaEdgeConfig = new mongoose_1.Schema({
    current: {
        type: _mediaEdgeConfigTemplate,
        required: true,
    },
    next: {
        type: _mediaEdgeConfigTemplate,
        required: false,
    },
}, { timestamps: false, _id: false });
const _onlineCamStatus = new mongoose_1.Schema({
    pathName: { type: String, required: true },
    recordingSequenceName: { type: String },
    sourceType: { type: String, required: true },
    readyTime: { type: Date, required: true },
    tracks: [{ type: String, required: true }],
    bytesReceived: { type: Number, required: true },
    readers: { type: Number, required: true },
}, { timestamps: false, _id: false });
const _mediaEdgeStatus = new mongoose_1.Schema({
    time: { type: Date, required: true },
    uptime: { type: Date, required: true },
    publicIps: [{ type: String, required: true }],
    localIps: [{ type: String, required: true }],
    onlineCams: [_onlineCamStatus],
}, { timestamps: false, _id: false });
const MediaEdgeSchema = new mongoose_1.Schema({
    enabled: { type: Boolean, required: true },
    // address: {
    //   type: _address,
    //   required: true,
    // },
    type: {
        type: String,
        enum: ["edge", "cloud", "controller"],
        required: true,
    },
    config: {
        type: _mediaEdgeConfig,
        required: true,
    },
    status: {
        type: _mediaEdgeStatus,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)("mediaedges", MediaEdgeSchema);
//# sourceMappingURL=mediaedges.js.map