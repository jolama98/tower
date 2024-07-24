<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';


const events = computed(() => AppState.event)
onMounted(() => { getAllEvents() })

async function getAllEvents() {
  try {
    await eventsService.getAllEvents()
  } catch (error) {
    Pop.toast('Could not get all events ❌🎃🎪')
    logger.error(error)
  }
}



</script>

<template>
  <div class="container">
    <section class="row">
      <div class="col-12 header-img">
        <div class="text-light">
          <p class="">Event management for people, by people</p>
          <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error illo dolores, excepturi vero
            accusamus ab vel, asperiores animi deleniti odio inventore adipisci, quaerat ratione ex ipsam dolore
            repellendus aut ullam.</p>
        </div>
      </div>
    </section>
    <section class="container">
      <div class="row">
        <div class="col-md-5"></div>
        <div class="col-md-5"></div>
      </div>
    </section>
    <section>
      <div class="row">
        <div class="col-md-4" v-for="event in events" :key="event.id">
          <EventCard :event="event" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.header-img {
  height: 50vh;
  background-image: url('https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
}
</style>
