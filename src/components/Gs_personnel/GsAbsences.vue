<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Liste du Absences</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Personnel</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.absence.personnel_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="personnel in data.data_personnels" :key="personnel.id" :value="personnel.id">{{ personnel.nom }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Date de debut</label>
                          <input type="date" id="modalEditUserFirstName" v-model="data.absence.date_debut" class="form-control" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Date de fin</label>
                          <input type="date" id="modalEditUserFirstName" v-model="data.absence.date_fin" class="form-control" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Durée (J)</label>
                          <input type="number" id="modalEditUserFirstName" v-model="data.absence.duree" class="form-control" />
                        </div>
                        

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addAbsence()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateAbsence()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de personnel /</span> Les Absences</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addAbsence" data-bs-target="#editUser">Ajouter un Absence</button>
                    <input type="text" v-model="data.searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher par date d'absence ou date debut ou date fin.">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Date absence</th>
                                <th>Code</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Date de debut</th>
                                <th>Date de fin</th>
                                <th>Durée (J)</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="absence in data.data_absences.data" :key="absence.id" >
                                <td>{{ absence.date_absence }}</td>
                                <td>{{ absence.personnel.code }}</td>
                                <td>{{ absence.personnel.nom }}</td>
                                <td>{{ absence.personnel.prenom }}</td>
                                <td>{{ absence.date_debut }}</td>
                                <td>{{ absence.date_fin }}</td>
                                <td>{{ absence.duree }}</td>
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="ti ti-dots-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                        <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateAbsence(absence)" data-bs-target="#editUser" href="javascript:void(0);">
                                            <i class="ti ti-pencil me-1"></i> Edit
                                        </a>
                                        <a class="dropdown-item" @click="deleteAbsence(absence)" href="javascript:void(0);"
                                            ><i class="ti ti-trash me-1"></i> Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_absences"
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
      data_absences: [],
      data_personnels: [],
      searchQuery: '',
      absence: {
        id: '',
        date_absence: '',
        personnel_id: '',
        date_debut: '',
        date_fin: '',
        duree: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addAbsence = () =>{
        data.action='add';
        data.absence.id= '';
        data.absence.date_demande= '';
        data.absence.personnel_id= '';
        data.absence.date_debut= '';
        data.absence.date_fin= '';
        data.absence.duree= '';
    }
    const open_modal_updateAbsence = (absence) =>{
        data.action='edit';
        data.absence.id= absence.id;
        data.absence.date_absence= absence.date_absence;
        data.absence.personnel_id= absence.personnel_id;
        data.absence.date_debut= absence.date_debut;
        data.absence.date_fin= absence.date_fin;
        data.absence.duree= absence.duree;
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
      data.data_absences=[];
      data.loading = true;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/absences/index?page=`+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_absences=response.data.absences;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'Absences...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'Absences...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addAbsence = async () => {
      store.clearErrors();
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/absences/store`, data.absence);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Absences...',
            text: "Absence '"+ response.data.absence+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Absences...',
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
  
    const deleteAbsence = async (absence) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete this Absence?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/absences/destroy/`+absence.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'Absences...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Absences...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateAbsence = async () => {
      try {
        const response = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/absences/update/`+data.absence.id,data.absence);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Absences...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Absences...',
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