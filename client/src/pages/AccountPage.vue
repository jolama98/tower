<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { ticketService } from '../services/TicketService.js';

const account = computed(() => AppState.account)
const accountEvent = computed(() => AppState.accountEvents)

onMounted(() => {
  getAccountEventTicket()
})


async function getAccountEventTicket() {
  try {
    await ticketService.getAccountEventTicket()
  } catch (error) {
    Pop.toast("could not get account ticket event ", 'error')
    logger.error(error)
  }
}
async function deleteAlbumMember(accountEventId) {
  try {
    const choice = await Pop.confirm("are you sure you", 'question')
    if (choice == false) {
      Pop.toast("action canceled successfully 👺", 'info', 'center')
      return
    }

    //   await ticketService.deleteAlbumMember(accountEventId)
    //   Pop.success("Album Member Deleted!")
    // } catch (error) {
    //   Pop.toast("YOU MUST ATTEND", 'error')
    //   logger.error(error)
    // }
  }
</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>

      <div class="container">
        <section class="row g-3">


          <div v-for="accountEvents in  accountEvent " :key="accountEvents.id" class="col-md-3">
            <div class="card d-flex justify-content-center">
              <div>
                <img :src="accountEvents.event.coverImg" class="card-img" alt="">
              </div>
              <div class="card-body">
                <p class="card-text">{{ accountEvents.event.name }}</p>
              </div>

              <div class="d-flex justify-content-center">
                <button @click="deleteAlbumMember(accountEvents.id)" class="btn btn-danger"> Stop Collaboration<i
                    class="mdi mdi-delete-forever"></i></button>
              </div>

            </div>
          </div>

        </section>
      </div>
    </div>

    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-img {
  border-radius: 20px;
  object-fit: cover;
  // object-position: center;
}
</style>
