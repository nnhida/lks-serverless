import { defineStore } from "pinia";
import { useNotifStore } from "./notifStore";

const api_url = `${import.meta.env.VITE_BASE_API_URL}`;
const headers = {
   Authorization: `${import.meta.env.VITE_API_TOKEN || ""}`,
   Deviceid: `${import.meta.env.VITE_DEVICE_ID || ""}`,
   "Content-Type": "application/json"
};

export const useEventStore = defineStore("eventStore", {
   stores: { notifStore: useNotifStore },
   state: () => ({
      events: [],
      eventDetails: {
         eventId: "",
         title: "",
         desc: "",
         image: "/banner-event.jpg",
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
            console.log("Fetching events from:", `${api_url}/event`);
            console.log("Headers:", headers);

            const response = await fetch(`${api_url}/event`, {
               method: "GET",
               headers: { ...headers }
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            this.events = data.data;
            return data.data;
         } catch (error) {
            notifStore.setSnackbar("error", error.message, true);
         }
      },

      async getEventById(id) {
         const notifStore = useNotifStore();
         try {
            console.log("Fetching event by ID:", `${api_url}/event/${id}`);

            const response = await fetch(`${api_url}/event/${id}`, {
               method: "GET",
               headers: { ...headers }
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            this.eventDetails = data.data;
            return data.data;
         } catch (error) {
            notifStore.setSnackbar("error", error.message, true);
         }
      },

      async resetDetails() {
         this.eventDetails = {
            eventId: "",
            title: "",
            desc: "",
            image: "/banner-event.jpg",
            date: "2023-01-01",
            location: "-",
            category: "-",
            publish: false,
            tickets: []
         };
      }
   }
});
