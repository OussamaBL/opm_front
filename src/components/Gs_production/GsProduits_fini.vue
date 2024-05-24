<template>
    <!-- Content -->
  <!-- Edit User Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                  <div class="modal-content p-3 p-md-5">
                    <div class="modal-body">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="text-center mb-4">
                        <h3 class="mb-2">Produit fini</h3>
                      </div>
                      <form id="editUserForm" class="row g-3" onsubmit="return false">
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Libellé</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.produit.libelle" class="form-control" placeholder="Saisie libelle" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Unité</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.produit.unite_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="unite in data.data_unites" :key="unite.id" :value="unite.id">{{ unite.libelle }}</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">PU V HT</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.produit.pu_v_ht" class="form-control" placeholder="Saisie Prix unitaire" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">TVA</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.produit.tva" class="form-control" placeholder="Saisie TVA" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Alertes stock</label>
                          <input type="text" id="modalEditUserFirstName" v-model="data.produit.alertes_stock" class="form-control" placeholder="Saisie l'alertes stock" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Stock initial</label>
                          <input type="number" id="modalEditUserFirstName" v-model="data.produit.stock_initial" class="form-control" placeholder="Saisie stock initial" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Stock actuel</label>
                          <input type="number" id="modalEditUserFirstName" v-model="data.produit.stock_actuel" class="form-control" placeholder="Saisie stock actuel" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Stock inventaire</label>
                          <input type="number" id="modalEditUserFirstName" v-model="data.produit.stock_inventaire" class="form-control" placeholder="Saisie stock inventaire" />
                        </div>
                        <div class="col-12 col-md-6" style="margin: 0 auto;">
                          <label class="form-label" for="modalEditUserFirstName">Type de produit</label>
                            <select id="modalEditUserCountry" class="select2 form-select" v-model="data.produit.type_produit_id" data-allow-clear="true">
                                <option value="">Select</option>
                                <option v-for="type_produit in data.data_type_produits" :key="type_produit.id" :value="type_produit.id">{{ type_produit.libelle }}</option>
                            </select>
                        </div>

                        <div class="col-12 text-center">
                          <button v-if="data.action=='add'" type="submit" @click="addProduit()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                          <button v-if="data.action=='edit'" type="submit" @click="updateProduit()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light">Gestion de production /</span> Les produits fini</h4>
            <div class="app-ecommerce-category">
                <!-- Category List Table -->
                <div class="card">
                    <button class="btn btn-primary" style="width: 170px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addProduit" data-bs-target="#editUser">Ajouter Produit</button>
                    <input type="text" v-model="searchQuery" @keyup="fetch_data" class="form-control m-3" style="width: 96%;" placeholder="Rechercher des produits...">
                    <div class="table-responsive text-nowrap">
                        <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                        <table v-if="!$data.loading" class="table">
                            <thead>
                            <tr style="background-color: #051922;">
                                <th>Code</th>
                                <th>Libellé</th>
                                <th>Unité</th>
                                <th>PU V HT</th>
                                <th>TVA</th>
                                <th>Alertes stock</th>
                                <th>Stock initial</th>
                                <th>Stock actuel</th>
                                <th>Stock inventaire</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                        
                            <tbody class="table-border-bottom-0">
                            
                            <tr v-for="produit in data.data_produits.data" :key="produit.id" >
                                <td>{{ produit.code }}</td>
                                <td>{{ produit.libelle }}</td>
                                <td>{{ produit.unite.libelle }}</td>
                                <td>{{ produit.pu_v_ht }}</td>
                                <td>{{ produit.tva }}</td>
                                <td>{{ produit.alertes_stock }}</td>
                                <td>{{ produit.stock_initial }}</td>
                                <td>{{ produit.stock_actuel }}</td>
                                <td>{{ produit.stock_inventaire }}</td>
                                <td>{{ produit.type_produit.libelle }}</td>
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="ti ti-dots-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                        <a class="dropdown-item" data-bs-toggle="modal" @click="open_modal_updateProduit(produit)" data-bs-target="#editUser" href="javascript:void(0);">
                                            <i class="ti ti-pencil me-1"></i> Edit
                                        </a>
                                        <a class="dropdown-item" @click="deleteProduit(produit)" href="javascript:void(0);"
                                            ><i class="ti ti-trash me-1"></i> Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Bootstrap5Pagination
                        :data="data.data_produits"
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
      data_produits: [],
      data_unites: [],
      data_type_produits: [],
      searchQuery: '',
      produit: {
        id: '',
        code: '',
        libelle: '',
        unite_id: '',
        pu_v_ht: '',
        tva: '',
        alertes_stock: '',
        stock_initial: '',
        stock_actuel: '',
        stock_inventaire: '',
        type_produit_id: '',
      },
      loading:true,
      action:'',
    });
    
    const open_modal_addProduit = () =>{
        data.action='add';
        data.produit.id= '';
        data.produit.code= '';
        data.produit.libelle= '';
        data.produit.unite_id= '';
        data.produit.pu_v_ht= '';
        data.produit.tva= '';
        data.produit.stock_initial= '';
        data.produit.stock_actuel= '';
        data.produit.stock_inventaire= '';
        data.produit.type_produit= '';
    }
    const open_modal_updateProduit = (produit) =>{
        data.action='edit';
        data.produit.id= produit.id;
        data.produit.code= produit.code;
        data.produit.libelle= produit.libelle;
        data.produit.unite_id= produit.unite_id;
        data.produit.pu_v_ht= produit.pu_v_ht;
        data.produit.tva= produit.tva;
        data.produit.stock_initial= produit.stock_initial;
        data.produit.stock_actuel= produit.stock_actuel;
        data.produit.stock_inventaire= produit.stock_inventaire;
        data.produit.type_produit= produit.type_produit;
    }
    
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
    const fetch_data_type_produits = async () => {
      data.data_type_produits=[];
      try {
        const response = await axios.get('/api/type_produits/index');
        if(response.data.exist){
          data.data_type_produits=response.data.type_produits;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'type produits...',
                text: error,
              });
      }
    };

    const fetch_data = async (page = 1) => {
      data.data_produits=[];
      data.loading = true;
      try {
        const response = await axios.get('/api/produits_fini/index?page='+page,{
          params: {
            search: data.searchQuery
          }
        });
        if(response.data.exist){
          data.data_produits=response.data.produits;
        } 
        else {
          Swal.fire({
              icon: 'error',
              title: 'produits...',
              text: response.data.message,
            });
        }
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'produits...',
                text: error,
              });
      }
      finally{
        data.loading=false;
      }
      
    };
    
  
    const addProduit = async () => {
      store.clearErrors();
      try {
        const response = await axios.post('/api/produits_fini/store', data.produit);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'produits...',
            text: "produits '"+ response.data.produit+"' added",
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'produits...',
            text: response.data.message,
          });
        }
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const deleteProduit = async (produit) => {
      try {
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the product '${produit.libelle}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete("/api/produits_fini/destroy/"+produit.id);
                if(response.data.success){
                  fetch_data();
                  Swal.fire({
                    icon: 'success',
                    title: 'produits...',
                    text: response.data.message,
                  });
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'produits...',
                    text: response.data.message,
                  });
                }
            }
          });
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }
  
    const updateProduit = async () => {
      try {
        const response = await axios.put("/api/produits_fini/update/"+data.produit.id,data.produit);
        if(response.data.success){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'produits...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'produits...',
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
        fetch_data_unites();
        fetch_data_type_produits();
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