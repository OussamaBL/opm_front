<!-- eslint-disable-next-line vue/multi-word-component-names -->
<template>

<div class="container-xxl">
      <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner py-4">
          <!-- Login -->
          <div class="card">
            <div class="card-body">
              <!-- Logo -->
              <div class="app-brand justify-content-center mb-4 mt-2">
                <a href="index.html" class="app-brand-link gap-2">
                  <span class="app-brand-logo demo">
                    <img :src="`/images/logo.png`" width="100%">
                  </span>
                  <!-- <span class="app-brand-text demo text-body fw-bold ms-1">OPM</span> -->
                </a>
              </div>
              <!-- /Logo -->
              <h4 class="mb-1 pt-2">Welcome to Activ Digital ! 👋</h4>
              <p class="mb-4">Please sign-in to your account</p>
              
              <ul class="list-group my-2" v-for="(errorArray, index) in store.getErrors" :key="index">
                <li class="list-group-item bg-danger text-white mb-1" v-for="(error, index) in errorArray" :key="index">
                    {{error}}
                </li>
              </ul>

              <!-- <form id="formAuthentication" class="mb-3" action="index.html" method="GET"> -->
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    name="email"
                    v-model="data.user.email"
                    placeholder="Enter your email"
                    autofocus />
                  <span style="color: red;" v-text="data.invalid_email"></span>
                </div>
                <div class="mb-3 form-password-toggle">
                  <div class="d-flex justify-content-between">
                    <label class="form-label" for="password">Password</label>
                    <router-link to="/forget_password">Forget password ?</router-link>
                  </div>
                  <div class="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      v-model="data.user.password"
                      name="password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password" style="width: 100%;" />
                      <span style="color: red;" v-text="data.invalid_password"></span>
                  </div>
                </div>
              
                <div class="mb-3">
                  <button @click="userAuth" class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div>
              <!-- </form> -->

              <!-- <p class="text-center">
                <span>New on our platform?</span>
                <a href="auth-register-basic.html">
                  <span>Create an account</span>
                </a>
              </p> -->
             
            </div>
          </div>
          <!-- /Register -->
        </div>
      </div>
    </div>


</template>

<script setup>
    import { reactive } from "vue";
    import Swal from 'sweetalert2';
    import axios from 'axios';
    import router from '@/router/index.js';
    import { useAuthStore } from '@/stores/useAuthStore.js';

    const store = useAuthStore();
    
    const data = reactive({
      user: {
        email: '',
        password: ''
      },
      invalid_email:'',
      invalid_password:'',
      emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      passwordPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    });
    
    const validateLogin = () => {
      let etat=true;
      if (!data.emailPattern.test(data.user.email)) {
        data.invalid_email='Invalid Email';
        etat =false;
      } 
      if (!data.passwordPattern.test(data.user.password)) {
        data.invalid_password='Invalid Password';
        etat= false;
      } 
      return etat;
    };

    const userAuth = async () => {
      store.clearErrors();
      data.invalid_email="";
      data.invalid_password="";
      if(!validateLogin()) return;
      try {
        const response = await axios.post('/api/login', data.user);
        if(response.data.success){
          let user_auth=response.data.user;
          store.storeUser(user_auth);
          Swal.fire({
            icon: 'success',
            title: 'Login success',
            text: "Welcome to Activ Digital "+ response.data.user.data.name,
          });
          router.push('/UserDashboard');
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message,
          });
        }
      } catch (error) {
        store.setErrors(error.response.data.errors);
      }
    }

</script>

<style>

</style>