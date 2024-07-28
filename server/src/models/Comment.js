// TODO reference pictures from postIt for all comment stuff

import { Schema } from "mongoose";

export const CommentsSchema = new Schema({
  // id: { type: Object },
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
  eventId: { type: Schema.ObjectId, required: true, ref: 'Event' },
  body: { type: String, required: true, maxLength: 300 },
}, { toJSON: { virtuals: true } })

CommentsSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

// CommentsSchema.virtual('event', {
//   localField: 'eventId',
//   ref: 'Events',
//   foreignField: '_id',
//   count: true
// })


//!  id, creatorId, eventId, body,
//? creator {virtual}  localField: 'creatorId',
// ref: 'Account',
//   foreignField: '_id',
//     justOne: true
