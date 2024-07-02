<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Liste du personnel</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Nom</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.personnel.nom" class="form-control" placeholder="Saisie le nom" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Prenom</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.personnel.prenom" class="form-control" placeholder="Saisie le prenom" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Type personnel</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.personnel.type_personnel_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="type_personnel in data.data_types_personnel" :key="type_personnel.id" :value="type_personnel.id">{{ type_personnel.libelle }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">CIN</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.personnel.cin" class="form-control" placeholder="Saisie le cin" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Tél</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.personnel.tel" class="form-control" placeholder="Saisie le numero telephone" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Mobile travail</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.personnel.mobile" class="form-control" placeholder="Saisie le numero mobile traivail" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">P.U.P</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.personnel.p_u_p" class="form-control" placeholder="Saisie le P.U.P" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">P.U.T</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.personnel.p_u_t" class="form-control" placeholder="Saisie le P.U.T" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Coet</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.personnel.coet" class="form-control" placeholder="Saisie le Coet" />
                        </div>

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addPersonnel()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updatePersonnel()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de personnel /</span> Liste du personnel</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addPersonnel" data-bs-target="#editUser">Ajouter un personnel</button>
                    <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des personnels avec Nom ou Cin...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Type</th>
                                <th>CIN</th>
                                <th>Tél</th>
                                <th>Mobile travail</th>
                                <th>P.U.P</th>
                                <th>P.U.T</th>
                                <th>Coet</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="personnel in data.data_personnels.data" :key="personnel.id" >
                                <td>{{ personnel.code }}</td>
                                <td>{{ personnel.nom }}</td>
                                <td>{{ personnel.prenom }}</td>
                                <td>{{ personnel.type_personnel.libelle }}</td>
                                <td>{{ personnel.cin }}</td>
                                <td>{{ personnel.tel }}</td>
                                <td>{{ personnel.mobile }}</td>
                                <td>{{ personnel.p_u_p }}</td>
                                <td>{{ personnel.p_u_t }}</td>
                                <td>{{ personnel.coet }}</td>
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="ti ti-dots-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                        <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updatePersonnel(personnel)" data-bs-target="#editUser" href="javascript:void(0);">
                                            <i class="ti ti-pencil me-1"></i> Edit
                                        </a>
                                        <a class="dropdown-item" @click="deletePersonnel(personnel)" href="javascript:void(0);"
                                            ><i class="ti ti-trash me-1"></i> Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_personnels"
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
      data_personnels: [],
      data_types_personnel: [],
      searchQuery: '',
      personnel: {
        id: '',
        code: '',
        nom: '',
        prenom: '',
        type_personnel_id: '',
        cin: '',
        tel: '',
        mobile: '',
        p_u_p: '',
        p_u_t: '',
        coet: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addPersonnel = () =>{
        data.action='add';
        data.personnel.id= '';
        data.personnel.code= '';
        data.personnel.nom= '';
        data.personnel.prenom= '';
        data.personnel.type_personnel_id= '';
        data.personnel.cin= '';
        data.personnel.tel= '';
        data.personnel.mobile= '';
        data.personnel.p_u_p= '';
        data.personnel.p_u_t= '';
        data.personnel.coet= '';
    }
    const open_modal_updatePersonnel = (personnel) =>{
        data.action='edit';
        data.personnel.id= personnel.id;
        data.personnel.code= personnel.code;
        data.personnel.nom= personnel.nom;
        data.personnel.prenom= personnel.prenom;
        data.personnel.type_personnel_id= personnel.type_personnel_id;
        data.personnel.cin= personnel.cin;
        data.personnel.tel= personnel.tel;
        data.personnel.mobile= personnel.mobile;
        data.personnel.p_u_p= personnel.p_u_p;
        data.personnel.p_u_t= personnel.p_u_t;
        data.personnel.coet= personnel.coet;
    }
    
    const fetch_data_types_personnel = async () => {
      data.data_types_personnel=[];
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/types_personnel/get`);
        if(response.data.exist){
          data.data_types_personnel=response.data.types_personnel;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Types personnel...',
                text: error,
              });
      }
    };

    const fetch_data = async (page = 1) => {
      data.data_personnels=[];
      data.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/personnels/index?page=`+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_personnels=response.data.personnels;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Personnel...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Personnel...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addPersonnel = async () => {
      store.clearErrors();
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/personnels/store`, data.personnel);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Personnel...',
            text: "Personnel '"+ response.data.personnel+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'personnel...',
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
  
    const deletePersonnel = async (personnel) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the personnel '${personnel.nom}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/personnels/destroy/`+personnel.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Personnel...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Personnel...',
                    text: response.data.message,
                  });
                }
            }
          });
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
  
    const updatePersonnel = async () => {
      try {
        const response = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/personnels/update/`+data.personnel.id,data.personnel);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'personnel...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'personnel...',
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
        fetch_data_types_personnel();
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