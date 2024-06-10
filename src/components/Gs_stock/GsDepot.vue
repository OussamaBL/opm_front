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
            <h3 class="mb-2">Depot</h3>
          </div>
          <form id="editUserForm" class="row g-3" onsubmit="return false">
            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserCode">Code</label>
              <input
                type="text"
                id="modalEditUserCode"
                v-model="data.depot.code"
                class="form-control"
                placeholder="Saisie la date d code"
              />
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserLibelle">Libelle</label>
              <input
                type="text"
                id="modalEditUserLibelle"
                v-model="data.depot.libelle"
                class="form-control"
                placeholder="Saisie la date d libelle"
              />
            </div>

            <div class="col-12 text-center">
              <button
                v-if="data.action == 'add'"
                type="submit"
                @click="addDepot"
                class="btn btn-primary me-sm-3 me-1"
              >
                Submit
              </button>
              <button
                v-if="data.action == 'edit'"
                type="submit"
                @click="updateDepot"
                class="btn btn-primary me-sm-3 me-1"
              >
                Submit
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
      <span class="text-muted fw-light">Gestion de Stock /</span> Depots
    </h4>
    <div class="app-ecommerce-category">
      <!-- Category List Table -->
      <div class="card">
        <button
          class="btn btn-primary"
          style="width: 170px; margin: 12px"
          data-bs-toggle="modal"
          @click="open_modal_addDepot"
          data-bs-target="#editUser"
        >
          Ajouter Depot
        </button>
        <input
          type="text"
          v-model="data.searchQuery"
          @keyup="fetch_data"
          class="form-control m-3"
          style="width: 96%"
          placeholder="Rechercher Depot..."
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
                <th>code</th>
                <th>Libelle</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody class="table-border-bottom-0">
              <tr v-for="depot in data.data_depots" :key="depot.id">
                <td>{{ depot.code }}</td>
                <td>{{ depot.libelle }}</td>
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
                        @click="open_modal_updateDepot(depot)"
                        data-bs-target="#editUser"
                        href="javascript:void(0);"
                      >
                        <i class="ti ti-pencil me-1"></i> Edit
                      </a>
                      <a
                        class="dropdown-item"
                        @click="deleteDepot(depot)"
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
          :data="data.data_depots"
          @pagination-change-page="fetch_data"
          style="margin: 16px; justify-content: center !important"
        />
      </div>
    </div>
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
  data_depots: [],
  depot: {
    id: "",
    code: "",
    libelle: "",
  },
  searchQuery: "",
  loading: true,
  action: "",
});

const open_modal_addDepot = () => {
  data.action = "add";
  data.depot.id = "";
  data.depot.code = "";
  data.depot.libelle = "";
};

const open_modal_updateDepot = (depot) => {
  data.action = "edit";
  data.depot.id = depot.id;
  data.depot.code = depot.code;
  data.depot.libelle = depot.libelle;
};

const fetch_data = async (page = 1) => {
  data.data_depots = [];
  data.loading = true;
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/depots?page=" + page, {
      params: {
        search: data.searchQuery,
      },
    });
    data.data_depots = response.data.depots;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Depots...",
      text: error.message,
    });
  } finally {
    data.loading = false;
  }
};

const addDepot = async () => {
  store.clearErrors();
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/depots", data.depot);

    if (response.status === 200) {
      data.data_depots.push(response.data.depots);
      Swal.fire({
        icon: "success",
        title: "Depot...",
        text: response.data.message,
      });

      // Fermer le modal
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

const updateDepot = async () => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/depots/${data.depot.id}`,
      data.depot
    );

    if (response.status === 200) {
      data.data_depots = data.data_depots.map((depot) =>
        depot.id === data.depot.id ? response.data.depot : depot
      );
      Swal.fire({
        icon: "success",
        title: "Depot...",
        text: response.data.message,
      });

      document.querySelector("#editUser .btn-close").click();
    } else {
      Swal.fire({
        icon: "error",
        title: "Depot...",
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

const deleteDepot = async (depot) => {
  try {
    Swal.fire({
      title: "Confirm Delete",
      text: `Are you sure you want to delete the depot '${depot.libelle}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/depots/${depot.id}`
        );
        if (response.status === 204) {
          data.data_depots = data.data_depots.filter((d) => d.id !== depot.id);
          Swal.fire({
            icon: "success",
            title: "Depot...",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Depot...",
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
