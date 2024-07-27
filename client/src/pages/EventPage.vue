<script setup>
import { computed, onMounted } from 'vue';
import { Event } from '../models/Event.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { ticketService } from '../services/TicketService.js'
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import { TicketEvent } from '../models/EventGoer.js';

const route = useRoute()
const account = computed(() => AppState.account)
const event = computed(() => AppState.activeEvent)
const eventTicketHolderProfiles = computed(() => AppState.eventTicketHolderProfiles)

const eventGoerProfile = computed(() => AppState.eventTicketHolderProfiles.find(bcw => bcw.accountId == AppState.account.id))

// const isAMember = computed(() => AppState.albumProfiles.find(amp => amp.accountId == AppState.account.id))


// TODO reference isAlbumMember from postIt to see if you are attending the event

defineProps({ event: Event })

onMounted(() => {
  getEventById()
  getEventGoers()
})

async function cancelEvent(eventId) {
  try {
    const whatIPicked = await Pop.confirm("???")
    if (whatIPicked == false) {
      Pop.toast("action canceled successfully 👺", 'info', 'center')
      return
    }
    await eventsService.cancelEvent(eventId)
    Pop.success('Event canceled successfully')
  } catch (error) {
    Pop.error(error)

  }
}


async function getEventGoers() {
  try {
    await ticketService.getEventGoers(route.params.eventId)
  } catch (error) {
    Pop.error(error)
  }
}

async function getEventById() {
  try {

    await eventsService.getEventById(route.params.eventId)
  } catch (error) {
    Pop.toast("Could not get Event", 'error', 'bottom-start')
    logger.error(error)
  }
}

async function getTicket() {
  try {
    const eventData = { eventId: route.params.eventId }
    await ticketService.getTicket(eventData)
    Pop.toast("Got Ticket")
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>

<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Cancel Event? </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex justify-content-around">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button :disabled="event?.isCanceled" @click="cancelEvent(event.id)" type="button" data-bs-dismiss="modal"
            class="btn btn-primary">Cancel
            Event</button>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <section v-if="event" class="row p-4  ">
      <img :src="event.coverImg" class="img-fluid" alt="">
      <div>
        <p v-if="event.isCanceled" class="text-dark bg-danger-subtle d-flex  justify-content-center fs-2">Canceled!</p>
      </div>
      <section>
        <div class="row">
          <div class="col-md-7 p-4">
            <div class="card w-75 mb-3">
              <div class="d-flex justify-content-end">
                <button v-if="account?.id == event.creatorId" role="button" class="m-1 btn btn-outline-secondary"
                  data-bs-toggle="modal" data-bs-target="#exampleModal">
                  ...
                </button>
              </div>
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
                  <button :disabled="event.capacity == event.ticketCount" @click="getTicket()" class="btn btn-primary"
                    v-show="event.capacity != event.ticketCount">Get A Ticket!</button>
                  <button :disabled="event.capacity == event.ticketCount" class=" btn btn-subtle"
                    v-show="event.capacity == event.ticketCount">Sold Out</button>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end pb-5 mb-3">
              <p><samp :class="event.capacity == event.ticketCount ? 'text-danger' : ''">{{ event.capacity -
                event.ticketCount
              }}</samp> spots
                left
              </p>
            </div>

            <div class=" card mb-3 ">
              <div class=" card-body">
                <p class="fs-4 fw-bold">Attendees</p>

                <div class="col-4" v-for="eventGoer in eventTicketHolderProfiles" :key="eventGoer.id">
                  <img class="pb-1 avatar" :src="eventGoer.profile.picture" alt="">
                </div>

                <!-- <div class="col-4" v-for="albumMember in albumMemberProfiles" :key="albumMember.id">
              <img class="img-fluid"  :src="albumMember.profile.picture" alt="it's a face">
            </div> -->


              </div>
            </div>

          </div>

        </div>
      </section>

    </section>
  </div>
</template>


<style lang="scss" scoped>
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

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

