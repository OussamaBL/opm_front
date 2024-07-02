<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Fournisseurs</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Libellé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.fournisseur.libelle" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Délai de livraison</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.fournisseur.delai_livraison" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Montant facturé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.fournisseur.montant_facture" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Montant avoir</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.fournisseur.montant_avoir" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Montant réglé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.fournisseur.montant_regle" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Montant non payé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.fournisseur.montant_non_paye" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        
                        

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addFournisseur()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateFournisseur()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production /</span> Les Fournisseurs</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addFournisseur" data-bs-target="#editUser">Ajouter Fournisseur</button>
                    <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des Fournisseurs...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>Libellé</th>
                                <th>Délai de livraison</th>
                                <th>Montant facturé</th>
                                <th>Montant avoir</th>
                                <th>Montant réglé</th>
                                <th>Montant non payé</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="fournisseur in data.data_fournisseurs.data" :key="fournisseur.id" >
                                <td>{{ fournisseur.code }}</td>
                                <td>{{ fournisseur.libelle }}</td>
                                <td>{{ fournisseur.delai_livraison }}</td>
                                <td>{{ fournisseur.montant_facture }}</td>
                                <td>{{ fournisseur.montant_avoir }}</td>
                                <td>{{ fournisseur.montant_regle }}</td>
                                <td>{{ fournisseur.montant_non_paye }}</td>
                                <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i class="ti ti-dots-vertical"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateFournisseur(fournisseur)" data-bs-target="#editUser" href="javascript:void(0);">
                                        <i class="ti ti-pencil me-1"></i> Edit
                                    </a>
                                    <a class="dropdown-item" @click="deleteFournisseur(fournisseur)" href="javascript:void(0);"
                                        ><i class="ti ti-trash me-1"></i> Delete</a>
                                    </div>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_fournisseurs"
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
      data_fournisseurs: [],
      searchQuery: '',
      fournisseur: {
        id: '',
        code: '',
        libelle: '',
        delai_livraison: '',
        montant_facture: '',
        montant_avoir: '',
        montant_regle: '',
        montant_non_paye: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addFournisseur = () =>{
        data.action='add';
        data.fournisseur.id= '';
        data.fournisseur.code= '';
        data.fournisseur.libelle= '';
        data.fournisseur.delai_livraison= '';
        data.fournisseur.montant_facture= '';
        data.fournisseur.montant_avoir= '';
        data.fournisseur.montant_regle= '';
        data.fournisseur.montant_non_paye= '';
    }
    const open_modal_updateFournisseur = (fournisseur) =>{
        data.action='edit';
        data.fournisseur.id= fournisseur.id;
        data.fournisseur.code= fournisseur.code;
        data.fournisseur.libelle= fournisseur.libelle;
        data.fournisseur.delai_livraison= fournisseur.delai_livraison;
        data.fournisseur.montant_facture= fournisseur.montant_facture;
        data.fournisseur.montant_avoir= fournisseur.montant_avoir;
        data.fournisseur.montant_regle= fournisseur.montant_regle;
        data.fournisseur.montant_non_paye= fournisseur.montant_non_paye;

    }
    
    const fetch_data = async (page = 1) => {
      data.data_fournisseurs=[];
      data.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/fournisseurs/index?page=`+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_fournisseurs=response.data.fournisseurs;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Fournisseurs...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Fournisseurs...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addFournisseur = async () => {
      store.clearErrors();
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/fournisseurs/store`, data.fournisseur);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Fournisseurs...',
            text: "Fournisseurs '"+ response.data.fournisseur+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Fournisseurs...',
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
  
    const deleteFournisseur = async (fournisseur) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the fournisseur '${fournisseur.libelle}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/fournisseurs/destroy/`+fournisseur.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Fournisseurs...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Fournisseurs...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateFournisseur = async () => {
      try {
        const response = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/fournisseurs/update/`+data.fournisseur.id,data.fournisseur);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Fournisseurs...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Fournisseurs...',
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