<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Liste du Avances</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserMonthAdvance">Mois de l'avance</label>
                          <input type="month" id="modalEditUserMonthAdvance" v-model="data.avance.mois_avance" class="form-control" placeholder="MM/YYYY" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Personnel</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.avance.personnel_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="personnel in data.data_personnels" :key="personnel.id" :value="personnel.id">{{ personnel.nom }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Montant</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.avance.montant" class="form-control" placeholder="Saisie montant" />
                        </div>
                        

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addAvance()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateAvance()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de personnel /</span> Les Avances</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addAvance" data-bs-target="#editUser">Ajouter un Avance</button>
                    <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher par mois d'avance">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Date</th>
                                <th>Mois de l'avance</th>
                                <th>Code</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Montant</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="avance in data.data_avances.data" :key="avance.id" >
                                <td>{{ avance.date }}</td>
                                <td>{{ avance.mois_avance }}</td>
                                <td>{{ avance.personnel.code }}</td>
                                <td>{{ avance.personnel.nom }}</td>
                                <td>{{ avance.personnel.prenom }}</td>
                                <td>{{ avance.montant }}</td>
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="ti ti-dots-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                        <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateAvance(avance)" data-bs-target="#editUser" href="javascript:void(0);">
                                            <i class="ti ti-pencil me-1"></i> Edit
                                        </a>
                                        <a class="dropdown-item" @click="deleteAvance(avance)" href="javascript:void(0);"
                                            ><i class="ti ti-trash me-1"></i> Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_avances"
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
      data_avances: [],
      data_personnels: [],
      searchQuery: '',
      avance: {
        id: '',
        date: '',
        mois_avance: '',
        personnel_id: '',
        montant: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addAvance = () =>{
        data.action='add';
        data.avance.id= '';
        data.avance.date= '';
        data.avance.mois_avance= '';
        data.avance.personnel_id= '';
        data.avance.montant= '';
    }
    const open_modal_updateAvance = (avance) =>{
        data.action='edit';
        data.avance.id= avance.id;
        data.avance.date= avance.date;
        data.avance.mois_avance= avance.mois_avance;
        data.avance.personnel_id= avance.personnel_id;
        data.avance.montant= avance.montant;
       
    }
    
    const fetch_data_personnels = async () => {
      data.data_personnels=[];
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/personnels/get`);
        if(response.data.exist){
          data.data_personnels=response.data.personnels;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'personnels...',
                text: error,
              });
      }
    };

    const fetch_data = async (page = 1) => {
      data.data_avances=[];
      data.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/avances/index?page=`+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_avances=response.data.avances;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Avances...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Avances...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addAvance = async () => {
      store.clearErrors();
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/avances/store`, data.avance);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Avances...',
            text: "Avance of '"+ response.data.avance+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Avances...',
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
  
    const deleteAvance = async (avance) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete this avance?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/avances/destroy/`+avance.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Avances...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Avances...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateAvance = async () => {
      try {
        const response = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/avances/update/`+data.avance.id,data.avance);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Avances...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Avances...',
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
        fetch_data_personnels();
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