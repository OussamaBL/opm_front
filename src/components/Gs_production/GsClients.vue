<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Clients</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Libellé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.client.libelle" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Montant Facturé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.client.montant_facture" class="form-control" placeholder="Saisie montant facture" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Montant avoir</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.client.montant_avoir" class="form-control" placeholder="Saisie montant avoir" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Montant réglé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.client.montant_regle" class="form-control" placeholder="Saisie montant regle" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Montant non payé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.client.montant_non_paye" class="form-control" placeholder="Saisie montant non paye" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                            <label class="form-label" for="modalEditUserFirstName">Type client</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.client.type_client_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="type_client in data.data_types_client" :key="type_client.id" :value="type_client.id">{{ type_client.libelle }}</option>
                            </select>
                        </div>

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addClient()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateClient()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production /</span> Les Clients</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addClient" data-bs-target="#editUser">Ajouter client</button>
                    <input type="text" v-model="searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des Unités...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>Libellé</th>
                                <th>Montant facturé</th>
                                <th>Montant avoir</th>
                                <th>Montant réglé</th>
                                <th>Montant non payé</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="client in data.data_clients.data" :key="client.id" >
                                <td>{{ client.code }}</td>
                                <td>{{ client.libelle }}</td>
                                <td>{{ client.montant_facture }}</td>
                                <td>{{ client.montant_avoir }}</td>
                                <td>{{ client.montant_regle }}</td>
                                <td>{{ client.montant_non_paye }}</td>
                                <td>{{ client.type_client.libelle }}</td>
                                <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i class="ti ti-dots-vertical"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateClient(client)" data-bs-target="#editUser" href="javascript:void(0);">
                                        <i class="ti ti-pencil me-1"></i> Edit
                                    </a>
                                    <a class="dropdown-item" @click="deleteClient(client)" href="javascript:void(0);"
                                        ><i class="ti ti-trash me-1"></i> Delete</a>
                                    </div>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_clients"
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
      data_clients: [],
      data_types_client: [],
      
      searchQuery: '',
      client: {
        id: '',
        code: '',
        libelle: '',
        montant_facture: '',
        montant_avoir: '',
        montant_regle: '',
        montant_non_paye: '',
        type_client_id: '',
        
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addClient = () =>{
        data.action='add';
        data.client.id= '';
        data.client.code= '';
        data.client.libelle= '';
        data.client.montant_facture= '';
        data.client.montant_avoir= '';
        data.client.montant_regle= '';
        data.client.montant_non_paye= '';
        data.client.type_client_id= '';
    }
    const open_modal_updateClient = (client) =>{
        data.action='edit';
        data.client.id= client.id;
        data.client.code= client.code;
        data.client.libelle= client.libelle;
        data.client.montant_facture= client.montant_facture;
        data.client.montant_avoir= client.montant_avoir;
        data.client.montant_regle= client.montant_regle;
        data.client.montant_non_paye= client.montant_non_paye;
        data.client.type_client_id= client.type_client_id;

    } 
    
    const fetch_data_types_client = async () => {
      data.data_types_client=[];
      try {
        const response = await axios.get('/api/types_client/index');
        if(response.data.exist){
          data.data_types_client=response.data.types_client;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Types clients...',
                text: error,
              });
      }
    };

    const fetch_data = async (page = 1) => {
      data.data_clients=[];
      data.loading = true;
      try {
        const response = await axios.get('/api/clients/index?page='+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_clients=response.data.clients;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Clients...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Clients...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
    };
    
  
    const addClient = async () => {
      store.clearErrors();
      try {
        const response = await axios.post('/api/clients/store', data.client);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Client...',
            text: "Client '"+ response.data.client+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Client...',
            text: response.data.message,
          });
        }
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const deleteClient = async (client) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the client '${client.libelle}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete("/api/clients/destroy/"+client.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Client...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Client...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateClient = async () => {
      try {
        const response = await axios.put("/api/clients/update/"+data.client.id,data.client);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Client...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Client...',
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
        fetch_data_types_client();
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