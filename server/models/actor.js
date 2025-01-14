const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
require('./account');

const ActorSchema = new Schema({
  number: { type: Number, required: true }, // model number
  name: { type: String, required: true }, // model name
  birthday: { type: Date }, // model name
  birthplace: { type: String }, // model name
  discord: { type: SchemaTypes.ObjectId, ref: "Discord" },
  owner: { type: SchemaTypes.ObjectId, ref: "Manager" },
  accounts: [{ type: SchemaTypes.ObjectId, ref: "Account" }],
  profile: {
    avatar: { type: String },
    banner: { type: String },
    description: { type: String },
    plan1Title: { type: String },
    plan1Desc: { type: String },
    plan1Price: { type: Number },
    plan1Discount: { type: Number },
    plan1Enabled: { type: Boolean },
    plan2Title: { type: String },
    plan2Desc: { type: String },
    plan2Price: { type: Number },
    plan2Discount: { type: Number },
    plan2Enabled: { type: Boolean },
    plan3Title: { type: String },
    plan3Desc: { type: String },
    plan3Price: { type: Number },
    plan3Discount: { type: Number },
    plan3Enabled: { type: Boolean },
  },
  contents: [{
    image: String,
    folder: String,
    title: String,
    tags: String,
  }],
  updated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ActorModel = mongoose.model("Actor", ActorSchema);
module.exports = ActorModel;
