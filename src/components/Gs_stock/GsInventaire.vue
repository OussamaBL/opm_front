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
            <h3 class="mb-2">Inventaire</h3>
          </div>
          <form
            id="editUserForm"
            class="row g-3"
            @submit.prevent="data.action === 'add' ? addInventaire() : updateInventaire()"
          >
            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserEmail">Date d'inventaire</label>
              <input
                type="text"
                id="modalEditUserEmail"
                v-model="data.inventaire.date_inventaire"
                class="form-control"
                placeholder="Saisie la date d inventaire"
              />
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserFirstName">Produit</label>
              <select
                id="modalEditUserCountry"
                class="select2 form-select"
                v-model="data.inventaire.produit_id"
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
              <label class="form-label" for="modalEditUserFirstName">Unite</label>
              <select
                id="modalEditUserCountry"
                class="select2 form-select"
                v-model="data.inventaire.unite_id"
                data-allow-clear="true"
              >
                <option value="">Select</option>
                <option
                  v-for="unite in data.data_unites"
                  :key="unite.id"
                  :value="unite.id"
                >
                  {{ unite.libelle }}
                </option>
              </select>
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserFirstName">Depot</label>
              <select
                id="modalEditUserCountry"
                class="select2 form-select"
                v-model="data.inventaire.depot_id"
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
              <label class="form-label" for="modalEditUserFirstName"
                >Stock physique</label
              >
              <input
                type="text"
                id="modalEditUserFirstName"
                v-model="data.inventaire.stock_physique"
                class="form-control"
                placeholder="Saisie la stock physique"
              />
            </div>

            <div class="col-12 text-center">
              <button type="submit" class="btn btn-primary me-sm-3 me-1">
                {{ data.action === "add" ? "Submit" : "Update" }}
              </button>
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
      <span class="text-muted fw-light">Gestion de Stock /</span> Inventaire entre Depots
    </h4>
    <div class="app-ecommerce-category">
      <!-- Category List Table -->
      <div class="card">
        <button
          class="btn btn-primary"
          style="width: 170px; margin: 12px"
          data-bs-toggle="modal"
          @click="open_modal_addInventaire"
          data-bs-target="#editUser"
        >
          Ajouter Inventaire
        </button>
        <input
          type="text"
          v-model="searchQuery"
          @keyup="fetch_data"
          class="form-control m-3"
          style="width: 96%"
          placeholder="Rechercher Inventaire..."
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
                <th>Date de Inventaire</th>
                <th>Code produit</th>
                <th>Produit</th>
                <th>Unite</th>
                <th>Depot</th>
                <th>Stock physique</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody class="table-border-bottom-0">
              <tr v-for="inventaire in data.data_inventaires.data" :key="inventaire.id">
                <td>{{ inventaire.date_inventaire }}</td>
                <td>{{ inventaire.produit.code }}</td>
                <td>{{ inventaire.produit.libelle }}</td>
                <td>{{ inventaire.produit.unite.libelle }}</td>
                <td>{{ inventaire.depot.libelle }}</td>
                <td>{{ inventaire.stock_physique }}</td>
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
                        @click="open_modal_updateInventaire(inventaire)"
                        data-bs-target="#editUser"
                        href="javascript:void(0);"
                      >
                        <i class="ti ti-pencil me-1"></i> Edit
                      </a>
                      <a
                        class="dropdown-item"
                        @click="deleteInventaire(inventaire)"
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
          :data="data.data_inventaires"
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
import { useAuthStore } from "@/stores/useAuthStore.js";
import { Bootstrap5Pagination } from "laravel-vue-pagination";

const store = useAuthStore();

const data = reactive({
  data_inventaires: [],
  data_produits: [],
  data_unites: [],
  data_depots: [],
  inventaire: {
    id: "",
    date_inventaire: "",
    produit_id: "",
    unite_id: "",
    depot_id: "",
    stock_physique: "",
  },
  loading: true,
  action: "",
  searchQuery: "",
});

const open_modal_addInventaire = () => {
  data.action = "add";
  data.inventaire = {
    id: "",
    date_inventaire: "",
    produit_id: "",
    unite_id: "",
    depot_id: "",
    stock_physique: "",
  };
};

const open_modal_updateInventaire = (inventaire) => {
  data.action = "edit";
  data.inventaire = { ...inventaire };
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

const fetch_data_depots = async () => {
  data.data_depots = [];
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/depots");

    data.data_depots = response.data.depots;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "depots...",
      text: error,
    });
  }
};

const fetch_data = async (page = 1) => {
  data.data_Inventaires = [];
  data.loading = true;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/Inventaires?page=" + page,
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

const addInventaire = async () => {
  store.clearErrors();
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/Inventaires",
      data.inventaire
    );

    if (response.status === 200) {
      data.data_Inventaires.push(response.data.inventaire);
      Swal.fire({
        icon: "success",
        title: "Inventaires...",
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

const updateInventaire = async () => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/inventaires/${data.inventaire.id}`,
      data.inventaire
    );

    if (response.status === 200) {
      data.data_inventaires = data.data_inventaires.map((inventaire) =>
        inventaire.id === data.inventaire.id ? response.data.inventaire : inventaire
      );
      Swal.fire({
        icon: "success",
        title: "inventaire...",
        text: response.data.message,
      });

      document.querySelector("#editUser .btn-close").click();
    } else {
      Swal.fire({
        icon: "error",
        title: "inventaire...",
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

const deleteInventaire = async (inventaire) => {
  try {
    Swal.fire({
      title: "Confirm Delete",
      text: `Are you sure you want to delete the inventaire '${inventaire.libelle}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/inventaires/${inventaire.id}`
        );
        if (response.status === 204) {
          data.data_inventaires = data.data_inventaires.filter(
            (d) => d.id !== inventaire.id
          );
          Swal.fire({
            icon: "success",
            title: "inventaire...",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "inventaire...",
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
  fetch_data_produits();
  fetch_data_unites();
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
