import type { TAler9PathAddOrEdit } from "aler9-server-manager";
import { model, Model, Schema } from "mongoose";

export type TMediaMxServerConfig = {
  apiUri: string;
  webrtcUri: string;
  rtspUri: string;
  auth?: {
    type: "basic";
    username: string;
    password: string;
  };
};
export type TSyncEntry4MediaMtxConfig = {
  mediaMtxServer?: TMediaMxServerConfig;
  mediaMtxPathConfig: TAler9PathAddOrEdit;
  pathName: string;
};
export type TSupportedModel = "hikvision" | "dahua" | "axis" | "onvif";
export type TCameraCapabilities = {
  move?: boolean;
  gotoHome?: boolean;
  clickToCenter?: boolean;
  clickByClick?: boolean;
  joystick?: boolean;
  zoom?: boolean;
};
export type TCam = {
  pathName: string;
  type: "audio" | "video" | "regia";
  mediaMtxPathConfig: TAler9PathAddOrEdit;
  ptz?: {
    id: string;
    cameraUri: {
      hostname: string;
      port: number;
      username: string;
      password: string;
    };
    model?: TSupportedModel;
    cgiUri?: string;
    connectionTimeoutInSeconds?: number;
    capabilities: TCameraCapabilities;
  };
};
export type TMediaEdgeConfig = {
  syncTime: Date;
  mediaMtxServer: TMediaMxServerConfig;
  ptzGateway: {
    uri: string;
    token: string;
  };
  cams: TCam[];
};
export type TMediaEdge = {
  enabled: boolean;
  config: { current: TMediaEdgeConfig; next?: TMediaEdgeConfig };
  status: {
    time: Date;
    uptime: number;
    publicIp: string;
    localIp: string;
    onlineCams: {
      pathName: string;
      recordingSequenceName?: string;
    }[];
  };
};
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
const _ptzGatewaySchema = new Schema(
  {
    uri: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: false, _id: false }
);
const _camPtzCapabilities = new Schema(
  {
    zoom: { type: Boolean },
    move: { type: Boolean },
    clickToCenter: { type: Boolean },
    gotoHome: { type: Boolean },
    clickByClick: { type: Boolean },
    joystick: { type: Boolean },
  },
  { timestamps: false, _id: false }
);
const _camUri = new Schema(
  {
    hostname: { type: String, required: true },
    port: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: false, _id: false }
);

const _camPtz = new Schema(
  {
    id: { type: String, required: true },
    cameraUri: { type: _camUri, required: true },
    // uri: { type: String, required: true },
    model: { type: String },
    cgiUri: { type: String },
    connectionTimeoutInSeconds: { type: Number },
    capabilities: { type: _camPtzCapabilities, required: true },
  },
  { timestamps: false, _id: false }
);

const _cams = new Schema(
  {
    pathName: { type: String, required: true },
    type: { type: String, required: true },
    mediaMtxPathConfig: { type: Schema.Types.Mixed, required: true },
    ptz: { type: _camPtz },
  },
  { timestamps: false, _id: false }
);
const _mediaMtxServerAuth = new Schema(
  {
    type: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: false, _id: false }
);
const _mediaMtxServer = new Schema(
  {
    apiUri: { type: String, required: true },
    webrtcUri: { type: String, required: true },
    rtspUri: { type: String, required: true },
    auth: { type: _mediaMtxServerAuth, required: true },
  },
  { timestamps: false, _id: false }
);
const _mediaEdgeConfigTemplate = new Schema(
  {
    syncTime: { type: Date, required: true },
    mediaMtxServer: {
      type: _mediaMtxServer,
      required: true,
    },
    ptzGateway: {
      type: _ptzGatewaySchema,
      required: true,
    },
    cams: [_cams],
  },
  { timestamps: false, _id: false }
);
const _mediaEdgeConfig = new Schema(
  {
    current: {
      type: _mediaEdgeConfigTemplate,
      required: true,
    },
    next: {
      type: _mediaEdgeConfigTemplate,
      required: false,
    },
  },
  { timestamps: false, _id: false }
);

const _onlineCamStatus = new Schema(
  {
    pathName: { type: String, required: true },
    recordingSequenceName: { type: String },
  },
  { timestamps: false, _id: false }
);

const _mediaEdgeStatus = new Schema(
  {
    time: { type: Date, required: true },
    uptime: { type: Date, required: true },
    publicIp: { type: String, required: true },
    localIp: { type: String, required: true },
    onlineCams: [_onlineCamStatus],
  },
  { timestamps: false, _id: false }
);
const MediaEdgeSchema = new Schema({
  enabled: { type: Boolean, required: true },
  // address: {
  //   type: _address,
  //   required: true,
  // },
  config: {
    type: _mediaEdgeConfig,
    required: true,
  },

  status: {
    type: _mediaEdgeStatus,
    required: true,
  },
});
interface MediaEdgeBaseDocument extends TMediaEdge, Document {}

export interface MediaEdgeDocument extends MediaEdgeBaseDocument {
  createdAt?: Date;
  updatedAt?: Date;
}
export interface MediaEdgePopulatedDocument extends MediaEdgeBaseDocument {
  createdAt: Date;
  updatedAt: Date;
}
export interface MediaEdgeModel extends Model<MediaEdgeDocument> {}

export default model<MediaEdgeDocument, MediaEdgeModel>(
  "MediaEdges",
  MediaEdgeSchema
);
