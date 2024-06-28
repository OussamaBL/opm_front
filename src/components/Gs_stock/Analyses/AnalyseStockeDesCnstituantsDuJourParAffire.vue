<template>
  <!-- Content -->
  <div class="container-xxl flex-grow-1 container-p-y">
    <h4 class="py-3 mb-2">
      <span class="text-muted fw-light">Gestion de Stock /</span> Inventaire entre Depots
    </h4>
    <div class="app-ecommerce-category">
      <!-- Category List Table -->
      <div class="card">
        <input type="text" v-model="searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%"
          placeholder="Rechercher Inventaire..." />
        <div class="table-responsive text-nowrap">
          <img v-if="data.loading" src="/images/loading.gif" style="width: 40px; margin: 20px auto; display: block"
            alt="Loading" />
          <table v-if="!data.loading" class="table">
            <thead>
              <tr style="background-color: #051922">
                <th>Code</th>
                <th>Produit</th>
                <th>Unite</th>
                <th>Entree comptable</th>
                <th>Sortie comptable</th>
                <th>Stock comptable</th>
                <th>Stock physique</th>
                <th>Date de Inventaire</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody class="table-border-bottom-0">
              <tr v-for="inventaire in data.data_inventaires.data" :key="inventaire.id">
                <td>{{ inventaire.produit.code }}</td>
                <td>{{ inventaire.produit.libelle }}</td>
                <td>{{ inventaire.produit.unite.libelle }}</td>
                <td>{{ inventaire.entree_comptable }}</td>
                <td>{{ inventaire.Sortie_comptable }}</td>
                <td>{{ inventaire.stock_compatable }}</td>
                <td>{{ inventaire.stock_physique }}</td>
                <td>{{ inventaire.date_inventaire }}</td>
                <td>{{ inventaire.balance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Bootstrap5Pagination :data="data.data_inventaires" @pagination-change-page="fetch_data"
          style="margin: 16px; justify-content: center !important" />
      </div>
    </div>
    <!-- Offcanvas to add new customer -->
  </div>
  <!-- / Content -->
</template>

<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { Bootstrap5Pagination } from "laravel-vue-pagination";

const store = useAuthStore();

const data = reactive({
  data_inventaires: [],
  data_produits: [],
  data_unites: [],
  inventaire: {
    id: "",
    produit_id: "",
    unite_id: "",
    stock_physique: "",
    date_inventaire: "",
    balance: "",
  },
  loading: true,
  action: "",
  searchQuery: "",
});


const fetch_data_produits = async () => {
  data.data_produits = [];
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/produits");

    data.data_produits = response.data.produits;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "produits...",
      text: error,
    });
  }
};

const fetch_data_unites = async () => {
  data.data_unites = [];
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/unites");

    data.data_unites = response.data.unites;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "unites...",
      text: error,
    });
  }
};

const fetch_data = async (page = 1) => {
  data.data_Inventaires = [];
  data.loading = true;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/inventaires?page=" + page,
      {
        params: {
          search: data.searchQuery,
        },
      }
    );

    data.data_Inventaires = response.data.Inventaires;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Inventaires...",
      text: error,
    });
  } finally {
    data.loading = false;
  }
};

onMounted(() => {
  fetch_data();
  fetch_data_produits();
  fetch_data_unites();
});
</script>

<style>
div:where(.swal2-container) {
  z-index: 2000;
}

.table:not(.table-dark) thead:not(.table-dark) th {
  color: white;
}
</style>
