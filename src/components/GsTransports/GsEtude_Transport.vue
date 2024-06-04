<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Etude de Transport</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Constituant</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.constituant" class="form-control" placeholder="Saisie Constituant" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Unité</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.etude_transport.unite_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="unite in data.data_unites" :key="unite.id" :value="unite.id">{{ unite.libelle }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Temps de travail (H)</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.temp_de_travail" class="form-control" placeholder="Saisie temp de travail" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Temps de charge (H)</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.temp_de_charge" class="form-control" placeholder="Saisie temp de charge" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Temps de decharge (H)</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.temp_de_decharge" class="form-control" placeholder="Saisie temp de decharge" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Depart</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.depart" class="form-control" placeholder="Saisie depart" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Arrivé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.arrive" class="form-control" placeholder="Saisie arrive" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Distance (KM)</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.distance" class="form-control" placeholder="Saisie distance" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Vitesse (KM/H)</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.vitesse" class="form-control" placeholder="Saisie vitesse" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Produit</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.etude_transport.produit_fini_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="produit in data.data_produits" :key="produit.id" :value="produit.id">{{ produit.libelle }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Quantité</label>
                          <input type="number" id="modalEditUserFirstName" v-model="data.etude_transport.quantite" class="form-control" placeholder="Saisie Quantité" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Temp aller simple (H)</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.temp_aller_simple" class="form-control" placeholder="Saisie temp aller simple" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Temp de rotation (H)</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.temp_de_rotation" class="form-control" placeholder="Saisie temp de rotation" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Nbr de voyage par camion</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.etude_transport.nbr_de_voyage_par_camion" class="form-control" placeholder="Saisie nomber de voyage par camion" />
                        </div>

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addEtude_transport()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateEtude_transport()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de Transport /</span> Les etudes des transports</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addEtude_transport" data-bs-target="#editUser">Ajouter Etude transport</button>
                    <input type="text" v-model="searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des Etudes des transports...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>Constituant</th>
                                <th>Unité</th>
                                <th>Code</th>
                                <th>date</th>
                                <th>Temps de travail (H)</th>
                                <th>Temps de charge (H)</th>
                                <th>Temps de decharge (H)</th>
                                <th>Départ</th>
                                <th>Arrivé</th>
                                <th>Distance (KM)</th>
                                <th>Vitesse (KM/H)</th>
                                <th>Produit</th>
                                <th>Quantité</th>
                                <th>Temps aller simple (H)</th>
                                <th>Temps de rotation (H)</th>
                                <th>Nbr de voyage par camion</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="etude_transport in data.data_etude_transports.data" :key="etude_transport.id" >
                                <td>{{ etude_transport.code }}</td>
                                <td>{{ etude_transport.constituant }}</td>
                                <td>{{ etude_transport.unite.libelle }}</td>
                                <td>{{ etude_transport.date }}</td>
                                <td>{{ etude_transport.temp_de_travail }}</td>
                                <td>{{ etude_transport.temp_de_charge }}</td>
                                <td>{{ etude_transport.temp_de_decharge }}</td>
                                <td>{{ etude_transport.depart }}</td>
                                <td>{{ etude_transport.arrive }}</td>
                                <td>{{ etude_transport.distance }}</td>
                                <td>{{ etude_transport.vitesse }}</td>
                                <td>{{ etude_transport.produit.libelle }}</td>
                                <td>{{ etude_transport.quantite }}</td>
                                <td>{{ etude_transport.temp_aller_simple }}</td>
                                <td>{{ etude_transport.temp_de_rotation }}</td>
                                <td>{{ etude_transport.nbr_de_voyage_par_camion }}</td>
                                
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="ti ti-dots-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                        <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateEtude_transport(etude_transport)" data-bs-target="#editUser" href="javascript:void(0);">
                                            <i class="ti ti-pencil me-1"></i> Edit
                                        </a>
                                        <a class="dropdown-item" @click="deleteEtude_transport(etude_transport)" href="javascript:void(0);"
                                            ><i class="ti ti-trash me-1"></i> Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_etude_transports"
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
      data_etude_transports: [],
      data_produits: [],
      data_unites: [],
      
      searchQuery: '',
      etude_transport: {
        id: '',
        code: '',
        constituant: '',
        unite_id: '',
        date: '',
        temp_de_travail: '',
        temp_de_charge: '',
        temp_de_decharge: '',
        depart: '',
        arrive: '',
        distance: '',
        vitesse: '',
        produit_fini_id: '',
        quantite: '',
        temp_aller_simple: '',
        temp_de_rotation: '',
        nbr_de_voyage_par_camion: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addEtude_transport = () =>{
        data.action='add';
        data.etude_transport.id= '';
        data.etude_transport.code= '';
        data.etude_transport.constituant= '';
        data.etude_transport.unite_id= '';
        data.etude_transport.date= '';
        data.etude_transport.temp_de_travail= '';
        data.etude_transport.temp_de_charge= '';
        data.etude_transport.temp_de_decharge= '';
        data.etude_transport.depart= '';
        data.etude_transport.arrive= '';
        data.etude_transport.distance= '';
        data.etude_transport.vitesse= '';
        data.etude_transport.produit_fini_id= '';
        data.etude_transport.quantite= '';
        data.etude_transport.temp_aller_simple= '';
        data.etude_transport.temp_de_rotation= '';
        data.etude_transport.nbr_de_voyage_par_camion= '';
    }

    const open_modal_updateEtude_transport = (etude_transport) =>{
        data.action='edit';
        data.etude_transport.id= etude_transport.id;
        data.etude_transport.code= etude_transport.code;
        data.etude_transport.constituant= etude_transport.constituant;
        data.etude_transport.unite_id= etude_transport.unite_id;
        data.etude_transport.date= etude_transport.date;
        data.etude_transport.temp_de_travail= etude_transport.temp_de_travail;
        data.etude_transport.temp_de_charge= etude_transport.temp_de_charge;
        data.etude_transport.temp_de_decharge= etude_transport.temp_de_decharge;
        data.etude_transport.depart= etude_transport.depart;
        data.etude_transport.arrive= etude_transport.arrive;
        data.etude_transport.distance= etude_transport.distance;
        data.etude_transport.vitesse= etude_transport.vitesse;
        data.etude_transport.produit_fini_id= etude_transport.produit_fini_id;
        data.etude_transport.quantite= etude_transport.quantite;
        data.etude_transport.temp_aller_simple= etude_transport.temp_aller_simple;
        data.etude_transport.temp_de_rotation= etude_transport.temp_de_rotation;
        data.etude_transport.nbr_de_voyage_par_camion= etude_transport.nbr_de_voyage_par_camion;

    }
    
    const fetch_data_produits = async () => {
      data.data_produits=[];
      try {
        const response = await axios.get('/api/produits/index');
        if(response.data.exist){
          data.data_produits=response.data.produits;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Produits...',
                text: error,
              });
      }
    };

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
      data.data_etude_transports=[];
      data.loading = true;
      try {
        const response = await axios.get('/api/etude_transports/index?page='+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_etude_transports=response.data.etude_transports;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Etude transport...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Etude transport...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addEtude_transport = async () => {
      store.clearErrors();
      try {
        const response = await axios.post('/api/etude_transports/store', data.etude_transport);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Etude transport...',
            text: "Etude transport '"+ response.data.etude_transport+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Etude transport...',
            text: response.data.message,
          });
        }
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const deleteEtude_transport = async (etude_transport) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete etude transport ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete("/api/etude_transports/destroy/"+etude_transport.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Etude transports...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Etude transports...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateEtude_transport = async () => {
      try {
        const response = await axios.put("/api/etude_transports/update/"+data.etude_transport.id,data.etude_transport);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Etude transports...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Etude transports...',
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
        fetch_data_produits();
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