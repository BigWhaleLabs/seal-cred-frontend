import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import dayjs from 'dayjs'

class TimerStore extends PersistableStore {
  interval?: NodeJS.Timeout
  timerLeft?: number
  timerStarted?: dayjs.Dayjs
  timerFinished?: dayjs.Dayjs

  constructor() {
    super()

    this.checkExistTimer()
  }

  setTimer() {
    const now = dayjs()

    const curMS = now.minute() * 60000 + now.second() * 1000 + now.millisecond()
    const match =
      [0, 900_000, 1_800_000, 2_700_000].find((s: number) => s - curMS > 0) ||
      3_600_000 // 0/15/30/45/60 minutes

    this.timerStarted = now
    this.timerFinished = now
      .set('minute', match / 60_000)
      .set('second', 0)
      .set('millisecond', 0)
    this.timerLeft = this.timerFinished?.diff(this.timerStarted)
    this.updateTimer()
  }

  checkExistTimer() {
    const object = JSON.parse(localStorage.getItem('TimerStore') || '{}')
    if (Object.keys(object).length > 0) {
      const now = dayjs()
      const hasTicks = dayjs(object.timerFinished).diff(now)
      if (hasTicks <= 0) {
        localStorage.setItem('TimerStore', JSON.stringify(this))
      }
    }
  }

  removeTimer() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = undefined
    }
    this.timerStarted = undefined
    this.timerFinished = undefined
    this.timerLeft = undefined
  }

  updateTimer() {
    this.interval = setInterval(() => {
      this.timerStarted = dayjs()
      this.timerLeft = this.timerFinished?.diff(this.timerStarted)
      if (this.timerLeft && this.timerLeft <= 0) {
        this.removeTimer()
      }
    }, 1000)
  }
}

export default proxy(new TimerStore()).makePersistent()
