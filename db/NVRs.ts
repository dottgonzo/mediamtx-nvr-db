import type { TAler9PathAddOrEdit } from "aler9-server-manager";
import { model, Model, Schema } from "mongoose";

export type TMediaMxServerConfig = {
  uri: string;
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
export type TNVR = {
  enabled: boolean;
  syncTime: Date;
  mediaMtxServer: TMediaMxServerConfig;
  ptzGateway: {
    uri: string;
    token: string;
  };
  cams: {
    pathName: string;
    mediaMtxPathConfig: TAler9PathAddOrEdit;
    ptz?: {
      capabilities: {
        zoom?: boolean;
        panTilt?: boolean;
        clickToCenter?: boolean;
      };
      uri: string;
    };
  }[];
};
const _ptzGatewaySchema = new Schema(
  {
    uri: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: false }
);
const _camPtzCapabilities = new Schema(
  {
    zoom: { type: Boolean },
    panTilt: { type: Boolean },
    clickToCenter: { type: Boolean },
  },
  { timestamps: false }
);
const _camPtz = new Schema(
  {
    uri: { type: String, required: true },
    capabilities: { type: _camPtzCapabilities, required: true },
  },
  { timestamps: false }
);

const _cams = new Schema(
  {
    pathName: { type: String, required: true },
    mediaMtxPathConfig: { type: Schema.Types.Mixed, required: true },
    ptz: { type: _camPtz },
  },
  { timestamps: false }
);
const _mediaMtxServerAuth = new Schema(
  {
    type: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: false }
);
const _mediaMtxServer = new Schema(
  {
    uri: { type: String, required: true },
    auth: { type: _mediaMtxServerAuth, required: true },
  },
  { timestamps: false }
);
const NVRSchema = new Schema({
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
interface NVRBaseDocument extends TNVR, Document {}

export interface NVRDocument extends NVRBaseDocument {
  createdAt?: Date;
  updatedAt?: Date;
}
export interface NVRPopulatedDocument extends NVRBaseDocument {
  createdAt: Date;
  updatedAt: Date;
}
export interface NVRModel extends Model<NVRDocument> {}

export default model<NVRDocument, NVRModel>("NVRs", NVRSchema);
