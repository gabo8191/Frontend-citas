const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      startDate: '',
      endDate: '',
      appointments: [],
      notificationMessage: '',
      notificationClass: '',
    };
  },
  methods: {
    async searchAppointments() {
      if (!this.startDate || !this.endDate) {
        this.showErrorMessage('Por favor ingrese ambas fechas.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/appointment?start_date_appointment=${this.startDate}&end_date_appointment=${this.endDate}`);
        const data = await response.json();

        if (!response.ok) {
          this.showErrorMessage(data.message);
          this.appointments = [];
        } else {
          if (data.length === 0) {
            this.showErrorMessage('No se encontraron citas en el rango de fechas.');
          } else {
            this.appointments = data;
            this.notificationMessage = '';
          }
        }
      } catch (error) {
        this.showErrorMessage('Error al buscar las citas.');
        this.appointments = [];
      }
    },

    getImageUrl(picture_auto) {
      return `http://localhost:3000/uploads/${picture_auto}`;
    },

    showErrorMessage(message) {
      this.notificationMessage = message;
      this.notificationClass = 'alert alert-danger';
    },

    showSuccessMessage(message) {
      this.notificationMessage = message;
      this.notificationClass = 'alert alert-success';
    },
  }
}).mount('#app');
