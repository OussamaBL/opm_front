import { createRouter, createWebHashHistory } from "vue-router";
import AppDashboard from "@/AppDashboard.vue";
import UserLogin from "@/components/Auth/UserLogin.vue";
import Forget_password from "@/components/Auth/Forget_password.vue";
import UserDashboard from "@/components/Dashboard/UserDashboard.vue";
import UserProfile from "@/components/Dashboard/UserProfile.vue";
import GsAffaires from "@/components/Gs_production/GsAffaires.vue";
import Type_produits from "@/components/Gs_production/Type_produits.vue";
import Gs_unites from "@/components/Gs_production/GsUnites.vue";
import GsDepot from "@/components/Gs_stock/GsDepot.vue";
import GsProvenance from "@/components/Gs_stock/GsProvenance.vue";
import GsDestination from "@/components/Gs_stock/GsDestination.vue";
import GsDocument from "@/components/Gs_stock/GsDocument.vue";
import GsTransfert from "@/components/Gs_stock/GsTransfert.vue";
import GsInventaire from "@/components/Gs_stock/GsInventaire.vue";
import MouvementStock from "@/components/Gs_stock/MouvementStocks.vue";


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
                path: '/Depots',
                name: 'Depots',
                component:  GsDepot,
              },
              {
                path: '/Documents',
                name: 'Documents',
                component:  GsDocument,
              },
              {
                path: '/Provenances',
                name: 'Provenances',
                component:  GsProvenance,
              },
              {
                path: '/Destinations',
                name: 'Destinations',
                component:  GsDestination,
              },
              {
                path: '/MouvementStocks',
                name: 'MouvementStocks',
                component:  MouvementStock,
              },
              {
                path: '/Transferts',
                name: 'Transferts',
                component:  GsTransfert,
              },
              {
                path: '/Inventaires',
                name: 'Inventaires',
                component:  GsInventaire,
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