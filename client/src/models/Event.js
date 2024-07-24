
export class Event {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creator
    this.name = data.name
    this.description = data.description || 'Lame description'
    this.coverImg = data.coverImg
    this.location = data.location
    this.startDate = data.startDate
    this.isCanceled = data.isCanceled
    this.capacity = data.capacity
    this.creator = data.creator
    this.type = data.type
  }

}
