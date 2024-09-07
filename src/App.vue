<template>
  <div id="app">
    <header>
      <h1>Gestión de Citas Médicas</h1>
    </header>
    <nav>
      <ul>
        <li :class="{ active: currentView === 'CrearCita' }" @click="currentView = 'CrearCita'">Crear Cita</li>
        <li :class="{ active: currentView === 'ConsultarCitas' }" @click="currentView = 'ConsultarCitas'">Consultar Citas</li>
        <li :class="{ active: currentView === 'CancelarCita' }" @click="currentView = 'CancelarCita'">Cancelar Cita</li>
      </ul>
    </nav>
    <section v-if="currentView === 'CrearCita'">
      <CrearCita />
    </section>

    <section v-if="currentView === 'ConsultarCitas'">
      <ConsultarCitas />
    </section>

    <section v-if="currentView === 'CancelarCita'">
      <CancelarCita />
    </section>
  </div>
</template>

<script>
import CrearCita from './components/CrearCita.vue';
import ConsultarCitas from './components/ConsultarCitas.vue';
import CancelarCita from './components/CancelarCita.vue';

export default {
  name: 'App',
  data() {
    return {
      currentView: 'CrearCita' // Vista inicial
    };
  },
  components: {
    CrearCita,
    ConsultarCitas,
    CancelarCita
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

header {
  background-color: #42b983;
  padding: 20px;
  color: white;
}

nav {
  margin: 20px 0;
}

nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

nav li {
  margin: 0 15px;
  cursor: pointer;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border-radius: 5px;
}

nav li.active {
  background-color: #339966;
}

nav li:hover {
  background-color: #339966;
}

section {
  margin: 20px 0;
}

h1 {
  font-size: 2em;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input, button {
  margin: 10px 0;
  padding: 10px;
  width: 300px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #339966;
}

img {
  max-width: 100px;
  margin-top: 10px;
}
</style>
