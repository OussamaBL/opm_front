<template>
  <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <div class="text-center mb-4">
            <h3 class="mb-2">Mouvements de stock</h3>
          </div>
          <form
            id="editUserForm"
            class="row g-3"
            @submit.prevent="data.action == 'add' ? addMouvement() : updateMouvement()"
          >
            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserEmail">Date</label>
              <input
                type="text"
                id="modalEditUserEmail"
                v-model="data.mouvement.date"
                class="form-control"
                placeholder="Saisie la date"
              />
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserFirstName">Provenance</label>
              <select
                id="modalEditUserCountry"
                class="select2 form-select"
                v-model="data.mouvement.provenance_id"
                data-allow-clear="true"
              >
                <option value="">Select</option>
                <option
                  v-for="provenance in data.data_provenances"
                  :key="provenance.id"
                  :value="provenance.id"
                >
                  {{ provenance.libelle }}
                </option>
              </select>
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserFirstName">Destination</label>
              <select
                id="modalEditUserCountry"
                class="select2 form-select"
                v-model="data.mouvement.destination_id"
                data-allow-clear="true"
              >
                <option value="">Select</option>
                <option
                  v-for="destination in data.data_destinations"
                  :key="destination.id"
                  :value="destination.id"
                >
                  {{ destination.libelle }}
                </option>
              </select>
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserFirstName">Depot</label>
              <select
                id="modalEditUserCountry"
                class="select2 form-select"
                v-model="data.mouvement.depot_id"
                data-allow-clear="true"
              >
                <option value="">Select</option>
                <option
                  v-for="depot in data.data_depots"
                  :key="depot.id"
                  :value="depot.id"
                >
                  {{ depot.libelle }}
                </option>
              </select>
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserFirstName">Produit</label>
              <select
                id="modalEditUserCountry"
                class="select2 form-select"
                v-model="data.mouvement.produit_id"
                data-allow-clear="true"
              >
                <option value="">Select</option>
                <option
                  v-for="produit in data.data_produits"
                  :key="produit.id"
                  :value="produit.id"
                >
                  {{ produit.libelle }}
                </option>
              </select>
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserFirstName">Type document</label>
              <select
                id="modalEditUserCountry"
                class="select2 form-select"
                v-model="data.mouvement.document_id"
                data-allow-clear="true"
              >
                <option value="">Select</option>
                <option
                  v-for="document in data.data_documents"
                  :key="document.id"
                  :value="document.id"
                >
                  {{ document.type_document }}
                </option>
              </select>
            </div>

            <div class="col-12 text-center">
              <button type="submit" class="btn btn-primary me-sm-3 me-1">Submit</button>
              <button
                type="button"
                class="btn btn-label-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
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
    <h4 class="py-3 mb-2">
      <span class="text-muted fw-light">Gestion de Stock /</span> Mouvement de stock
    </h4>
    <div class="app-ecommerce-category">
      <!-- Category List Table -->
      <div class="card">
        <button
          class="btn btn-primary"
          style="width: 170px; margin: 12px"
          data-bs-toggle="modal"
          @click="open_modal_addMouvement"
          data-bs-target="#editUser"
        >
          Ajouter Mouvement
        </button>
        <input
          type="text"
          v-model="searchQuery"
          @keyup="fetch_data"
          class="form-control m-3"
          style="width: 96%"
          placeholder="Rechercher Mouvement..."
        />
        <div class="table-responsive text-nowrap">
          <img
            v-if="data.loading"
            src="/images/loading.gif"
            style="width: 40px; margin: 20px auto; display: block"
            alt="Loading"
          />
          <table v-if="!data.loading" class="table">
            <thead>
              <tr style="background-color: #051922">
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
                <th>Type document</th>
                <th>N° document</th>
                <th>N° de commande</th>
                <th>Action</th>
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
                <td>{{ mouvement.produit.code }}</td>
                <td>{{ mouvement.produit.libelle }}</td>
                <td>{{ mouvement.produit.unite.libelle }}</td>
                <td>{{ mouvement.produit.qte }}</td>
                <td>{{ mouvement.document.type_document }}</td>
                <td>{{ mouvement.document.N_document }}</td>
                <td>{{ mouvement.N_commande }}</td>
                <td>
                  <div class="dropdown">
                    <button
                      type="button"
                      class="btn p-0 dropdown-toggle hide-arrow"
                      data-bs-toggle="dropdown"
                    >
                      <i class="ti ti-dots-vertical"></i>
                    </button>
                    <div class="dropdown-menu">
                      <a
                        class="dropdown-item"
                        data-bs-toggle="modal"
                        @click="open_modal_updateMouvement(mouvement)"
                        data-bs-target="#editUser"
                        href="javascript:void(0);"
                      >
                        <i class="ti ti-pencil me-1"></i> Edit
                      </a>
                      <a
                        class="dropdown-item"
                        @click="deleteMouvement(mouvement)"
                        href="javascript:void(0);"
                        ><i class="ti ti-trash me-1"></i> Delete</a
                      >
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Bootstrap5Pagination
          :data="data.data_Mouvement"
          @pagination-change-page="fetch_data"
          style="margin: 16px; justify-content: center !important"
        />
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
// import router from '@/router';
import { useAuthStore } from "@/stores/useAuthStore.js";
import { Bootstrap5Pagination } from "laravel-vue-pagination";

const store = useAuthStore();

const data = reactive({
  data_mouvements: [],
  data_provenances: [],
  data_destinations: [],
  data_depots: [],
  data_produits: [],
  data_unites: [],
  data_documents: [],
  data_commands: [],
  searchQuery: "",

  mouvement: {
    id: "",
    date: "",
    provenance_id: "",
    destination_id: "",
    depot_id: "",
    produit_id: "",
    document_id: "",
    commande_id: "",
  },
  loading: true,
  action: "",
});

const open_modal_addMouvement = () => {
  data.action = "add";
  data.mouvement.date = "";
  data.mouvement.provenance_id = "";
  data.mouvement.destination_id = "";
  data.mouvement.depot_id = "";
  data.mouvement.produit_id = "";
  data.mouvement.document_id = "";
  data.mouvement.commande_id = "";
};
const open_modal_updateMouvement = (mouvement) => {
  data.action = "edit";
  data.mouvement.date = mouvement.date;
  data.mouvement.provenance_id = mouvement.provenance_id;
  data.mouvement.destination_id = mouvement.destination_id;
  data.mouvement.depot_id = mouvement.depot_id;
  data.mouvement.produit_id = mouvement.produit_id;
  data.mouvement.document_id = mouvement.document_id;
  data.mouvement.commande_id = mouvement.commande_id;
};

const fetch_data_provenances = async () => {
  data.data_provenances = [];
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/provenances");

    data.data_provenances = response.data.provenances;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Provenances...",
      text: error,
    });
  }
};

const fetch_data_destinations = async () => {
  data.data_destinations = [];
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/destinations");

    data.data_destinations = response.data.destinations;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Destinations...",
      text: error,
    });
  }
};

const fetch_data_depots = async () => {
  data.data_depots = [];
  try {
    const response = await axios.get("/api/depot/index");
    if (response.data.exist) {
      data.data_depots = response.data.depots;
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "depots...",
      text: error,
    });
  }
};

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

const fetch_data_documents = async () => {
  data.data_documents = [];
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/documents");

    data.data_documents = response.data.documents;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "documents...",
      text: error,
    });
  }
};

const fetch_data_commandes = async () => {
  data.data_commandes = [];
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/commandes");

    data.data_commandes = response.data.commandes;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "commandes...",
      text: error,
    });
  }
};

const fetch_data = async (page = 1) => {
  data.data_mouvements = [];
  data.loading = true;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/mouvements?page=" + page,
      {
        params: {
          search: data.searchQuery,
        },
      }
    );

    data.data_mouvements = response.data.mouvements;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "mouvements...",
      text: error,
    });
  } finally {
    data.loading = false;
  }
};

const addMouvement = async () => {
  store.clearErrors();
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/mouvements",
      data.mouvement
    );

    if (response.status === 200) {
      data.data_mouvements.push(response.data.mouvement);
      Swal.fire({
        icon: "success",
        title: "mouvements...",
        text: response.data.message,
      });

      document.querySelector("#editUser .btn-close").click();
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      let errorMessage = "";

      Object.keys(errors).forEach(function (key) {
        errors[key].forEach(function (errorDetail) {
          errorMessage += `${errorDetail}\n`;
        });
      });

      Swal.fire({
        icon: "error",
        title: "Validation Errors",
        text: errorMessage,
      });
    } else {
      console.error("An unexpected error occurred", error);
    }
  }
};

const updateMouvement = async () => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/mouvements/${data.mouvement.id}`,
      data.mouvement
    );

    if (response.status === 200) {
      data.data_mouvements = data.data_mouvements.map((mouvement) =>
        mouvement.id === data.mouvement.id ? response.data.mouvement : mouvement
      );
      Swal.fire({
        icon: "success",
        title: "mouvement...",
        text: response.data.message,
      });

      document.querySelector("#editUser .btn-close").click();
    } else {
      Swal.fire({
        icon: "error",
        title: "mouvement...",
        text: response.data.message,
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      let errorMessage = "";

      Object.keys(errors).forEach(function (key) {
        errors[key].forEach(function (errorDetail) {
          errorMessage += `${errorDetail}\n`;
        });
      });

      Swal.fire({
        icon: "error",
        title: "Validation Errors",
        text: errorMessage,
      });
    } else {
      console.error("An unexpected error occurred", error);
    }
  }
};

const deleteMouvement = async (mouvement) => {
  try {
    Swal.fire({
      title: "Confirm Delete",
      text: `Are you sure you want to delete the mouvement '${mouvement.libelle}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/mouvements/${mouvement.id}`
        );
        if (response.status === 204) {
          data.data_mouvements = data.data_mouvements.filter(
            (d) => d.id !== mouvement.id
          );
          Swal.fire({
            icon: "success",
            title: "mouvement...",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "mouvement...",
            text: response.data.message,
          });
        }
      }
    });
  } catch (error) {
    store.setErrors(error.response.data.errors);
  }
};

onMounted(() => {
  fetch_data();
  fetch_data_provenances();
  fetch_data_destinations();
  fetch_data_depots();
  fetch_data_produits();
  fetch_data_unites();
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
