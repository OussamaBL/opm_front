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
            <h3 class="mb-2">Provenance</h3>
          </div>
          <form
            id="editUserForm"
            class="row g-3"
            @submit.prevent="data.action === 'add' ? addProvenance() : updateProvenance()"
          >
            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserEmail">Code</label>
              <input
                type="text"
                id="modalEditUserEmail"
                v-model="data.provenance.code"
                class="form-control"
                placeholder="Saisie la date d code"
              />
            </div>
            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserEmail">Libelle</label>
              <input
                type="text"
                id="modalEditUserEmail"
                v-model="data.provenance.libelle"
                class="form-control"
                placeholder="Saisie la date d libelle"
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
      <span class="text-muted fw-light">Gestion de Stock /</span> Provenances
    </h4>
    <div class="app-ecommerce-category">
      <!-- Category List Table -->
      <div class="card">
        <button
          class="btn btn-primary"
          style="width: 170px; margin: 12px"
          data-bs-toggle="modal"
          @click="open_modal_addProvenance"
          data-bs-target="#editUser"
        >
          Ajouter Provenance
        </button>
        <input
          type="text"
          v-model="searchQuery"
          @keyup="fetch_data"
          class="form-control m-3"
          style="width: 96%"
          placeholder="Rechercher Provenance..."
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
                <th>Code</th>
                <th>Libelle</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              <tr v-for="provenance in data.data_provenances" :key="provenance.id">
                <td>{{ provenance.code }}</td>
                <td>{{ provenance.libelle }}</td>
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
                        @click="open_modal_updateProvenance(provenance)"
                        data-bs-target="#editUser"
                        href="javascript:void(0);"
                      >
                        <i class="ti ti-pencil me-1"></i> Edit
                      </a>
                      <a
                        class="dropdown-item"
                        @click="deleteProvenance(provenance)"
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
          :data="data.data_provenances"
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
  data_provenances: [],
  provenance: {
    id: "",
    code: "",
    libelle: "",
  },
  loading: true,
  action: "",
  searchQuery: "",
});

const open_modal_addProvenance = () => {
  data.action = "add";
  data.provenance = {
    id: "",
    code: "",
    libelle: "",
  };
};

const open_modal_updateProvenance = (provenance) => {
  data.action = "edit";
  data.provenance = { ...provenance };
};

const fetch_data = async (page = 1) => {
  data.data_provenances = [];
  data.loading = true;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/provenances?page=" + page,
      {
        params: {
          search: data.searchQuery,
        },
      }
    );

    data.data_provenances = response.data.provenances;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Provenance...",
      text: error.message,
    });
  } finally {
    data.loading = false;
  }
};

const addProvenance = async () => {
  store.clearErrors();
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/provenances",
      data.provenance
    );

    if (response.status === 200) {
      data.data_provenances.push(response.data.provenance);
      Swal.fire({
        icon: "success",
        title: "Provenances...",
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

const updateProvenance = async () => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/provenances/${data.provenance.id}`,
      data.provenance
    );

    if (response.status === 200) {
      data.data_provenances = data.data_provenances.map((provenance) =>
        provenance.id === data.provenance.id ? response.data.provenance : provenance
      );
      Swal.fire({
        icon: "success",
        title: "provenance...",
        text: response.data.message,
      });

      document.querySelector("#editUser .btn-close").click();
    } else {
      Swal.fire({
        icon: "error",
        title: "provenance...",
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

const deleteProvenance = async (provenance) => {
  try {
    Swal.fire({
      title: "Confirm Delete",
      text: `Are you sure you want to delete the provenance '${provenance.libelle}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/provenances/${provenance.id}`
        );
        if (response.status === 204) {
          data.data_provenances = data.data_provenances.filter(
            (d) => d.id !== provenance.id
          );
          Swal.fire({
            icon: "success",
            title: "provenance...",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "provenance...",
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
