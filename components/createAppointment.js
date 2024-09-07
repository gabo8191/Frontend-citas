const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      id_patient: '',
      date_appointment: '',
      picture_auto: null,
      notificationMessage: '',
      notificationClass: '',
    };
  },
  methods: {

    handleFileUpload(event) {
      this.picture_auto = event.target.files[0];
    },
    async createAppointment() {
      const formData = new FormData();
      formData.append('id_patient', this.id_patient);
      formData.append('date_appointment', this.date_appointment);
      formData.append('picture_auto', this.picture_auto);

      try {
        const response = await fetch('http://localhost:3000/appointment', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log('Respuesta del backend:', data);

        if (!response.ok) {
          this.showErrorMessage(data.message || 'Ocurrió un error');
        } else {
          this.showSuccessMessage(`Cita creada con éxito. Código: ${data.code}`);

        }
        this.id_patient = '';
        this.date_appointment = '';
        this.picture_auto = null;

      } catch (error) {
        this.showErrorMessage('Error en la conexión con el servidor.');
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
  },
}).mount('#app');
