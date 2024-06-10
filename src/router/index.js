import { createRouter, createWebHashHistory } from "vue-router";
import AppDashboard from "@/AppDashboard.vue";
import UserLogin from "@/components/Auth/UserLogin.vue";
import Forget_password from "@/components/Auth/Forget_password.vue";
import UserDashboard from "@/components/Dashboard/UserDashboard.vue";
import UserProfile from "@/components/Dashboard/UserProfile.vue";
import GsAffaires from "@/components/Gs_production/GsAffaires.vue";
import Type_produits from "@/components/Gs_production/Type_produits.vue";
import Gs_unites from "@/components/Gs_production/GsUnites.vue";
import GsPersonnel from "@/components/Gs_personnel/GsPersonnel.vue";
import GsAvances from "@/components/Gs_personnel/GsAvances.vue";
import GsConges from "@/components/Gs_personnel/GsConges.vue";
import GsAbsences from "@/components/Gs_personnel/GsAbsences.vue";
import Type_personnel from "@/components/Gs_personnel/Type_personnel.vue";
import Type_clients from "@/components/Gs_production/Type_clients.vue";
import GsClients from "@/components/Gs_production/GsClients.vue";

import Pointage_ProduitsFini from "@/components/Gs_production/Pointage/Pointage_produits_fini.vue";

// import { useAuthStore } from '@/stores/useAuthStore.js';


    // function checkIfLogged() {
    //     const store = useAuthStore();
    //     if (!store.getUser) return false;
    //     else return true;
    // }

    

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "UserLogin",
            component: UserLogin,
        },
        {
            path: "/Forget_password",
            name: "Forget_password",
            component: Forget_password,
        },
        {
            path: "/AppDashboard",
            name: "AppDashboard",
            component: AppDashboard,
            
            children: [
              {
                path: '/UserDashboard',
                name: 'UserDashboard',
                component:  UserDashboard,
              },
              {
                path: '/UserProfile',
                name: 'UserProfile',
                component:  UserProfile,
              },
              {
                path: '/GsAffaires',
                name: 'GsAffaires',
                component:  GsAffaires,
              },
              {
                path: '/Type_produits',
                name: 'Type_produits',
                component:  Type_produits,
              },
              {
                path: '/Gs_unites',
                name: 'Gs_unites',
                component:  Gs_unites,
              },
              {
                path: '/GsPersonnels',
                name: 'GsPersonnel',
                component:  GsPersonnel,
              },
              {
                path: '/GsAvances',
                name: 'GsAvances',
                component:  GsAvances,
              },
              {
                path: '/GsConges',
                name: 'GsConges',
                component:  GsConges,
              },
              {
                path: '/GsAbsences',
                name: 'GsAbsences',
                component:  GsAbsences,
              },
              {
                path: '/Type_personnel',
                name: 'Type_personnel',
                component:  Type_personnel,
              },
              {
                path: '/Type_clients',
                name: 'Type_clients',
                component:  Type_clients,
              },
              {
                path: '/GsClients',
                name: 'GsClients',
                component:  GsClients,
              },
              {
                path: '/Pointage/Produits_fini',
                name: 'Pointage_ProduitsFini',
                component:  Pointage_ProduitsFini,
              },
              
            ],
          },
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'NotFound',
        //     component: NotFound,
        // },
        
        
    ],
});

export default router;