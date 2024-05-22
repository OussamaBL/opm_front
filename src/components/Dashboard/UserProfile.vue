
<template>
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="py-3 mb-2"><span class="text-muted fw-light"></span> Gestion des utilisateurs</h4>
              <div class="app-ecommerce-category">
                <div class="card mb-4">
                    <h5 class="card-header">Profile Details</h5>
                    <!-- Account -->
                    <div class="card-body">
                      <div class="d-flex align-items-start align-items-sm-center gap-4">
                        <img v-if="data.image_action=='edit'"
                          :src="`/images/avatars/${store.getUser ? store.getAvatar : ''}`"
                          alt="user-avatar"
                          class="d-block w-px-100 h-px-100 rounded"
                          id="uploadedAvatar" />
                        <img v-if="data.image_action=='upload'"
                          :src="`${data.upload_image}`"
                          alt="user-avatar"
                          class="d-block w-px-100 h-px-100 rounded"
                          id="uploadedAvatar" />

                          <div class="button-wrapper">
                          <label for="upload" class="btn btn-primary me-2 mb-3" tabindex="0">
                            <span class="d-none d-sm-block">Upload new photo</span>
                            <i class="ti ti-upload d-block d-sm-none"></i>
                            <input
                              type="file"
                              @change="handleFileChange"
                              id="upload"
                              class="account-file-input"
                              hidden
                              accept="image/png, image/jpeg" />
                          </label>
                          <button type="button" class="btn btn-label-secondary account-image-reset mb-3">
                            <i class="ti ti-refresh-dot d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Reset</span>
                          </button>

                          <div class="text-muted">Allowed JPG, GIF or PNG. Max size of 800K</div>
                        </div>
                      </div>
                    </div>
                    <hr class="my-0" />
                    <div class="card-body">
                      <form id="formAccountSettings" method="GET" onsubmit="return false">
                        <div class="row">
                          <div class="mb-3 col-md-6">
                            <label for="firstName" class="form-label">Name</label>
                            <input v-if="store.getUser"
                              class="form-control"
                              type="text"
                              id="firstName"
                              name="firstName"
                              v-model="store.getName"
                              autofocus required />
                          </div>
                          <div class="mb-3 col-md-6">
                            <label for="email" class="form-label">E-mail</label>
                            <input v-if="store.getUser"
                              class="form-control"
                              type="text"
                              id="email"
                              name="email"
                              v-model="store.getEmail" required />
                          </div>
                        </div>
                        <div class="mt-2">
                          <button type="button" @click="updateUser" class="btn btn-primary me-2">Save changes</button>
                          <!-- <button type="reset" class="btn btn-label-secondary" >Discard</button> -->
                        </div>
                      </form>
                    </div>
                    <!-- /Account -->
                  </div>
                
              </div>
    </div>
            <!-- / Content -->
  </template>
  <script setup>
  
    import { reactive,onMounted  } from "vue";
    import axios from 'axios';
    import Swal from 'sweetalert2';
    // // import router from '@/router';
    import { useAuthStore } from '@/stores/useAuthStore.js';
  
    const store = useAuthStore();
    
    const handleFileChange = (event) => {
        data.image_action="upload";
        const file = event.target.files[0];
        if (file) {
          data.user.image = file;
          const reader = new FileReader();
          reader.onload = (e) => {
            data.upload_image = e.target.result;
          };
          reader.readAsDataURL(file);
        }
    };
    const data = reactive({
      upload_image:'',
      image_action:'edit',
      // data_users: [],
      user: {
        id: '',
        avatar: '',
        name: '',
        email: '',
      },
      // loading:true,
      // action:'',
    });
  
    const updateUser = async () => {
      try {
        const formData = new FormData();
        formData.append('id', store.getID);
        formData.append('name', store.getName);
        formData.append('email', store.getEmail);
        formData.append('avatar', store.getAvatar);
        const response = await axios.post('/api/user/update', formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if(response.data.success){
          // fetch_data();
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
    onMounted(() => {
      // alert(store.getID);
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