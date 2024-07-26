import { Schema } from "mongoose";


export const EventSchema = new Schema({
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
  name: { type: String, minLength: 3, maxLength: 50, required: true, default: 'Same' },
  description: { type: String, minLength: 15, maxLength: 1000, required: true, default: 'Party with the boys!!!' }, coverImg: { type: String, maxLength: 1000, required: true },
  location: { type: String, minLength: 1, maxLength: 500, required: true },
  capacity: { type: Number, minLength: 1, maxLength: 5000, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, default: 'sport', lowercase: true },
}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

EventSchema.virtual('ticketCount', {
  localField: '_id',
  ref: 'Ticket',
  foreignField: 'eventId',
  count: true
})

