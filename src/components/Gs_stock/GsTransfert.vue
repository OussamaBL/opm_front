<template>
  <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="text-center mb-4">
            <h3 class="mb-2">Transfert</h3>
          </div>
          <form id="editUserForm" class="row g-3" onsubmit="return false">

            <div class="col-12 col-md-6" style="margin: 0 auto;">
              <label class="form-label" for="modalEditUserEmail">Date de transfert</label>
              <input type="text" id="modalEditUserEmail" v-model="data.transfert.date_transfert" class="form-control"
                placeholder="Saisie la date" />
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto;">
              <label class="form-label" for="modalEditUserFirstName">Provenance</label>
              <select id="modalEditUserCountry" class="select2 form-select" v-model="data.transfert.provenance_id"
                data-allow-clear="true">
                <option value="">Select</option>
                <option v-for="provenance in data.data_provenances" :key="provenance.id" :value="provenance.id">{{
                  provenance.libelle }}</option>
              </select>
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto;">
              <label class="form-label" for="modalEditUserFirstName">Destination</label>
              <select id="modalEditUserCountry" class="select2 form-select" v-model="data.transfert.destination_id"
                data-allow-clear="true">
                <option value="">Select</option>
                <option v-for="destination in data.data_destinations" :key="destination.id" :value="destination.id">{{
                  destination.libelle }}</option>
              </select>
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto;">
              <label class="form-label" for="modalEditUserFirstName">Depot</label>
              <select id="modalEditUserCountry" class="select2 form-select" v-model="data.transfert.depot_id"
                data-allow-clear="true">
                <option value="">Select</option>
                <option v-for="depot in data.data_depots" :key="depot.id" :value="depot.id">{{ depot.libelle }}</option>
              </select>
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto;">
              <label class="form-label" for="modalEditUserFirstName">Quantite</label>
              <input type="text" id="modalEditUserFirstName" v-model="data.transfert.quantite" class="form-control"
                placeholder="Saisie la quantite" />
            </div>

            <div class="col-12 text-center">
              <button v-if="data.action == 'add'" type="submit" @click="addTransfert" class="btn btn-primary me-sm-3 me-1">Submit</button>
              <button v-if="data.action == 'edit'" type="submit" @click="updateTransfert" class="btn btn-primary me-sm-3 me-1">Submit</button>
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!--/ Edit User Modal -->

  <div class="container-xxl flex-grow-1 container-p-y">
    <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de Stock /</span> Transfert entre Depots</h4>
    <div class="app-ecommerce-category">
      <!-- Category List Table -->
      <div class="card">
        <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal"
          @click="open_modal_addTransfert" data-bs-target="#editUser">Ajouter Transfert</button>
        <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;"
          placeholder="Rechercher Transfert...">
        <div class="table-responsive text-nowrap">
          <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;"
            alt="Loading">
          <table v-if="!data.loading" class="table">
            <thead>
              <tr style="background-color: #051922;">
                <th>Date de transfert</th>
                <th>Provenance</th>
                <th>Destination</th>
                <th>Depot</th>
                <th>Quantite</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody class="table-border-bottom-0">
              <tr v-for="transfert in data.data_transferts.data" :key="transfert.id">
                <td>{{ transfert.date_transfert }}</td>
                <td>{{ transfert.provenance.libelle }}</td>
                <td>{{ transfert.destination.libelle }}</td>
                <td>{{ transfert.depot.libelle }}</td>
                <td>{{ transfert.quantite }}</td>
                <td>
                  <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                      <i class="ti ti-dots-vertical"></i>
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateTransfert(transfert)"
                        data-bs-target="#editUser" href="javascript:void(0);">
                        <i class="ti ti-pencil me-1"></i> Edit
                      </a>
                      <a class="dropdown-item" @click="deleteTransfert(transfert)" href="javascript:void(0);"><i
                          class="ti ti-trash me-1"></i> Delete</a>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Bootstrap5Pagination :data="data.data_transferts" @pagination-change-page="fetch_data"
          style="margin: 16px;justify-content: center !important;" />
      </div>
    </div>
  </div>
  <!-- / Content -->
</template>

<script setup>
import { reactive, onMounted } from "vue";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

const store = useAuthStore();

const data = reactive({
  data_transferts: [],
  data_provenances: [],
  data_destinations: [],
  data_depots: [],

  transfert: {
    id: '',
    date_transfert: '',
    provenance_id: '',
    destination_id: '',
    depot_id: '',
    quantite: '',
  },
  searchQuery: '',
  loading: true,
  action: '',
});

const open_modal_addTransfert = () => {
  data.action = 'add';
  data.transfert.id = '';
  data.transfert.date_transfert = '';
  data.transfert.provenance_id = '';
  data.transfert.destination_id = '';
  data.transfert.depot_id = '';
  data.transfert.quantite = '';
};

const open_modal_updateTransfert = (transfert) => {
  data.action = 'edit';
  data.transfert.id = transfert.id;
  data.transfert.date_transfert = transfert.date_transfert;
  data.transfert.provenance_id = transfert.provenance_id;
  data.transfert.destination_id = transfert.destination_id;
  data.transfert.depot_id = transfert.depot_id;
  data.transfert.quantite = transfert.quantite;
};

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
      title: 'Provenances...',
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
      title: 'Destinations...',
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
      title: 'Depots...',
      text: error,
    });
  }
};

const fetch_data = async (page = 1) => {
  data.data_transferts = [];
  data.loading = true;
  try {
    const response = await axios.get('/api/transfert/index?page=' + page, {
      params: {
        search: data.searchQuery
      }
    });
    if (response.data.exist) {
      data.data_transferts = response.data.transferts;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Transferts...',
        text: response.data.message,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Transferts...',
      text: error,
    });
  } finally {
    data.loading = false;
  }
};

const addTransfert = async () => {
  store.clearErrors();
  try {
    const response = await axios.post('/api/transfert/store', data.transfert);
    if (response.data.success) {
      fetch_data();
      Swal.fire({
        icon: 'success',
        title: 'Transfert...',
        text: "Transfert '" + response.data.transfert + "' added",
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Transfert...',
        text: response.data.message,
      });
    }
  } catch (error) {
    store.setErrors(error.response.data.errors);
  }
};

const deleteTransfert = async (transfert) => {
  try {
    Swal.fire({
      title: 'Confirm Delete',
      text: `Are you sure you want to delete the mouvement '${transfert.transfert}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete("/api/transfert/destroy/" + transfert.id);
        if (response.data.success) {
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Transfert...',
            text: response.data.message,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Transfert...',
            text: response.data.message,
          });
        }
      }
    });
  } catch (error) {
    store.setErrors(error.response.data.errors);
  }
};

const updateTransfert = async () => {
  try {
    const response = await axios.put("/api/transfert/update/" + data.transfert.id, data.transfert);
    if (response.data.success) {
      fetch_data();
      Swal.fire({
        icon: 'success',
        title: 'Transfert...',
        text: response.data.message,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Transfert...',
        text: response.data.message,
      });
    }
  } catch (error) {
    store.setErrors(error.response.data.errors);
  }
};

onMounted(() => {
  fetch_data();
  fetch_data_provenances();
  fetch_data_destinations();
  fetch_data_depots();
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
