<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Les Locations d'affaire</h3>
                      </div>
                      
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Affaire</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.affaire_location.affaire_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="affaire in data.data_affaires" :key="affaire.id" :value="affaire.id">{{ affaire.affaire }}</option>
                            </select>
                        </div>

                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Location</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.affaire_location.location_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="location in data.data_locations" :key="location.id" :value="location.id">{{ location.constituant }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Quantité</label>
                          <input type="number" id="modalEditUserFirstName" v-model="data.affaire_location.quantite" class="form-control" placeholder="Saisie quantité" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Prix</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.affaire_location.prix" class="form-control" placeholder="Saisie prix" />
                        </div>
                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addAffaire_Location()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateAffaire_Location()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production / Pointage | Suivi /</span>Les Locations  </h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <label for="" style="margin: 16px 0px 0px 17px;"><strong>Affaire</strong></label>
                    <select id="modalEditUserCountry" class="select2 form-select m-3" style="width: 96%;" v-model="data.affaire_id" data-allow-clear="true">
                        <option value="all">All</option>
                        <option v-for="affaire in data.data_affaires" :key="affaire.id" :value="affaire.id">{{ affaire.affaire }}</option>
                    </select>
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addAffaire_Location" data-bs-target="#editUser">Ajouter</button>
                    <input type="text" v-model="searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des Locations...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>Constituant</th>
                                <th>Unité</th>
                                <th>Quantité</th>
                                <th>Prix</th>
                                <th>Affaire</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="affaire_location in data.data_affaire_locations.data" :key="affaire_location.id">
                                <td>{{ affaire_location.location.code }}</td>
                                <td>{{ affaire_location.location.constituant }}</td>
                                <td>{{ affaire_location.location.unite.libelle }}</td>
                                <td>{{ affaire_location.quantite}}</td>
                                <td>{{ affaire_location.prix}}</td>
                                <td>{{ affaire_location.affaire.affaire}}</td>
                                <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i class="ti ti-dots-vertical"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateAffaire_Location(affaire_location)" data-bs-target="#editUser" href="javascript:void(0);">
                                        <i class="ti ti-pencil me-1"></i> Edit  
                                    </a>
                                    <a class="dropdown-item" @click="deleteAffaire_Location(affaire_location)" href="javascript:void(0);"
                                        ><i class="ti ti-trash me-1"></i> Delete</a>
                                    </div>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_affaire_locations"
                        @pagination-change-page="fetch_data" style="margin: 16px;justify-content: center !important;"
                    />
                </div>
            </div>
                <!-- Offcanvas to add new customer -->
                
    </div>
    <!-- / Content -->
  </template>
  <script setup>
    import { reactive,onMounted,watch  } from "vue";
    import axios from 'axios';
    import Swal from 'sweetalert2';
    // import router from '@/router';
    import { useAuthStore } from '@/stores/useAuthStore.js';
    import { Bootstrap5Pagination } from 'laravel-vue-pagination';
  
    const store = useAuthStore();
    
    const data = reactive({
      data_affaire_locations: [],
      data_affaires: [],
      data_locations: [],
      affaire_id : '',
      searchQuery: '',
      affaire_location: {
        id: '',
        affaire_id: '',
        location_id: '',
        quantite: '',
        prix: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addAffaire_Location = () => {
        data.action='add';
        data.affaire_location.id= '';
        data.affaire_location.affaire_id= '';
        data.affaire_location.location_id= '';
        data.affaire_location.quantite= ''; 
        data.affaire_location.prix= ''; 
    };

    const open_modal_updateAffaire_Location = (affaire_location) =>{
        data.action='edit';
        data.affaire_location.id= affaire_location.id;
        data.affaire_location.affaire_id= affaire_location.affaire_id;
        data.affaire_location.location_id= affaire_location.location_id;
        data.affaire_location.quantite= affaire_location.quantite; 
        data.affaire_location.prix= affaire_location.prix; 
    };
    
    const fetch_data_locations = async () => {
      data.data_locations=[];
      try {
        const response = await axios.get('/api/locations/index');
        if(response.data.exist){
          data.data_locations=response.data.locations;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Locations...',
                text: error,
              });
      }
    };

    const fetch_data_affaires = async () => {
      data.data_affaires=[];
      try {
        const response = await axios.get('/api/affaires/index');
        if(response.data.exist){
          data.data_affaires=response.data.affaires;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Affaires...',
                text: error,
              });
      }
    };

    const fetch_data = async (page = 1) => {
      data.data_affaire_locations=[];
      data.loading = true;
      try {
        const response = await axios.get('/api/affaire_locations/index?page='+page,{
          params: {
            search: data.searchQuery,
            affaire_id: data.affaire_id
          }
        });
        if(response.data.exist){
          data.data_affaire_locations=response.data.affaire_locations;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Affaire Locations...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Affaire Locations...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
    const addAffaire_Location = async () => {
      store.clearErrors();
      try {
        const response = await axios.post('/api/affaire_locations/store', data.affaire_location);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Affaire locations...',
            text: "location '"+ response.data.location+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Affaire locations...',
            text: response.data.message,
          });
        }
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const deleteAffaire_Location = async (affaire_location) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the location '${affaire_location.location.constituant}' from affaire ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete("/api/affaire_locations/destroy/"+affaire_location.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Affaire Locations...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Affaire Locations...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateAffaire_Location = async () => {
      try {
        const response = await axios.put("/api/affaire_locations/update/"+data.affaire_location.id,data.affaire_location);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Affaire locations...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Affaire locations...',
            text: response.data.message,
          });
        }
      } 
      catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }

    // Watching for changes in affaire_id
    watch(() => data.affaire_id, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        fetch_data();
      }
    });
  
    onMounted(()=>{
        fetch_data();
        fetch_data_affaires();
        fetch_data_locations();
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