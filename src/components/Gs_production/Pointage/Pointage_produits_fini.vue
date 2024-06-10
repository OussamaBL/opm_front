<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Les Produits d'affaire</h3>
                      </div>
                      
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Affaire</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.affaire_produit.affaire_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="affaire in data.data_affaires" :key="affaire.id" :value="affaire.id">{{ affaire.affaire }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Produits finis</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.affaire_produit.produit_fini_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="produit in data.data_produits" :key="produit.id" :value="produit.id">{{ produit.libelle }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Quantité</label>
                          <input type="number" id="modalEditUserFirstName" v-model="data.affaire_produit.quantite" class="form-control" placeholder="Saisie quantité" />
                        </div>
                       

                       

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addAffaire_Produit()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateAffaire_Produit()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production / Pointage | Suivi /</span>Les Produits fini  </h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <label for="" style="margin: 16px 0px 0px 17px;"><strong>Affaire</strong></label>
                    <select id="modalEditUserCountry" class="select2 form-select m-3" style="width: 96%;" v-model="data.affaire_id" data-allow-clear="true">
                        <option value="all">All</option>
                        <option v-for="affaire in data.data_affaires" :key="affaire.id" :value="affaire.id">{{ affaire.affaire }}</option>
                    </select>
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addAffaire_Produit" data-bs-target="#editUser">Ajouter</button>
                    <input type="text" v-model="searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des produits...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>Produit fini</th>
                                <th>Unité</th>
                                <th>Quantité</th>
                                <th>Affaire</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="affaire_produit in data.data_affaire_produits.data" :key="affaire_produit.id">
                                <td>{{ affaire_produit.produit.code }}</td>
                                <td>{{ affaire_produit.produit.libelle }}</td>
                                <td>{{ affaire_produit.produit.unite.libelle }}</td>
                                <td>{{ affaire_produit.quantite}}</td>
                                <td>{{ affaire_produit.affaire.affaire}}</td>
                                <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i class="ti ti-dots-vertical"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateAffaire_Produit(affaire_produit)" data-bs-target="#editUser" href="javascript:void(0);">
                                        <i class="ti ti-pencil me-1"></i> Edit  
                                    </a>
                                    <a class="dropdown-item" @click="deleteAffaire_Produit(affaire_produit)" href="javascript:void(0);"
                                        ><i class="ti ti-trash me-1"></i> Delete</a>
                                    </div>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_affaire_produits"
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
      data_affaire_produits: [],
      data_affaires: [],
      data_produits: [],
      affaire_id : '',
      searchQuery: '',
      affaire_produit: {
        id: '',
        affaire_id: '',
        produit_fini_id: '',
        quantite: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addAffaire_Produit = () =>{
        data.action='add';
        data.affaire_produit.id= '';
        data.affaire_produit.affaire_id= '';
        data.affaire_produit.produit_fini_id= '';
        data.affaire_produit.quantite= ''; 
    };

    const open_modal_updateAffaire_Produit = (affaire_produit) =>{
        data.action='edit';
        data.affaire_produit.id= affaire_produit.id;
        data.affaire_produit.affaire_id= affaire_produit.affaire_id;
        data.affaire_produit.produit_fini_id= affaire_produit.produit_fini_id;
        data.affaire_produit.quantite= affaire_produit.quantite; 
    };
    
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
      data.data_affaire_produits=[];
      data.loading = true;
      try {
        const response = await axios.get('/api/affaire_produits/index?page='+page,{
          params: {
            search: data.searchQuery,
            affaire_id: data.affaire_id
          }
        });
        if(response.data.exist){
          data.data_affaire_produits=response.data.affaire_produits;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Affaire Produits...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Affaire Produits...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
    const addAffaire_Produit = async () => {
      store.clearErrors();
      try {
        const response = await axios.post('/api/affaire_produits/store', data.affaire_produit);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Affaire Produits...',
            text: "Produit '"+ response.data.produit+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Affaire Produits...',
            text: response.data.message,
          });
        }
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const deleteAffaire_Produit = async (affaire_produit) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the produit '${affaire_produit.produit.libelle}' from affaire ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete("/api/affaire_produits/destroy/"+affaire_produit.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Affaire Produits...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Affaire Produits...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateAffaire_Produit = async () => {
      try {
        const response = await axios.put("/api/affaire_produits/update/"+data.affaire_produit.id,data.affaire_produit);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Affaire Produits...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Affaire Produits...',
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
        fetch_data_produits();
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