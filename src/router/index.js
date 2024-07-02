import { createRouter, createWebHashHistory } from "vue-router";
import AppDashboard from "@/AppDashboard.vue";
import UserLogin from "@/components/Auth/UserLogin.vue";
import Forget_password from "@/components/Auth/Forget_password.vue";
import UserDashboard from "@/components/Dashboard/UserDashboard.vue";
import UserProfile from "@/components/Dashboard/UserProfile.vue";
import GsAffaires from "@/components/Gs_production/GsAffaires.vue";
import GsProduits_fini from "@/components/Gs_production/GsProduits_fini.vue";
import Type_produits from "@/components/Gs_production/Type_produits.vue";
import GsFournisseurs from "@/components/Gs_production/GsFournisseurs.vue";
import GsFournitures from "@/components/Gs_production/GsFournitures.vue";
import GsLocations from "@/components/Gs_production/GsLocations.vue";
import GsMachines from "@/components/Gs_production/GsMachines.vue";
import GsSous_traitance from "@/components/Gs_production/GsSous_traitance.vue";

import Gs_unites from "@/components/Gs_production/GsUnites.vue";

import GsPersonnel from "@/components/Gs_personnel/GsPersonnel.vue";
import GsAvances from "@/components/Gs_personnel/GsAvances.vue";
import GsConges from "@/components/Gs_personnel/GsConges.vue";
import GsAbsences from "@/components/Gs_personnel/GsAbsences.vue";
import Type_personnel from "@/components/Gs_personnel/Type_personnel.vue";

import Type_clients from "@/components/Gs_production/Type_clients.vue";
import GsClients from "@/components/Gs_production/GsClients.vue";

import GsEtude_Transport from "@/components/GsTransports/GsEtude_Transport.vue";
import GsSuivi_Transport from "@/components/GsTransports/GsSuivi_Transport.vue";

import Pointage_ProduitsFini from "@/components/Gs_production/Pointage/Pointage_produits_fini.vue";
import Pointage_Fournitures from "@/components/Gs_production/Pointage/Pointage_fournitures.vue";
import Pointage_Locations from "@/components/Gs_production/Pointage/Pointage_locations.vue";
import Pointage_Machines from "@/components/Gs_production/Pointage/Pointage_machines.vue";
import Pointage_Personnels from "@/components/Gs_production/Pointage/Pointage_personnels.vue";
import Pointage_Sous_traitances from "@/components/Gs_production/Pointage/Pointage_sous_traitances.vue";
import Pointage_Transports from "@/components/Gs_production/Pointage/Pointage_transports.vue";

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
                path: '/GsProduits_fini',
                name: 'GsProduits_fini',
                component:  GsProduits_fini,
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
                path: '/GsFournisseurs',
                name: 'GsFournisseurs',
                component:  GsFournisseurs,
              },
              {
                path: '/GsFournitures',
                name: 'GsFournitures',
                component:  GsFournitures,
              },
              {
                path: '/GsMachines',
                name: 'GsMachines',
                component:  GsMachines,
              },
              {
                path: '/GsLocations',
                name: 'GsLocations',
                component:  GsLocations,
              },
              {
                path: '/GsSous_traitance',
                name: 'GsSous_traitance',
                component:  GsSous_traitance,
              },
              

              // Pointage
              {
                path: '/Pointage/Produits_fini',
                name: 'Pointage_ProduitsFini',
                component:  Pointage_ProduitsFini,
              },
              {
                path: '/Pointage/Fournitures',
                name: 'Pointage_Fournitures',
                component: Pointage_Fournitures,
              },
              {
                path: '/Pointage/Locations',
                name: 'Pointage_Locations',
                component:  Pointage_Locations,
              },
              {
                path: '/Pointage/Machines',
                name: 'Pointage_Machines',
                component:  Pointage_Machines,
              },
              {
                path: '/Pointage/Personnels',
                name: 'Pointage_Personnels',
                component:  Pointage_Personnels,
              },
              {
                path: '/Pointage/Sous_Traitances',
                name: 'Pointage_Sous_traitances',
                component:  Pointage_Sous_traitances,
              },
              {
                path: '/Pointage/Transports',
                name: 'Pointage_Transports',
                component:  Pointage_Transports,
              },

              // GsTransport
              {
                path: '/GsEtude_Transport',
                name: 'GsEtude_Transport',
                component:  GsEtude_Transport,
              },
              {
                path: '/GsSuivi_Transport',
                name: 'GsSuivi_Transport',
                component:  GsSuivi_Transport,
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