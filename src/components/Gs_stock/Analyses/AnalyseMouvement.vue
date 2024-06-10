<template>
  <!-- Content -->
  <!--/ Edit User Modal -->

  <div class="container-xxl flex-grow-1 container-p-y">
    <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de Stock /</span> Mouvement de stock</h4>
    <div class="app-ecommerce-category">
      <!-- Category List Table -->
      <div class="card">
        <input type="text" v-model="searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;"
          placeholder="Rechercher Mouvement...">
        <div class="table-responsive text-nowrap">
          <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;"
            alt="Loading">
          <table v-if="!$data.loading" class="table">
            <thead>
              <tr style="background-color: #051922;">
                <th>Date</th>
                <th>Code prov</th>
                <th>Libelle prov</th>
                <th>Code dest</th>
                <th>Libelle dest</th>
                <th>Depot</th>
                <th>Code</th>
                <th>designation</th>
                <th>Unité</th>
                <th>Qte</th>
                <th>PU HT</th>
                <th>MT.HT</th>
                <th>%TVA</th>
                <th>MT.TVA</th>
                <th>MT.TTC</th>
                <th>type de document</th>
                <th>N° document</th>
                <th>N° de commande</th>
              </tr>
            </thead>

            <tbody class="table-border-bottom-0">

              <tr v-for="mouvement in data.data_mouvements.data" :key="mouvement.id">
                <td>{{ mouvement.date }}</td>
                <td>{{ mouvement.provenance.code }}</td>
                <td>{{ mouvement.provenance.libelle }}</td>
                <td>{{ mouvement.destination.code }}</td>
                <td>{{ mouvement.destination.libelle }}</td>
                <td>{{ mouvement.depot.libelle }}</td>
                <td>{{ mouvement.produit_fini.code }}</td>
                <td>{{ mouvement.produit_fini.libelle }}</td>
                <td>{{ mouvement.produit_fini.unite.libelle }}</td>
                <td>{{ mouvement.produit_fini.qte }}</td>
                <td>{{ mouvement.produit_fini.qte }}</td>
                <td>{{ mouvement.produit_fini.qte }}</td>
                <td>{{ mouvement.document.type_document }}</td>
                <td>{{ mouvement.document.N_document }}</td>
                <td>{{ mouvement.N_commande }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Bootstrap5Pagination :data="data.data_Mouvements" @pagination-change-page="fetch_data"
          style="margin: 16px;justify-content: center !important;" />
      </div>
    </div>
    <!-- Offcanvas to add new customer -->

  </div>
  <!-- / Content -->
</template>
<script setup>
import { reactive, onMounted } from "vue";
import axios from 'axios';
import Swal from 'sweetalert2';
// import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

const store = useAuthStore();

const data = reactive({
  data_mouvements: [],
  data_provenances: [],
  data_destinations: [],
  data_depots: [],
  data_produits_finis: [],
  data_unites: [],
  data_documents: [],
  data_commands: [],
  searchQuery: '',

  mouvement: {
    id: '',
    date: '',
    provenance_id: '',
    destination_id: '',
    depot_id: '',
    produit_fini_id: '',
    document_id: '',
    commande_id: '',
  },
  loading: true,
  action: '',
});

const fetch_data_provenances = async () => {
  data.data_provenances = [];
  try {
    const response = await axios.get('/api/provenance/index');
    if (response.data.exist) {
      data.data_provenances = response.data.provenances;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'provenances...',
      text: error,
    });
  }
};

const fetch_data_destinations = async () => {
  data.data_destinations = [];
  try {
    const response = await axios.get('/api/destination/index');
    if (response.data.exist) {
      data.data_destinations = response.data.destinations;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'destinations...',
      text: error,
    });
  }
};


const fetch_data_depots = async () => {
  data.data_depots = [];
  try {
    const response = await axios.get('/api/depot/index');
    if (response.data.exist) {
      data.data_depots = response.data.depots;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: ' ...',
      text: error,
    });
  }
};

const fetch_data_produits_finis = async () => {
  data.data_produits_finis = [];
  try {
    const response = await axios.get('/api/produit_fini/index');
    if (response.data.exist) {
      data.data_produits_finis = response.data.produits_finis;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'produits_finis...',
      text: error,
    });
  }
};

const fetch_data_unities = async () => {
  data.data_unities = [];
  try {
    const response = await axios.get('/api/unitie/index');
    if (response.data.exist) {
      data.data_unities = response.data.unities;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'unities...',
      text: error,
    });
  }
};

const fetch_data_documents = async () => {
  data.data_documents = [];
  try {
    const response = await axios.get('/api/document/index');
    if (response.data.exist) {
      data.data_documents = response.data.documents;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'documents...',
      text: error,
    });
  }
};

const fetch_data_commandes = async () => {
  data.data_commandes = [];
  try {
    const response = await axios.get('/api/commande/index');
    if (response.data.exist) {
      data.data_commandes = response.data.commandes;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'commandes...',
      text: error,
    });
  }
};

const fetch_data = async (page = 1) => {
  data.data_mouvements = [];
  data.loading = true;
  try {
    const response = await axios.get('/api/mouvement/index?page=' + page, {
      params: {
        search: data.searchQuery
      }
    });
    if (response.data.exist) {
      data.data_mouvements = response.data.mouvements;
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'mouvements...',
        text: response.data.message,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'mouvements...',
      text: error,
    });
  }
  finally {
    data.loading = false;
  }

};

onMounted(() => {
  fetch_data();
  fetch_data_provenances();
  fetch_data_destinations();
  fetch_data_depots();
  fetch_data_produits_finis();
  fetch_data_unities();
  fetch_data_documents();
  fetch_data_commandes();
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