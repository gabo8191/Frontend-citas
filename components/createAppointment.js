const { createApp, ref } = Vue;

createApp({
  data() {
    const id_patient = ref('');
    const date_appointment = ref('');
    const picture_auto = ref(null);
    const notificationMessage = ref('');
    const notificationClass = ref('');
    const status_appointment = ref('');
    return {
      id_patient,
      date_appointment,
      picture_auto,
      notificationMessage,
      notificationClass,
      status_appointment
    };
  },
  methods: {
    async createAppointment() {
      const formData = new FormData();
      formData.append('id_patient', this.id_patient.value);
      formData.append('date_appointment', this.date_appointment.value);
      formData.append('picture_auto', this.picture_auto.value);
      formData.append('status_appointment', 'active');
      try {
        const response = await fetch('http://localhost:3000/citas', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          this.showErrorMessage(data.message);
        } else {
          this.showSuccessMessage(data.message);
        }
      } catch (error) {
        this.showErrorMessage('Error en la conexión con el servidor.');
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
