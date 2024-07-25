<script setup>
import { computed, onMounted } from 'vue';
import { Event } from '../models/Event.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';

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
  }
}
</script>

<template>
  <div class="container">
    <section v-if="event">
      <img :src="event.coverImg" alt="">
    </section>
  </div>
</template>


<style lang="scss" scoped></style>
