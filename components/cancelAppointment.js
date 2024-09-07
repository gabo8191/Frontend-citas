const { createApp, ref } = Vue;

createApp({
  data() {
    const id_appointment = ref('');
    const appointmentData = ref(null); // Almacena la información de la cita
    const notificationMessage = ref('');
    const notificationClass = ref('');
    return {
      id_appointment,
      appointmentData,
      notificationMessage,
      notificationClass,
    };
  },
  methods: {
    async fetchAppointment() {
      try {
        const response = await fetch(`http://localhost:3000/citas/${this.id_appointment.value}`);
        const data = await response.json();

        if (!response.ok) {
          this.showErrorMessage(data.message);
          this.appointmentData.value = null;
        } else {
          this.appointmentData.value = data;
          this.notificationMessage.value = '';
        }
      } catch (error) {
        this.showErrorMessage('Error al buscar la cita.');
        this.appointmentData.value = null;
      }
    },

    async cancelAppointment() {
      if (!this.appointmentData.value) {
        this.showErrorMessage('No hay cita para cancelar.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/citas/${this.id_appointment.value}/inactivar`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'inactive' })
        });

        const data = await response.json();

        if (!response.ok) {
          this.showErrorMessage(data.message);
        } else {
          this.showSuccessMessage('Cita cancelada exitosamente.');
        }
      } catch (error) {
        this.showErrorMessage('Error al cancelar la cita.');
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
