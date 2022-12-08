<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-3">
        <div class="card mt-5 sticky-top row">
          <h1 class="p-3 text-center">Send gift here</h1>
          <form class="text-center my-2" @submit.prevent="postGift()"> <input action="" class=" input col-7 my-2"
              placeholder="Image Url for your gift" v-model="newGift.url">
            <input action="" class="input col-7 my-2 mb-4" placeholder="Tag for your gift" v-model="newGift.tag">
            <button class="btn btn-success col-7 mb-5">
              <h6><i class="mdi mdi-gift"></i> Submit Gift <i class="mdi mdi-gift"></i></h6>
            </button>
          </form>

        </div>
      </div>
      <div class="col-9">
        <section class="row justify-content-evenly ">
          <div v-for="g in gifts" :key="g.id" class="col-3 card m-2  my-4 justify-content-center">
            <GiftCards :gift="g" />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { giftsService } from "../services/GiftsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const newGift = ref({
      url: '',
      tag: ''
    })

    onMounted(() => {
      getGifts();
    });
    async function getGifts() {
      try {
        await giftsService.getGifts();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    return {
      newGift,
      gifts: computed(() => AppState.gifts),
      async postGift() {
        try {
          await giftsService.postGift(newGift.value)
        } catch (error) {
          logger.log(error)
          Pop.error(error);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.giftImg {
  width: 100%;
  height: 35vh;
}
</style>
