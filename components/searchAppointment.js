const { createApp, ref } = Vue;

createApp({
  data() {
    const startDate = ref('');
    const endDate = ref('');
    const appointments = ref([]); // Almacena las citas encontradas
    const notificationMessage = ref('');
    const notificationClass = ref('');
    return {
      startDate,
      endDate,
      appointments,
      notificationMessage,
      notificationClass,
    };
  },
  methods: {
    async searchAppointments() {
      if (!this.startDate || !this.endDate) {
        this.showErrorMessage('Por favor ingrese ambas fechas.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/citas?startDate=${this.startDate}&endDate=${this.endDate}`);
        const data = await response.json();

        if (!response.ok) {
          this.showErrorMessage(data.message);
          this.appointments.value = [];
        } else {
          if (data.length === 0) {
            this.showErrorMessage('No se encontraron citas en el rango de fechas.');
          } else {
            this.appointments.value = data;
            this.notificationMessage.value = '';
          }
        }
      } catch (error) {
        this.showErrorMessage('Error al buscar las citas.');
        this.appointments.value = [];
      }
    },

    showErrorMessage(message) {
      this.notificationMessage.value = message;
      this.notificationClass.value = 'alert alert-danger';
    },

    showSuccessMessage(message) {
      this.notificationMessage.value = message;
      this.notificationClass.value = 'alert alert-success';
    },
  }
}).mount('#app');
