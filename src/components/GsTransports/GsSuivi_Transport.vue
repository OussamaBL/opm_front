<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Suivi de Transport</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Etude</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.transport.etude_de_transport_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="etude_transport in data.data_etude_transports" :key="etude_transport.id" :value="etude_transport.id">{{ etude_transport.code }} - {{ etude_transport.date }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Machine</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.transport.machine_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="machine in data.data_machines" :key="machine.id" :value="machine.id">{{ machine.engin }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Quantité</label>
                          <input type="number" id="modalEditUserFirstName" v-model="data.transport.quantite" class="form-control" placeholder="Saisie Quantité" />
                        </div>
                        

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addTransport()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateTransport()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de Transport /</span> Les Suivi des transports</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addTransport" data-bs-target="#editUser">Ajouter un transport</button>
                    <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des transports par date de suivi">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Date</th>
                                <th>Etude</th>
                                <th>Engin</th>
                                <th>Quantité</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="transport in data.data_transports.data" :key="transport.id" >
                                <td>{{ transport.date }}</td>
                                <td>{{ transport.etude_transport.code }} - {{ transport.etude_transport.date }}</td>
                                <td>{{ transport.machine.engin }}</td>
                                <td>{{ transport.quantite }}</td>
                                
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="ti ti-dots-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                        <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateTransport(transport)" data-bs-target="#editUser" href="javascript:void(0);">
                                            <i class="ti ti-pencil me-1"></i> Edit
                                        </a>
                                        <a class="dropdown-item" @click="deleteTransport(transport)" href="javascript:void(0);"
                                            ><i class="ti ti-trash me-1"></i> Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_transports"
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
      data_transports: [],
      data_etude_transports: [],
      data_machines: [],
      
      searchQuery: '',
      transport: {
        id: '',
        date: '',
        etude_de_transport_id: '',
        machine_id: '',
        quantite: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addTransport = () =>{
        data.action='add';
        data.transport.id= '';
        data.transport.date= '';
        data.transport.etude_de_transport_id= '';
        data.transport.machine_id= '';
        data.transport.quantite= '';
    }

    const open_modal_updateTransport = (transport) =>{
        data.action='edit';
        data.transport.id= transport.id;
        data.transport.date= transport.date;
        data.transport.etude_de_transport_id= transport.etude_de_transport_id;
        data.transport.machine_id= transport.machine_id;
        data.transport.quantite= transport.quantite;

    }
    
    const fetch_data_etude_transports = async () => {
      data.data_etude_transports=[];
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/etude_transports/get`);
        if(response.data.exist){
          data.data_etude_transports=response.data.etude_transports;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Etude Transports...',
                text: error,
              });
      }
    };

    const fetch_data_machines = async () => {
      data.data_machines=[];
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/machines/get`);
        if(response.data.exist){
          data.data_machines=response.data.machines;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Machines...',
                text: error,
              });
      }
    };

    const fetch_data = async (page = 1) => {
      data.data_transports=[];
      data.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/transports/index?page=`+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_transports=response.data.transports;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Transports...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Transports...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addTransport = async () => {
      store.clearErrors();
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/transports/store`, data.transport);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Transport...',
            text: "transport added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Transport...',
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
  
    const deleteTransport = async (transport) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete transport ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/transports/destroy/`+transport.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Transports...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Transports...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateTransport = async () => {
      try {
        const response = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/transports/update/`+data.transport.id,data.transport);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Transports...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Transports...',
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
        fetch_data_etude_transports();
        fetch_data_machines();
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