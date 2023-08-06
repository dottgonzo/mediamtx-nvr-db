import { Model, Schema, model } from "mongoose";

export type TMediaManager = {
  edges: any[];
  members: {
    member: any;
    role: string;
  }[];
};

const _member = new Schema(
  {
    member: { type: Schema.Types.ObjectId, ref: "Member" },
    role: { type: String, required: true },
  },
  { timestamps: false, _id: false }
);

const MediaManagerSchema = new Schema({
  edges: [{ type: Schema.Types.ObjectId, ref: "mediaedges" }],
  members: [{ type: _member }],
  // cameras: [{ type: { type: Schema.Types.ObjectId, ref: "Camera" } }],
});

interface MediaManagerBaseDocument extends TMediaManager, Document {}

export interface MediaManagerDocument extends MediaManagerBaseDocument {
  createdAt?: Date;
  updatedAt?: Date;
}
export interface MediaManagerPopulatedDocument
  extends MediaManagerBaseDocument {
  createdAt: Date;
  updatedAt: Date;
}
export interface MediaManagerModel extends Model<MediaManagerDocument> {}

export default model<MediaManagerDocument, MediaManagerModel>(
  "mediamanagers",
  MediaManagerSchema
);
