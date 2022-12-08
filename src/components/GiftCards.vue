<template>

  <img v-if="gift.opened == true" :src="gift.url" class="giftImg">
  <img v-else
    src="https://images.unsplash.com/photo-1589948516895-db76617cb753?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
    @click="openGift(gift.id)">
  <h4 v-if="gift.opened == true" class=" p-1">{{ gift.tag }}</h4>
  <h4 v-else class="text-center">CLICK TO OPEN</h4>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Gift } from "../models/Gift.js";
import { giftsService } from "../services/GiftsService.js";
export default {
  props: { gift: Gift },
  setup() {
    return {


      async openGift(id) {
        try {
          await giftsService.openGift(id)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      }



    }
  }
}
</script>


<style lang="scss" scoped>
.giftImg {
  width: 100%;
  height: 35vh;
}
</style>