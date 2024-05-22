<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Affaire</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <!-- <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Name</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.user.name" class="form-control" placeholder="Enter the name of user" />
                        </div> -->
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserEmail">Affaire</label>
                          <input type="text" id="modalEditUserEmail" v-model="data.affaire.affaire" class="form-control" placeholder="Saisie l'affaire" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Objet</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.affaire.objet" class="form-control" placeholder="Saisie l'objet" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Client</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.affaire.id_client" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="client in data.data_clients" :value="client.id">{{ client.name }}</option>
                            </select>
                        </div>

                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Montant devis étudié</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.affaire.montant_devis" class="form-control" placeholder="Saisie le Montant devis étudié" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserEmail">Montant définitif TTC</label>
                          <input type="text" id="modalEditUserEmail" v-model="data.affaire.montant_definitif_ttc" class="form-control" placeholder="Saisie Montant définitif TTC" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Date début de contrat</label>
                          <input type="date" id="modalEditUserFirstName" v-model="data.affaire.date_debut_contrat" class="form-control" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserEmail">Délai de contrat</label>
                          <input type="number" id="modalEditUserEmail" v-model="data.affaire.delai_contrat" class="form-control" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Durée d'arret justifiée</label>
                          <input type="number" id="modalEditUserFirstName" v-model="data.affaire.duree_arret" class="form-control"  />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserEmail">Date fin de contrat</label>
                          <input type="date" id="modalEditUserEmail" v-model="data.affaire.date_fin_contrat" class="form-control" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserEmail">Date d'offre</label>
                          <input type="date" id="modalEditUserEmail" v-model="data.affaire.date_offre" class="form-control" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Status</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.affaire.status" data-allow-clear="true">
                                <option value="">Select</option>
                                <option value="soumission">Soumission</option>
                                <option value="affaire_interne">Affaire interne</option>
                                <option value="traveaux">Traveaux</option>
                            </select>
                        </div>

                       

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addAffaire()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateAffaire()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
              <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production /</span> Les affaires</h4>
              <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                  <button class="btn btn-primary" style="width: 143px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addAffaire" data-bs-target="#editUser">Ajouter Affaire</button>
                  <div class="table-responsive text-nowrap">
                   <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                  <table v-if="!$data.loading" class="table">
                    <thead>
                      <tr style="background-color: #051922;">
                        <th>N d'affaire</th>
                        <th>Affaire</th>
                        <th>Objet</th>
                        <th>Client</th>
                        <th>Montant devis étudié</th>
                        <th>Montant définitif TTC</th>
                        <th>Date début de contrat</th>
                        <th>Délai de contrat</th>
                        <th>Durée d'arret justifiée</th>
                        <th>Date fin de contrat</th>
                        <th>Date d'offre</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                   
                    <tbody class="table-border-bottom-0">
                      
                      <tr v-for="affaire in data.data_affaires" :key="affaire.id">
                        <td>{{ affaire.num_affaire }}</td>
                        <td>{{ affaire.affaire }}</td>
                        <td>{{ affaire.objet }}</td>
                        <td>{{ affaire.client.name }}</td>
                        <td>{{ affaire.montant_devis }}</td>
                        <td>{{ affaire.montant_definitif_ttc }}</td>
                        <td>{{ affaire.date_debut_contrat }}</td>
                        <td>{{ affaire.delai_contrat }}</td>
                        <td>{{ affaire.duree_arret }}</td>
                        <td>{{ affaire.date_fin_contrat }}</td>
                        <td>{{ affaire.date_offre }}</td>
                        <td>{{ affaire.status }}</td>
                        <td>
                          <div class="dropdown">
                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateAffaire(affaire)" data-bs-target="#editUser" href="javascript:void(0);">
                                <i class="ti ti-pencil me-1"></i> Edit
                              </a>
                              <a class="dropdown-item" @click="deleteAffaire(user)" href="javascript:void(0);"
                                ><i class="ti ti-trash me-1"></i> Delete</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
                <!-- Offcanvas to add new customer -->
                
              </div>
    </div>
            <!-- / Content -->
  </template>
  <script setup>
    import { reactive,onMounted } from "vue";
    import axios from 'axios';
    import Swal from 'sweetalert2';
    // import router from '@/router';
    import { useAuthStore } from '@/stores/useAuthStore.js';
  
    const store = useAuthStore();
    
    const data = reactive({
      data_affaires: [],
      affaire: {
        id: '',
        num_affaire: '',
        affaire: '',
        objet: '',
        id_client: '',
        montant_devis: '',
        montant_definitif_ttc: '',
        date_debut_contrat: '',
        delai_contrat: '',
        duree_arret: '',
        date_fin_contrat: '',
        date_offre: '',
        status: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addAffaire = () =>{
        data.action='add';
        data.affaire.num_affaire= '',
        data.affaire.affaire= '',
        data.affaire.objet= '',
        data.affaire.id_client= '', 
        data.affaire.montant_devis= '',
        data.affaire.montant_definitif_ttc= '',
        data.affaire.date_debut_contrat= '',
        data.affaire.delai_contrat= '',
        data.affaire.duree_arret= '',
        data.affaire.date_fin_contrat= '',
        data.affaire.date_offre= '',
        data.affaire.status= ''
    }
    const open_modal_updateAffaire = (affaire) =>{
        data.action='edit';
        data.affaire.num_affaire= affaire.num_affaire,
        data.affaire.affaire= affaire.affaire,
        data.affaire.objet= affaire.objet,
        data.affaire.id_client= affaire.id_client, 
        data.affaire.montant_devis= affaire.montant_devis,
        data.affaire.montant_definitif_ttc= affaire.montant_definitif_ttc,
        data.affaire.date_debut_contrat= affaire.date_debut_contrat,
        data.affaire.delai_contrat= affaire.delai_contrat,
        data.affaire.duree_arret= affaire.duree_arret,
        data.affaire.date_fin_contrat= affaire.date_fin_contrat,
        data.affaire.date_offre= affaire.date_offre,
        data.affaire.status= affaire.status
    }
    
    const fetch_data_clients = async () => {
      data.data_clients=[];
      try {
        const response = await axios.get('/api/clients/index');
        if(response.data.exist){
          data.data_clients=response.data.clients;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Clients...',
                text: error,
              });
      }
    };

    const fetch_data = async () => {
      data.data_affaires=[];
      data.loading = true;
      try {
        const response = await axios.get('/api/affaires/index');
        if(response.data.exist){
          data.data_affaires=response.data.affaires;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Affaires...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Affaires...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addAffaire = async () => {
      store.clearErrors();
      try {
        const response = await axios.post('/api/affaire/store', data.affaire);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Affaires...',
            text: "Affaire '"+ response.data.affaire+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Affaires...',
            text: response.data.message,
          });
        }
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const deleteAffaire = async (affaire) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the affaire '${affaire.affaire}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete("/api/affaire/destroy/"+affaire.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Affaires...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Affaires...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateAffaire = async () => {
      try {
        const response = await axios.put("/api/affaire/update/"+data.affaire.id,data.affaire);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Affaires...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Affaires...',
            text: response.data.message,
          });
        }
      } 
      catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    onMounted(fetch_data); 
  </script>
  <style>
  div:where(.swal2-container) {
  z-index: 2000;
  }
  .table:not(.table-dark) thead:not(.table-dark) th{
    color: white;
  }
  </style>