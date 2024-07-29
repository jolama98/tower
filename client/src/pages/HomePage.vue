<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import CreateEventForm from '../components/CreateEventForm.vue';


const categoryFilter = ref('all')

const events = computed(() => {
  if (categoryFilter.value == 'all') {
    return AppState.events
  }
  return AppState.events.filter(event => event.type == categoryFilter.value)
})

const categories = ['all', 'concert', 'convention', 'sport', 'digital']


const event = computed(() => AppState.events)


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
  <div class="container-fluid">
    <section class="row pb-3">
      <div class="col-12 header-img d-flex align-items-end">
        <div class="text-light ">
          <p class="shadow-lg ">Event management for people, by people</p>
          <p class="shadow-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error illo dolores, excepturi vero
            accusamus ab vel, asperiores animi deleniti odio inventore adipisci, quaerat ratione ex ipsam dolore
            repellendus aut ullam.</p>
        </div>
      </div>
    </section>
    <!-- add even / search -->

    <section class="container">
      <div class="row">
        <div>
          <p class="fs-2 fw-bold m-1">
            How it works
          </p>
        </div>
        <div class="d-flex justify-content-around ">
          <div class="col-md-4">
            <div role="button" class="card d-flex justify-content-center">
              <div class=" card-body">

                <h5 class="card-title">Start an event to invite your friends</h5>
                <p class="card-text">Create your own Tower event, and draw from a community of millions</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Create an event
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card d-flex justify-content-center">

              <div class="card-body">
                <i class="fs-1 mdi mdi-search-web mdi-spin"></i>
                <h5 class="card-title">Discover events your'er interested in</h5>
                <p class="card-text">Browse though community hosted events for all the things you love</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- categoryFilter btn -->
    <section class="pb-5">
      <div class="row">
        <div class="m-4 d-flex justify-content-start">
          <p class="fs-2 fw-bold m-1">Explore top categories</p>
        </div>
        <div class="d-flex justify-content-around">
          <div class="col-md-2 p-2" v-for="category in categories" :key="category">
            <button @click="categoryFilter = category"
              class=" w-100 text-capitalize btn btn-secondary p-4 rounded text-center text-light fw-bold">
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- EventCard  -->
    <section>
      <div class="row">
        <div class="col-md-4" v-for="event in events" :key="event.id">
          <EventCard :event="event" />
        </div>
      </div>
    </section>
  </div>

  <CreateEventForm />
</template>

<style scoped lang="scss">
.header-img {
  height: 50vh;
  background-image: url('https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
}
</style>
