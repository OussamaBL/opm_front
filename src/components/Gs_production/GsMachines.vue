<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Machines</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">engin</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.machine.engin" class="form-control" placeholder="Saisie engin" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Matricule</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.machine.matricule" class="form-control" placeholder="Saisie matricule" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Unité</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.machine.unite_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="unite in data.data_unites" :key="unite.id" :value="unite.id">{{ unite.libelle }}</option>
                            </select>
                        </div>
                        

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addMachine()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateMachine()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production /</span> Les Machines</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addMachine" data-bs-target="#editUser">Ajouter Machine</button>
                    <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des Machines...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>engin</th>
                                <th>Matricule</th>
                                <th>Unité</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="machine in data.data_machines.data" :key="machine.id" >
                                <td>{{ machine.code }}</td>
                                <td>{{ machine.engin }}</td>
                                <td>{{ machine.matricule }}</td>
                                <td>{{ machine.unite.libelle }}</td>
                                
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="ti ti-dots-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                        <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateMachine(machine)" data-bs-target="#editUser" href="javascript:void(0);">
                                            <i class="ti ti-pencil me-1"></i> Edit
                                        </a>
                                        <a class="dropdown-item" @click="deleteMachine(machine)" href="javascript:void(0);"
                                            ><i class="ti ti-trash me-1"></i> Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_machines"
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
      data_machines: [],
      data_unites: [],
      searchQuery: '',
      machine: {
        id: '',
        code: '',
        engin: '',
        matricule: '',
        unite_id: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addMachine = () =>{
        data.action='add';
        data.machine.id= '';
        data.machine.code= '';
        data.machine.engin= '';
        data.machine.matricule= '';
        data.machine.unite_id= '';
    }
    const open_modal_updateMachine = (machine) =>{
        data.action='edit';
        data.machine.id= machine.id;
        data.machine.code= machine.code;
        data.machine.engin= machine.engin;
        data.machine.matricule= machine.matricule;
        data.machine.unite_id= machine.unite_id;
      
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
      data.data_machines=[];
      data.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/machines/index?page=`+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_machines=response.data.machines;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Machines...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Machines...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addMachine = async () => {
      store.clearErrors();
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/machines/store`, data.machine);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Machine...',
            text: "Machine '"+ response.data.machine+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Machine...',
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
  
    const deleteMachine = async (machine) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the machine '${machine.engin}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/machines/destroy/`+machine.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Machines...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Machines...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateMachine = async () => {
      try {
        const response = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/machines/update/`+data.machine.id,data.machine);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Machines...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Machines...',
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