<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Fournitures</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Constituant</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.fourniture.constituant" class="form-control" placeholder="Saisie constituant" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                            <label class="form-label" for="modalEditUserFirstName">Unité</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.fourniture.unite_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="unite in data.data_unites" :key="unite.id" :value="unite.id">{{ unite.libelle }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                            <label class="form-label" for="modalEditUserFirstName">Fournisseur</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.fourniture.fournisseur_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="fournisseur in data.data_fournisseurs" :key="fournisseur.id" :value="fournisseur.id">{{ fournisseur.libelle }}</option>
                            </select>
                        </div>

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addFourniture()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateFourniture()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production /</span> Les Fournitures</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addFourniture" data-bs-target="#editUser">Ajouter Fourniture</button>
                    <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des fournitures par constituant...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>Constituant</th>
                                <th>Unité</th>
                                <th>Fournisseur</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="fourniture in data.data_fournitures.data" :key="fourniture.id" >
                                <td>{{ fourniture.code }}</td>
                                <td>{{ fourniture.constituant }}</td>
                                <td>{{ fourniture.unite.libelle }}</td>
                                <td>{{ fourniture.fournisseur.libelle }}</td>
                                <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i class="ti ti-dots-vertical"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateFourniture(fourniture)" data-bs-target="#editUser" href="javascript:void(0);">
                                        <i class="ti ti-pencil me-1"></i> Edit
                                    </a>
                                    <a class="dropdown-item" @click="deleteFourniture(fourniture)" href="javascript:void(0);"
                                        ><i class="ti ti-trash me-1"></i> Delete</a>
                                    </div>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_fournitures"
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
      data_fournitures: [],
      data_fournisseurs: [],
      data_unites: [],
      
      searchQuery: '',
      fourniture: {
        id: '',
        code: '',
        constituant: '',
        unite_id: '',
        fournisseur_id: '',
        
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addFourniture = () =>{
        data.action='add';
        data.fourniture.id= '';
        data.fourniture.code= '';
        data.fourniture.constituant= '';
        data.fourniture.unite_id= '';
        data.fourniture.fournisseur_id= '';
    }
    const open_modal_updateFourniture = (fourniture) =>{
        data.action='edit';
        data.fourniture.id= fourniture.id;
        data.fourniture.code= fourniture.code;
        data.fourniture.constituant= fourniture.constituant;
        data.fourniture.unite_id= fourniture.unite_id;
        data.fourniture.fournisseur_id= fourniture.fournisseur_id;

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
    const fetch_data_fournisseurs = async () => {
      data.data_fournisseurs=[];
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/fournisseurs/get`);
        if(response.data.exist){
          data.data_fournisseurs=response.data.fournisseurs;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'fournisseurs...',
                text: error,
              });
      }
    };

    const fetch_data = async (page = 1) => {
      data.data_fournitures=[];
      data.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/fournitures/index?page=`+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_fournitures=response.data.fournitures;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Fournitures...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Fournitures...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
    };
    
  
    const addFourniture = async () => {
      store.clearErrors();
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/fournitures/store`, data.fourniture);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'fourniture...',
            text: "fourniture '"+ response.data.fourniture+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'fourniture...',
            text: response.data.message,
          });
        }
      } catch (error) {
        const errors = error.response.data.errors;
            let errorMessages = '';
            for (const key in errors) {
               errorMessages += ` ${errors[key].join(' ')}\n`;
               errorMessages += '&& ';
            }
            if (errorMessages.endsWith('&& ')) {
                errorMessages = errorMessages.slice(0, -3); // Remove the last two characters
            }
            Swal.fire({ 
                icon: 'error',
                title: 'Validation Error',
                text: errorMessages,
            });
      }
    }
  
    const deleteFourniture = async (fourniture) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the fourniture '${fourniture.constituant}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/fournitures/destroy/`+fourniture.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'fournitures...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'fournitures...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateFourniture = async () => {
      try {
        const response = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/fournitures/update/`+data.fourniture.id,data.fourniture);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'fournitures...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'fournitures...',
            text: response.data.message,
          });
        }
      } 
      catch (error) {
        const errors = error.response.data.errors;
            let errorMessages = '';
            for (const key in errors) {
               errorMessages += ` ${errors[key].join(' ')}\n`;
               errorMessages += '&& ';
            }
            if (errorMessages.endsWith('&& ')) {
                errorMessages = errorMessages.slice(0, -3); // Remove the last two characters
            }
            Swal.fire({ 
                icon: 'error',
                title: 'Validation Error',
                text: errorMessages,
            });
      }
    }
  
    onMounted(()=>{
        fetch_data();
        fetch_data_unites();
        fetch_data_fournisseurs();
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