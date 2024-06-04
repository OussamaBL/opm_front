<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Sous-traitance</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Constituant</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.sous_traitance.constituant" class="form-control" placeholder="Saisie Constituant" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Unité</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.sous_traitance.unite_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="unite in data.data_unites" :key="unite.id" :value="unite.id">{{ unite.libelle }}</option>
                            </select>
                        </div>
                        

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addSous_traitance()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateSous_traitance()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production /</span> Sous traitance</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addSous_traitance" data-bs-target="#editUser">Ajouter Sous traitance</button>
                    <input type="text" v-model="searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des Sous traitance...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>Constituant</th>
                                <th>Unité</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="sous_traitance in data.data_sous_traitances.data" :key="sous_traitance.id" >
                                <td>{{ sous_traitance.code }}</td>
                                <td>{{ sous_traitance.constituant }}</td>
                                <td>{{ sous_traitance.unite.libelle }}</td>
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="ti ti-dots-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                        <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateSous_traitance(sous_traitance)" data-bs-target="#editUser" href="javascript:void(0);">
                                            <i class="ti ti-pencil me-1"></i> Edit
                                        </a>
                                        <a class="dropdown-item" @click="deleteSous_traitance(sous_traitance)" href="javascript:void(0);"
                                            ><i class="ti ti-trash me-1"></i> Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_sous_traitances"
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
      data_sous_traitances: [],
      data_unites: [],
      searchQuery: '',
      sous_traitance: {
        id: '',
        code: '',
        constituant: '',
        unite_id: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addSous_traitance = () =>{
        data.action='add';
        data.sous_traitance.id= '';
        data.sous_traitance.code= '';
        data.sous_traitance.constituant= '';
        data.sous_traitance.unite_id= '';
    }
    const open_modal_updateSous_traitance = (sous_traitance) =>{
        data.action='edit';
        data.sous_traitance.id= sous_traitance.id;
        data.sous_traitance.code= sous_traitance.code;
        data.sous_traitance.constituant= sous_traitance.constituant;
        data.sous_traitance.unite_id= sous_traitance.unite_id;
      
    }
    
    const fetch_data_unites = async () => {
      data.data_unites=[];
      try {
        const response = await axios.get('/api/unites/index');
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
      data.data_sous_traitances=[];
      data.loading = true;
      try {
        const response = await axios.get('/api/sous_traitances/index?page='+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_sous_traitances=response.data.sous_traitances;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Sous traitances...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Sous traitances...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addSous_traitance = async () => {
      store.clearErrors();
      try {
        const response = await axios.post('/api/sous_traitances/store', data.sous_traitance);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Sous traitance...',
            text: "Sous traitance '"+ response.data.sous_traitance+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Sous traitance...',
            text: response.data.message,
          });
        }
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const deleteSous_traitance = async (sous_traitance) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the sous traitance '${sous_traitance.constituant}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete("/api/sous_traitances/destroy/"+sous_traitance.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Sous traitance...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Sous traitance...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateSous_traitance = async () => {
      try {
        const response = await axios.put("/api/sous_traitances/update/"+data.sous_traitance.id,data.sous_traitance);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Sous traitance...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Sous traitance...',
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