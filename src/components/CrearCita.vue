<template>
    <div>
      <h2>Crear Cita Médica</h2>
      <form @submit.prevent="crearCita">
        <label>CC Paciente:</label>
        <input v-model="cc" type="text" required />
        <label>Fecha Cita:</label>
        <input v-model="fecha" type="date" required />
        <label>Autorización (Foto):</label>
        <input @change="onFileChange" type="file" required />
        <button type="submit">Crear Cita</button>
      </form>
      <p v-if="codigoCita">Código de Cita: {{ codigoCita }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cc: '',
        fecha: '',
        foto: null,
        codigoCita: ''
      };
    },
    methods: {
      onFileChange(e) {
        this.foto = e.target.files[0];
      },
      async crearCita() {
        try {
          const formData = new FormData();
          formData.append('cc', this.cc);
          formData.append('fecha', this.fecha);
          formData.append('foto', this.foto);
          const response = await fetch('http://localhost:3000/citas', {
            method: 'POST',
            body: formData
          });
          if (!response.ok) {
            throw new Error('Error al crear la cita. Inténtalo de nuevo.');
          } 
          const data = await response.json();
          this.codigoCita = data.codigoCita;  
          alert('Cita creada con éxito. Código de cita: ' + this.codigoCita);
          this.cc = '';
          this.fecha = '';
          this.foto = null;
          this.$refs.fileInput.value = ''; 
        } catch (error) {
          alert('Hubo un error al crear la cita: ' + error.message);
        }
      }
    }
  };
  </script>
  