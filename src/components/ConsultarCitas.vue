<template>
    <div>
      <h2>Consultar Citas</h2>
      <form @submit.prevent="consultarCitas">
        <label>Fecha Inicio:</label>
        <input v-model="fechaInicio" type="date" required />
        <label>Fecha Fin:</label>
        <input v-model="fechaFin" type="date" required />
        <button type="submit">Consultar</button>
      </form>
      <ul>
        <li v-for="cita in citas" :key="cita.codigoCita">
          {{ cita.cc }} - {{ cita.fecha }} - {{ cita.estado }}
          <img :src="`http://localhost:3000/uploads/${cita.foto}`" v-if="cita.foto" />
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fechaInicio: '',
        fechaFin: '',
        citas: []
      };
    },
    methods: {
      async consultarCitas() {
        const response = await fetch(`http://localhost:3000/citas?fechaInicio=${this.fechaInicio}&fechaFin=${this.fechaFin}`);
        this.citas = await response.json();
      }
    }
  };
  </script>
  