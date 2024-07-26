<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { eventsService } from '../services/EventsService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';


const router = useRouter()


const eventData = ref({
  name: '',
  location: '',
  capacity: '',
  startDate: '',
  coverImg: '',
  type: '',
  description: ''
})

function resetFrom() {
  eventData.value = {
    name: '',
    location: '',
    capacity: '',
    startDate: '',
    coverImg: '',
    type: '',
    description: ''
  }
}
async function createEvent() {
  try {
    const newEvent = await eventsService.createEvent(eventData.value)
    Pop.success(`You did it! ${eventData}`)
    resetFrom()
    Modal.getOrCreateInstance('#staticBackdrop').hide()
    router.push({ name: 'Event', params: { eventId: newEvent.id } })

  } catch (error) {
    Pop.toast('Could not create album', 'error', 'center-start')
    logger.error(error)
  }
}


</script>


<template>
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createEvent">
            <h1>Create New Event</h1>
            <div class="row">
              <div class="col-md-5">
                <div class="mb-3">
                  ima preview here
                </div>
              </div>
              <div class="col-md-7">
                <div class="mb-3">
                  <label for="Event-title">Title</label>
                  <input v-model="eventData.name" class="form-control" type="text" id="Event-title" name="Event-title"
                    minlength="3" maxlength="50" required>
                </div>
                <div class="mb-3">
                  <label for="Event-location">Event Location</label>
                  <input v-model="eventData.location" class="form-control" type="text" id="Event-location"
                    name="Event-location" minlength="1" maxlength="1000" required>
                </div>
                <div class="mb-2 col-12">
                  <label for="Event-Type">Event Type</label>
                  <select v-model="eventData.type" required class="form-control" name="Event-Type" id="Event-Type">
                    <option value="" disabled>Please Select A Type</option>
                    <option value="all">All</option>
                    <option value="concert">Concert</option>
                    <option value="convention">Conventions</option>
                    <option value="sport">Sports</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>

                <div class="row
          ">
                  <div class="col-md-7">
                    <div class="mb-3">
                      <label for="event-date">Start Date</label>
                      <input v-model="eventData.startDate" class="form-control" type="date" id="event-date"
                        name="event-date">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label for="event-capacity">Capacity</label>
                      <input v-model="eventData.capacity" class="form-control" type="number" id="event-Capacity"
                        name="event-capacity" min="1" max="5000">
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="event-img">Image URL</label>
                  <input v-model="eventData.coverImg" class="form-control" type="url" id="event-img" name="event-img"
                    maxlength="5000" required>
                </div>
              </div>
              <div class="mb-3">
                <label for="Description" class="form-label">Event Description</label>

                <textarea v-model="eventData.description" minlength="15" maxlength="1000" required class="form-control"
                  id="Description" rows="3">
        </textarea>

              </div>
            </div>
            <button type="button" @click="resetFrom()" class="btn btn-danger">clear</button>
            <button class="btn btn-primary">Create Event</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
