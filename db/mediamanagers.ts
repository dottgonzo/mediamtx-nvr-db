import { Model, Schema, model } from "mongoose";

export type TMediaManager = {
  edges: any[];
  members: any[];
};

const MediaManagerSchema = new Schema({
  edges: [{ type: Schema.Types.ObjectId, ref: "mediaedges" }],
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
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
