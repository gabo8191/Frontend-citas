const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      id_appointment: '',
      appointmentData: null,
      notificationMessage: '',
      notificationClass: '',
    };
  },
  methods: {
    async fetchAppointment() {
      console.log('fetchAppointment called');

      if (!this.id_appointment) {
        this.showErrorMessage('Por favor, ingrese un código de cita válido.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/appointment/${this.id_appointment}`);
        console.log('Fetch response:', response);
        const data = await response.json();

        if (!response.ok) {
          this.showErrorMessage(data.mensaje || 'Error al buscar la cita.');
          this.appointmentData = null;
        } else {
          this.appointmentData = data;
          this.notificationMessage = '';
        }
      } catch (error) {
        console.error('Fetch error:', error);
        this.showErrorMessage('Error al buscar la cita.');
        this.appointmentData = null;
      }
    },

    async cancelAppointment() {
      if (!this.appointmentData) {
        this.showErrorMessage('No hay cita para cancelar.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/appointment/${this.id_appointment}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          this.showErrorMessage(data.mensaje || 'Error al cancelar la cita.');
        } else {
          this.showSuccessMessage('Cita cancelada exitosamente.');
          this.appointmentData.status = 'cancelada';
        }
      } catch (error) {
        console.error('Fetch error:', error);
        this.showErrorMessage('Error al cancelar la cita.');
      }
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
