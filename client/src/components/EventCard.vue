<script setup>
import { RouterLink } from 'vue-router';
import { Event } from '../models/Event.js';

defineProps({ event: Event })
</script>


<template>
  <div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
    <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
      <img :src="event.coverImg" class="card-img-top" alt="...">
    </router-link>
    <div class="card-body">
      <h5 class="card-title">{{ event.name }}</h5>
      <p>Hosted by {{ event.creator.name }}</p>
      <p>{{ event.startDate }}</p>
    </div>

  </div>
</template>


<style lang="scss" scoped></style>

const events = {
  "isCanceled": false,
  "type": "sport",
  "_id": "66a037fbc762ce511f6c145b",
  "creatorId": "6691cd264de80d398f94368a",
  "name": "B.C.W Convention",
  "description": "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.",
  "coverImg": "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
  "location": "At The Social Expo Center",
  "capacity": 179,
  "startDate": "2024-07-31T06:00:00.000Z",
  "__v": 0,
  "creator": {
    "_id": "6691cd264de80d398f94368a",
    "subs": [
      "auth0|6691cd26724b1bf53b4583ef"
    ],
    "email": "bartdude19@dude.com",
    "name": "bartdude19",
    "picture": "https://s.gravatar.com/avatar/7712820af5b5656a3dde11d4c5d5f5a5?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fba.png",
    "createdAt": "2024-07-23T20:51:06.094Z",
    "updatedAt": "2024-07-23T20:51:06.094Z",
    "__v": 0,
    "id": "6691cd264de80d398f94368a"
  },
  "id": "66a037fbc762ce511f6c145b"
}
