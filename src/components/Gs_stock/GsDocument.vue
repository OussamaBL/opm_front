<template>
  <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="text-center mb-4">
            <h3 class="mb-2">Document</h3>
          </div>
          <form id="editUserForm" class="row g-3" onsubmit="return false">
            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUserCode">N° de document</label>
              <input type="text" id="modalEditUserCode" v-model="data.document.n_document" class="form-control"
                placeholder="Saisie la date d code" />
            </div>

            <div class="col-12 col-md-6" style="margin: 0 auto">
              <label class="form-label" for="modalEditUsertype_document">Type de Document</label>
              <input type="text" id="modalEditUsertype_document" v-model="data.document.type_document"
                class="form-control" placeholder="Saisie la date d type_document" />
            </div>

            <div class="col-12 text-center">
              <button v-if="data.action == 'add'" type="submit" @click="addDocument"
                class="btn btn-primary me-sm-3 me-1">
                Submit
              </button>
              <button v-if="data.action == 'edit'" type="submit" @click="updateDocument"
                class="btn btn-primary me-sm-3 me-1">
                Submit
              </button>
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
    <h4 class="py-3 mb-2">
      <span class="text-muted fw-light">Gestion de Stock /</span> Documents
    </h4>
    <div class="app-ecommerce-category">
      <!-- Category List Table -->
      <div class="card">
        <button class="btn btn-primary" style="width: 170px; margin: 12px" data-bs-toggle="modal"
          @click="open_modal_addDocument" data-bs-target="#editUser">
          Ajouter Document
        </button>
        <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%"
          placeholder="Rechercher Document..." />
        <div class="table-responsive text-nowrap">
          <img v-if="data.loading" src="/images/loading.gif" style="width: 40px; margin: 20px auto; display: block"
            alt="Loading" />
          <table v-if="!data.loading" class="table">
            <thead>
              <tr style="background-color: #051922">
                <th>code</th>
                <th>Type document</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody class="table-border-bottom-0">
              <tr v-for="document in data.data_documents" :key="document.id">
                <td>{{ document.n_document }}</td>
                <td>{{ document.type_document }}</td>
                <td>
                  <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                      <i class="ti ti-dots-vertical"></i>
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateDocument(document)"
                        data-bs-target="#editUser" href="javascript:void(0);">
                        <i class="ti ti-pencil me-1"></i> Edit
                      </a>
                      <a class="dropdown-item" @click="deleteDocument(document)" href="javascript:void(0);"><i
                          class="ti ti-trash me-1"></i> Delete</a>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Bootstrap5Pagination :data="data.data_documents" @pagination-change-page="fetch_data"
          style="margin: 16px; justify-content: center !important" />
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
  data_documents: [],
  document: {
    id: "",
    n_document: "",
    type_document: "",
  },
  searchQuery: "",
  loading: true,
  action: "",
});

const open_modal_addDocument = () => {
  data.action = "add";
  data.document.id = "";
  data.document.n_document = "";
  data.document.type_document = "";
};

const open_modal_updateDocument = (document) => {
  data.action = "edit";
  data.document.id = document.id;
  data.document.n_document = document.n_document;
  data.document.type_document = document.type_document;
};

const fetch_data = async (page = 1) => {
  data.data_documents = [];
  data.loading = true;
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/documents?page=" + page, {
      params: {
        search: data.searchQuery,
      },
    });
    data.data_documents = response.data.documents;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Documents...",
      text: error.message,
    });
  } finally {
    data.loading = false;
  }
};

const addDocument = async () => {
  store.clearErrors();
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/documents",
      data.document
    );

    if (response.status === 200) {
      data.data_documents.push(response.data.documents);
      Swal.fire({
        icon: "success",
        title: "Document...",
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

const updateDocument = async () => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/documents/${data.document.id}`,
      data.document
    );

    if (response.status === 200) {
      data.data_documents = data.data_documents.map((document) =>
        document.id === data.document.id ? response.data.document : document
      );
      Swal.fire({
        icon: "success",
        title: "Document...",
        text: response.data.message,
      });

      document.querySelector("#editUser .btn-close").click();
    } else {
      Swal.fire({
        icon: "error",
        title: "Document...",
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

const deleteDocument = async (document) => {
  try {
    Swal.fire({
      title: "Confirm Delete",
      text: `Are you sure you want to delete the document '${document.type_document}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          "http://127.0.0.1:8000/api/documents/" + document.id
        );
        if (response.status === 204) {
          data.data_documents = data.data_documents.filter((d) => d.id !== document.id);
          Swal.fire({
            icon: "success",
            title: "Document...",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Document...",
            text: response.data.message,
          });
        }
      }
    });
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
