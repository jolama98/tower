<script setup>
import { RouterLink } from 'vue-router';
import { Event } from '../models/Event.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
defineProps({ event: Event })



function setActiveEvent(event) {
  eventsService.setActiveEvent(event)
  logger.log(eventsService.setActiveEvent)
}

</script>

<template>
  <div class="card-text card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
    <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
      <img @click="setActiveEvent()" :src="event.coverImg" class="card-img-top" alt="...">
    </router-link>
    <div class="card-body ">
      <h5 class="card-title d-flex justify-content-center">{{ event.name }}</h5>
      <p class="d-flex justify-content-center">Hosted by {{ event.creator.name }}</p>
      <p class="d-flex justify-content-center">{{ event.startDate.toLocaleDateString() }}</p>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.card-text {
  font-family: "Prompt", sans-serif;
  font-weight: 100;
  font-style: normal;
}

img {
  object-fit: cover;
  max-height: 41vh
}

img:hover {
  opacity: 0.5;
}
</style>
