<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Type</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                       
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Libellé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.type_produit.libelle" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addType()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateType()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production /</span> Les Type des produits</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addType" data-bs-target="#editUser">Ajouter type</button>
                    <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher type des produits...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>Libellé</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="type_produit in data.data_type_produits.data" :key="type_produit.id" >
                                <td>{{ type_produit.code }}</td>
                                <td>{{ type_produit.libelle }}</td>
                                <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i class="ti ti-dots-vertical"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateType(type_produit)" data-bs-target="#editUser" href="javascript:void(0);">
                                        <i class="ti ti-pencil me-1"></i> Edit
                                    </a>
                                    <a class="dropdown-item" @click="deleteType(type_produit)" href="javascript:void(0);"
                                        ><i class="ti ti-trash me-1"></i> Delete</a>
                                    </div>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_type_produits"
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
      data_type_produits: [],
      searchQuery: '',
      type_produit: {
        id: '',
        code: '',
        libelle: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addType = () =>{
        data.action='add';
        data.type_produit.id= '';
        data.type_produit.code= '';
        data.type_produit.libelle= '';
    }
    const open_modal_updateType = (type_produit) =>{
        data.action='edit';
        data.type_produit.id= type_produit.id;
        data.type_produit.code= type_produit.code;
        data.type_produit.libelle= type_produit.libelle;
    }
    
    const fetch_data = async (page = 1) => {
      data.data_type_produits=[];
      data.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/type_produits/index?page=`+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_type_produits=response.data.type_produits;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Type produits...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Type produits...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addType = async () => {
      store.clearErrors();
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/type_produits/store`, data.type_produit);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Type produits...',
            text: "Type produits '"+ response.data.type_produit+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Type produits...',
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
  
    const deleteType = async (type_produit) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the type '${type_produit.libelle}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/type_produits/destroy/`+type_produit.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Type produits...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Type produits...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateType = async () => {
      try {
        const response = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/type_produits/update/`+data.type_produit.id,data.type_produit);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Type produits...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Type produits...',
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