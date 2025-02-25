import { defineStore } from "pinia";
import axios from "axios";
import { useNotifStore } from "./notifStore";

const api_url = "https://qd2wb8defb.execute-api.us-west-2.amazonaws.com/production";
const headers = {
   Authorization: "bcc7c5b30027f185f110b173e58bfc21",
   Deviceid: "frontEnd-001",
   "Content-Type": "application/json", 
}

export const useEventStore = defineStore("eventStore", {
   stores: { notifStore: useNotifStore },
   state: () => ({
      events: [],
      eventDetails: {
         eventId: "",
         title: "",
         desc: "",
         iamge: "/banner-event.jpg",
         date: "2023-01-01",
         location: "-",
         category: "-",
         publish: false,
         tickets: []
      }
   }),
   actions: {
      async getEvents() {
         const notifStore = useNotifStore();

         try {
            const response = await axios.get(`${api_url}/event`, { headers });
            const data = response.data;
            const resData = data.data;
            this.events = resData;
            return resData;
         } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            notifStore.setSnackbar("error", message, true);
         }
      },
      async getEventById(id) {
         const notifStore = useNotifStore();

         try {
            const response = await axios.get(`${api_url}/event/${id}`, { headers });
            const data = response.data;
            const resData = data.data;
            this.eventDetails = resData;
            return resData;
         } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            notifStore.setSnackbar("error", message, true);
         }
      },
      async resetDetails() {
         this.eventDetails = {
            eventId: "",
            title: "",
            desc: "",
            iamge: "/banner-event.jpg",
            date: "2023-01-01",
            location: "-",
            category: "-",
            publish: false,
            tickets: []
         }
      }
   },
});
