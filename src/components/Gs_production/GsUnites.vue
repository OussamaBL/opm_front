<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Unites</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Libellé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.unite.libelle" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addUnite()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateUnite()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production /</span> Les Unités</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addUnite" data-bs-target="#editUser">Ajouter unite</button>
                    <input type="text" v-model="searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des Unités...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Libellé</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="unite in data.data_unites.data" :key="unite.id" >
                                <td>{{ unite.libelle }}</td>
                                <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i class="ti ti-dots-vertical"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateUnite(unite)" data-bs-target="#editUser" href="javascript:void(0);">
                                        <i class="ti ti-pencil me-1"></i> Edit
                                    </a>
                                    <a class="dropdown-item" @click="deleteUnite(unite)" href="javascript:void(0);"
                                        ><i class="ti ti-trash me-1"></i> Delete</a>
                                    </div>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_unites"
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
      data_unites: [],
      searchQuery: '',
      unite: {
        id: '',
        libelle: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addUnite = () =>{
        data.action='add';
        data.unite.id= '';
        data.unite.libelle= '';
    }
    const open_modal_updateUnite = (unite) =>{
        data.action='edit';
        data.unite.id= unite.id;
        data.unite.libelle= unite.libelle;
    }
    
    const fetch_data = async (page = 1) => {
      data.data_unites=[];
      data.loading = true;
      try {
        const response = await axios.get('/api/unites/index?page='+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_unites=response.data.unites;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Unites...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Unites...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addUnite = async () => {
      store.clearErrors();
      try {
        const response = await axios.post('/api/unites/store', data.unite);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Unite...',
            text: "Unite '"+ response.data.unite+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Unite...',
            text: response.data.message,
          });
        }
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const deleteUnite = async (unite) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the unite '${unite.libelle}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete("/api/unites/destroy/"+unite.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Unites...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Unites...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateUnite = async () => {
      try {
        const response = await axios.put("/api/unites/update/"+data.unite.id,data.unite);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Unites...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Unites...',
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