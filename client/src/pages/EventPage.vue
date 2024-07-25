<script setup>
import { computed, onMounted } from 'vue';
import { Event } from '../models/Event.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';

const route = useRoute()

const event = computed(() => AppState.activeEvent)
defineProps({ event: Event })

onMounted(() => {
  getEventById()
})


async function getEventById() {
  try {

    await eventsService.getEventById(route.params.eventId)
  } catch (error) {
    Pop.toast("Could not get Event", 'error', 'bottom-start')
    logger.error(error)
  }
}
</script>

<template>
  <div class="container-fluid">
    <section v-if="event" class="row p-4  ">
      <img :src="event.coverImg" class="img-fluid" alt="">
      <section>
        <div class="row">
          <div class="col-md-7 p-4">
            <div class="card w-75 mb-3">
              <div class="card-body">
                <p class="fs-2">{{ event.name }}</p>
                <p>{{ event.type }}</p>
                <p>{{ event.description }}</p>
                <div>
                  <p class="fs-4 fw-bold">Date and Time</p>
                  <p><i class="mdi mdi-calendar"></i>{{ event.startDate }}</p>
                </div>
                <div>
                  <p class="fs-4 fw-bold">Location</p>
                  <p> <i class="mdi mdi-map-marker"></i>{{ event.location }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 p-4">
            <div class="card mb-3 text-center">
              <div class="card-body">
                <p class="fs-4 fw-bold">Interested in going?</p>
                <p>Grab a ticket!</p>
                <div>
                  <button class="btn btn-primary">Attend</button>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end pb-5 mb-3">
              <p>2 spots left</p>
            </div>

            <div class="card mb-3 ">
              <div class="card-body">
                <p class="fs-4 fw-bold">Attendees</p>
                <div class="pb-2">
                  <img
                    src="https://images.unsplash.com/photo-1517242027094-631f8c218a0f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxlZ28lMjAlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D"
                    class="avatar" alt="">
                </div>
                <div class="pb-2">
                  <img
                    src="https://images.unsplash.com/photo-1517242027094-631f8c218a0f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxlZ28lMjAlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D"
                    class="avatar" alt="">
                </div>
                <div class="pb-2">
                  <img
                    src="https://images.unsplash.com/photo-1517242027094-631f8c218a0f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxlZ28lMjAlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D"
                    class="avatar" alt="">
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </section>
  </div>
</template>


<style lang="scss" scoped>
img {
  object-fit: cover;
  height: 40vh;
}

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
