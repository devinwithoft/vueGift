import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { logger } from "../utils/Logger.js"
import { giftApi } from "./AxiosService.js"

class GiftsService {
  async getGifts() {
    const res = await giftApi.get()
    AppState.gifts = res.data.map(g => new Gift(g))
  }


  async openGift(id) {
    const gift = AppState.gifts.find(g => g.id == id)
    if (gift.opened == false) {
      gift.opened = !gift.opened
      const res = await giftApi.put(id, gift)
      let giftIndex = AppState.gifts.findIndex(g => g.id == id)
      AppState.gifts.splice(giftIndex, 1, res.data)
    } else {
      logger.log("this gift has already been opened!")
    }
  }


  async postGift(giftData) {
    const res = await giftApi.post('', giftData)
    AppState.gifts.unshift((res.data))
  }
}
export const giftsService = new GiftsService()