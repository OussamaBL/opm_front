<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Type personnel</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Libellé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.type_personnel.libelle" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Designation</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.type_personnel.designation" class="form-control" placeholder="Saisie designation" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Unité</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.type_personnel.unite_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="unite in data.data_unites" :key="unite.id" :value="unite.id">{{ unite.libelle }}</option>
                            </select>
                        </div>
                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addType_personnel()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateType_personnel()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button
                            type="button"
                            class="btn btn-label-secondary"
                            data-bs-dismiss="modal"
                            aria-label="Close">
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de personnel /</span> Type personnel</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addType_personnel" data-bs-target="#editUser">Ajouter type personnel</button>
                    <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des type personnel...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Libellé</th>
                                <th>Designation</th>
                                <th>Unité</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="type_personnel in data.data_types_personnel.data" :key="type_personnel.id" >
                                <td>{{ type_personnel.libelle }}</td>
                                <td>{{ type_personnel.designation }}</td>
                                <td>{{ type_personnel.unite.libelle }}</td>
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="ti ti-dots-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                        <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateType_personnel(type_personnel)" data-bs-target="#editUser" href="javascript:void(0);">
                                            <i class="ti ti-pencil me-1"></i> Edit
                                        </a>
                                        <a class="dropdown-item" @click="deleteType_personnel(type_personnel)" href="javascript:void(0);"
                                            ><i class="ti ti-trash me-1"></i> Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_types_personnel"
                        @pagination-change-page="fetch_data" style="margin: 16px;justify-content: center !important;"
                    />
                </div>
            </div>
                <!-- Offcanvas to add new customer -->
                
    </div>
            <!-- / Content -->
  </template>
  <script setup>
    import { reactive,onMounted } from "vue";
    import axios from 'axios';
    import Swal from 'sweetalert2';
    // import router from '@/router';
    import { useAuthStore } from '@/stores/useAuthStore.js';
    import { Bootstrap5Pagination } from 'laravel-vue-pagination';
  
    const store = useAuthStore();
    
    const data = reactive({
      data_types_personnel: [],
      data_unites: [],
      searchQuery: '',
      type_personnel: {
        id: '',
        libelle: '',
        designation: '',
        unite_id: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addType_personnel = () =>{
        data.action='add';
        data.type_personnel.id= '';
        data.type_personnel.designation= '';
        data.type_personnel.libelle= '';
        data.type_personnel.unite_id= '';
    }
    const open_modal_updateType_personnel = (type_personnel) =>{
        data.action='edit';
        data.type_personnel.id= type_personnel.id;
        data.type_personnel.designation= type_personnel.designation;
        data.type_personnel.libelle= type_personnel.libelle;
        data.type_personnel.unite_id= type_personnel.unite_id;
    }
    
    const fetch_data_unites = async () => {
      data.data_unites=[];
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/unites/get`);
        if(response.data.exist){
          data.data_unites=response.data.unites;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Unites...',
                text: error,
              });
      }
    };

    const fetch_data = async (page = 1) => {
      data.data_types_personnel=[];
      data.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/types_personnel/index?page=`+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_types_personnel=response.data.types_personnel;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Type personnel...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Type personnel...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addType_personnel = async () => {
      store.clearErrors();
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/types_personnel/store`, data.type_personnel);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'types personnel...',
            text: "type personnel '"+ response.data.type_personnel+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'types personnel...',
            text: response.data.message,
          });
        }
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const deleteType_personnel = async (type_personnel) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the type personnel '${type_personnel.libelle}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/types_personnel/destroy/`+type_personnel.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Type personnel...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Type personnel...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateType_personnel = async () => {
      try {
        const response = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/types_personnel/update/`+data.type_personnel.id,data.type_personnel);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Type personnel...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Type personnel...',
            text: response.data.message,
          });
        }
      } 
      catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    onMounted(()=>{
        fetch_data();
        fetch_data_unites();
    }); 
  </script>
  <style>
  div:where(.swal2-container) {
  z-index: 2000;
  }
  .table:not(.table-dark) thead:not(.table-dark) th{
    color: white;
  }
  </style>