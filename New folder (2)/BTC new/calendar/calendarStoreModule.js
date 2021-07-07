import axios from '@axios'
import { listSchedules } from '@/api/calendar'

export default {
  namespaced: true,
  state: {
    calendarOptions: [
      {
        color: 'danger',
        label: 'Personal',
      },
      {
        color: 'primary',
        label: 'Business',
      },
      {
        color: 'warning',
        label: 'Family',
      },
      {
        color: 'success',
        label: 'Holiday',
      },
      {
        color: 'info',
        label: 'ETC',
      },
    ],
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC'],
  },
  getters: {},
  mutations: {
    SET_SELECTED_EVENTS(state, val) {
      state.selectedCalendars = val
    },
  },
  actions: {
    getListEvents(ctx, payload) {
      return new Promise((resolve, reject) => {
        const prams = {
          PageIndex: 1,
          PageSize: 10,
        }
        listSchedules(prams)
          .then(({ data }) => {
            resolve(data.data.items)
          }).catch(error => reject(error))
      })
    },
    fetchEvents(ctx, { calendars }) {
      return new Promise((resolve, reject) => {
        const prams = {
          PageIndex: 1,
          PageSize: 10,
        }
        listSchedules(prams)
          .then(({ data }) => {
            resolve(data.data.items)
          }).catch(error => reject(error))
      })
    },
    addEvent(ctx, { event }) {
      return new Promise((resolve, reject) => {
        axios
          .post('/apps/calendar/events', { event })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateEvent(ctx, { event }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/apps/calendar/events/${event.id}`, { event })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeEvent(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/apps/calendar/events/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
