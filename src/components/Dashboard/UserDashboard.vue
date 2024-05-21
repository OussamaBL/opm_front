<template>
  <!-- Content -->
<!-- Edit User Modal -->
<div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                <div class="modal-content p-3 p-md-5">
                  <div class="modal-body">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="text-center mb-4">
                      <h3 class="mb-2">User</h3>
                    </div>
                    <form id="editUserForm" class="row g-3" onsubmit="return false">
                      <div class="col-12 col-md-6" style="margin: 0 auto;">
                        <label class="form-label" for="modalEditUserFirstName">Name</label>
                        <input type="text" id="modalEditUserFirstName" v-model="data.user.name" class="form-control" placeholder="Enter the name of user" />
                      </div>
                      <div class="col-12 col-md-6" style="margin: 0 auto;">
                        <label class="form-label" for="modalEditUserEmail">Email</label>
                        <input type="email" id="modalEditUserEmail" v-model="data.user.email" class="form-control" placeholder="Enter the email of user" />
                      </div>
                      <div v-if="data.action=='add'" class="col-12 col-md-6" style="margin: 0 auto;">
                        <label class="form-label" for="modalEditUserPassword">Password</label>
                        <input type="password" id="modalEditUserPassword" v-model="data.user.password" class="form-control" placeholder="Password" readonly/>
                      </div>
                      <div class="col-12 text-center">
                        <button v-if="data.action=='add'" type="submit" @click="addUser()" class="btn btn-primary me-sm-3 me-1">Submit</button>
                        <button v-if="data.action=='edit'" type="submit" @click="updateUser()" class="btn btn-primary me-sm-3 me-1">Submit</button>
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
            <h4 class="py-3 mb-2"><span class="text-muted fw-light"></span> Gestion des utilisateurs</h4>
            <div class="app-ecommerce-category">
              <!-- Category List Table -->
              <div class="card">
                <button class="btn btn-primary" style="width: 143px;margin: 12px;" data-bs-toggle="modal" @click="open_modal_addUser" data-bs-target="#editUser">Ajouter utilisateur</button>
                <div class="table-responsive text-nowrap">
                 <img v-if="data.loading" src="/images/loading.gif" style="width: 40px;margin: 20px auto;display: block;" alt="Loading">
                <table v-if="!$data.loading" class="table">
                  <thead>
                    <tr style="background-color: #051922;">
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th></th>
                    </tr>
                  </thead>
                 
                  <tbody class="table-border-bottom-0">
                    
                    <tr v-for="user in data.data_users" :key="user.id">
                      <td>
                        <img :src="`/images/avatars/${user.avatar}`" style="width: 100px;height: 85px;" alt="">
                      </td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>
                        <div class="dropdown">
                          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" data-bs-toggle="modal" @click="data.action='edit';data.user.name=user.name;data.user.id=user.id;data.user.email=user.email;" data-bs-target="#editUser" href="javascript:void(0);">
                              <i class="ti ti-pencil me-1"></i> Edit
                            </a>
                            <a class="dropdown-item" @click="deleteUser(user)" href="javascript:void(0);"
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
    data_users: [],
    user: {
      id: '',
      avatar: '',
      name: '',
      email: '',
      password: '',
    },
    loading:true,
    action:'',
  });

  const generate_password = (length = 12) =>{
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var password = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      data.user.password=password;
  }

  const open_modal_addUser = () =>{
    data.action='add';
    data.user.name='';
    data.user.email='';
    generate_password();
  }

  const fetch_data = async () => {
    data.data_categories=[];
    data.loading = true;
    try {
      const response = await axios.get('/api/category/index');
      if(response.data.exist){
        data.data_categories=response.data.categories;
      } 
      else {
        Swal.fire({
            icon: 'error',
            title: 'Categories...',
            text: response.data.message,
          });
      }
    } catch (error) {
        Swal.fire({
              icon: 'error',
              title: 'Categories...',
              text: error,
            });
    }
    finally{
      data.loading=false;
    }
    
  };
  

  const addUser = async () => {
    store.clearErrors();
    try {
      const response = await axios.post('/api/user/store', data.user);
      if(response.data.success){
        fetch_data();
        Swal.fire({
          icon: 'success',
          title: 'User added',
          text: "User '"+ response.data.user+"' added",
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'User...',
          text: response.data.message,
        });
      }
    } catch (error) {
      store.setErrors(error.response.data.errors);
    }
  }

  const deleteUser = async (user) => {
    try {
        Swal.fire({
          title: 'Confirm Delete',
          text: `Are you sure you want to delete the user '${user.name}'?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
              const response = await axios.delete("/api/user/destroy/"+user.id);
              if(response.data.success){
                fetch_data();
                Swal.fire({
                  icon: 'success',
                  title: 'Users...',
                  text: response.data.message,
                });
              }
              else{
                Swal.fire({
                  icon: 'error',
                  title: 'Users...',
                  text: response.data.message,
                });
              }
          }
        });
    } catch (error) {
      store.setErrors(error.response.data.errors);
    }
  }

  const updateUser = async () => {
    try {
      const response = await axios.put("/api/user/update/"+data.user.id,{'name':data.user.name,'email':data.user.email});
      if(response.data.success){
        fetch_data();
        Swal.fire({
          icon: 'success',
          title: 'User...',
          text: response.data.message,
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'User...',
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