<template>
    <div>
      <h2>Cancelar Cita</h2>
      <form @submit.prevent="cancelarCita">
        <label>Código Cita:</label>
        <input v-model="codigo" type="text" required />
        <button type="submit">Cancelar</button>
      </form>
      <p v-if="mensaje">{{ mensaje }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        codigo: '',
        mensaje: ''
      };
    },
    methods: {
      async cancelarCita() {
        const response = await fetch(`http://localhost:3000/citas/${this.codigo}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        this.mensaje = data.mensaje;
      }
    }
  };
  </script>
  