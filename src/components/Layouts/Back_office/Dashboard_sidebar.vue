<template>
  <!-- Menu -->
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <h3 style="margin-top: 14px;">
        <img src="/images/logo.png" style="width: 107px;height: 83px;" alt="">
       </h3>
      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
        <i class="ti menu-toggle-icon d-none d-xl-block ti-sm align-middle"></i>
        <i class="ti ti-x d-block d-xl-none ti-sm align-middle"></i>
      </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1" style="overflow-y: scroll;overflow-x: hidden;">
      <li class="menu-item">
        <router-link to="/UserDashboard" class="menu-link">
          <i class="menu-icon tf-icons fa fa-tachometer" aria-hidden="true"></i>
          <div data-i18n="Dashboard">Dashboard</div>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link to="/UserDashboard" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Gestion des utilisateurs">Gestion des utilisateurs</div>
        </router-link>
      </li>

      <!-- Gestion de production -->
      <li class="menu-item has-sub">
        <a href="javascript:void(0);" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons fa fa-cogs" aria-hidden="true"></i>
          <div data-i18n="Gestion de production">Gestion des productions</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item">
            <router-link to="/ProductionDashboard" class="menu-link">
                <div data-i18n="Tableau de bord">Tableau de bord</div>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/GsAffaires" class="menu-link">
                <div data-i18n="Les Affaires">Les Affaires</div>
            </router-link>
          </li>

          <!-- Suivi / Pointage -->
          <li class="menu-item has-sub">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <div data-i18n="Suivi / Pointage">Suivi / Pointage</div>
            </a>
            <ul class="menu-sub">
                <li class="menu-item">
                <router-link to="/Pointage/Produits_fini" class="menu-link">
                  <div data-i18n="Les Produits finis">Les Produits finis</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/Pointage/Fournitures" class="menu-link">
                  <div data-i18n="Les Fournitures">Les Fournitures</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/Pointage/Personnels" class="menu-link">
                  <div data-i18n="Pointage de personnel">Pointage de personnel</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/Pointage/Machines" class="menu-link">
                  <div data-i18n="Les Machines">Les Machines</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/Pointage/Sous_Traitances" class="menu-link">
                  <div data-i18n="Sous-traitance">Sous-traitance</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/Pointage/Transports" class="menu-link">
                  <div data-i18n="Les Transports">Les Transports</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/Pointage/Locations" class="menu-link">
                  <div data-i18n="Les locations">Les locations</div>
                </router-link>
              </li>
              
              <!-- Nested submenu example -->
              <!-- <li class="menu-item has-sub">
                <a href="javascript:void(0);" class="menu-link menu-toggle">
                  <div data-i18n="Nested Submenu">Nested Submenu</div>
                </a>
                <ul class="menu-sub">
                  <li class="menu-item">
                    <router-link to="/NestedLink1" class="menu-link">
                      <div data-i18n="Nested Link 1">Nested Link 1</div>
                    </router-link>
                  </li>
                  <li class="menu-item">
                    <router-link to="/NestedLink2" class="menu-link">
                      <div data-i18n="Nested Link 2">Nested Link 2</div>
                    </router-link>
                  </li>
                </ul>
              </li> -->
            </ul>
          </li>

          <!-- Les Analyses -->
          <li class="menu-item has-sub">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <div data-i18n="Les Analyses">Les Analyses</div>
            </a>
            <ul class="menu-sub">
                <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Récapitulatif BDP">Récapitulatif BDP</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Rendement">Rendement</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Consommation des constituants">Consommation des constituants</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Depenses">Depenses</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Recettes">Recettes</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Marge brute">Marge brute</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Résultat financier">Résultat financier</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Dépenses réelles par catégories">Dépenses réelles par catégories</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Planning des produits finis">Planning des produits finis</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Planning des contituant">Planning des contituant</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Rendement journalier">Rendement journalier</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Rendement total">Rendement total</div>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/ProductionDashboard" class="menu-link">
                  <div data-i18n="Consommation imprévue">Consommation imprévue</div>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>

      <!-- Gestion de personnel -->
      <li class="menu-item has-sub">
        <a href="javascript:void(0);" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons fa fa-cogs" aria-hidden="true"></i>
          <div data-i18n="Gestion de personnel">Gestion du personnel</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item">
            <router-link to="/PersonnelDashboard" class="menu-link">
                <div data-i18n="Tableau de bord">Tableau de bord</div>
            </router-link>
          </li>
          
          <li class="menu-item">
            <router-link to="/Type_personnel" class="menu-link">
                <div data-i18n="Les Types de Personnel">Les Types de Personnel</div>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/GsPersonnels" class="menu-link">
                <div data-i18n="Les Personnels">Les Personnels</div>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/GsAvances" class="menu-link">
                <div data-i18n="Les Avances">Les Avances</div>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/GsConges" class="menu-link">
                <div data-i18n="Les Congés">Les Congés</div>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/GsAbsences" class="menu-link">
                <div data-i18n="Les Absences">Les Absences</div>
            </router-link>
          </li>

        </ul>
      </li>

      <!-- Gestion de Transports -->
      <li class="menu-item has-sub">
        <a href="javascript:void(0);" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons fa fa-cogs" aria-hidden="true"></i>
          <div data-i18n="Gestion de personnel">Gestion du personnel</div>
        </a>
        <ul class="menu-sub">
          
          <li class="menu-item">
            <router-link to="/GsEtude_Transport" class="menu-link">
                <div data-i18n="Les Etudes transports">Les Etudes transports</div>
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/GsSuivi_Transport" class="menu-link">
                <div data-i18n="Les Suivis transports">Les Suivis transports</div>
            </router-link>
          </li>

        </ul>
      </li>

      <li class="menu-item">
        <router-link to="/Gs_unites" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Les Unités">Les Unités</div>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link to="/Type_produits" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Les types des produits">Les types des produits</div>
        </router-link>
      </li>
      
      <li class="menu-item">
        <router-link to="/Type_produits" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Listes des produits fini">Listes des produits fini</div>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link to="/Type_clients" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Les types de client">Les types de client</div>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link to="/GsClients" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Listes des clients">Listes des clients</div>
        </router-link>
      </li>

      <li class="menu-item">
        <router-link to="/GsFournisseurs" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Listes des Fournisseurs">Listes des Fournisseurs</div>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link to="/GsFournitures" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Listes des Fournitures">Listes des Fournitures</div>
        </router-link>
      </li>

      <li class="menu-item">
        <router-link to="/GsClients" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Listes des clients">Listes des clients</div>
        </router-link>
      </li>

      <li class="menu-item">
        <router-link to="/GsFournitures" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Listes des Locations">Listes des Locations</div>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link to="/GsFournitures" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Listes des Machines">Listes des Machines</div>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link to="/GsSous_traitance" class="menu-link">
          <i class="menu-icon tf-icons fa fa-users" aria-hidden="true"></i>
          <div data-i18n="Listes des Sous-traitances">Listes des Sous-traitances</div>
        </router-link>
      </li>
      
    </ul>
  </aside>
  <!-- / Menu -->
</template>
<script>
export default {
  mounted() {
    this.initMenuToggle();
  },
  methods: {
    initMenuToggle() {
      const menuItems = document.querySelectorAll('.menu-item.has-sub > .menu-link.menu-toggle');
      menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', function () {
          const parentItem = menuItem.parentElement;
          const isOpen = parentItem.classList.contains('open');
          if (isOpen) {
            parentItem.classList.remove('open');
          } else {
            parentItem.classList.add('open');
          }
        });
      });
    }
  }
};
</script>
<style scoped>
.bg-menu-theme .menu-inner .menu-item.open > .menu-link.menu-toggle, 
.layout-menu-hover.layout-menu-collapsed .bg-menu-theme .menu-inner .menu-item.open > .menu-link.menu-toggle, 
.bg-menu-theme .menu-inner .menu-item.active > .menu-link.menu-toggle, 
.layout-menu-hover.layout-menu-collapsed .bg-menu-theme .menu-inner .menu-item.active > .menu-link.menu-toggle {
  background-color: #bf7422;
}
.menu-vertical .menu-inner {
  background-color: #051922;
}
.menu-vertical .menu-inner > .menu-item .menu-link {
  color: white;
}
html:not(.layout-menu-collapsed) .bg-menu-theme .menu-inner .menu-item:not(.active) > .menu-link:hover, 
.layout-menu-hover.layout-menu-collapsed .bg-menu-theme .menu-inner .menu-item:not(.active) > .menu-link:hover {
  background: #bf7422;
}
.menu-icon {
  font-size: 18px;
}
.menu-sub {
  display: none;
}
.menu-item.has-sub.open > .menu-sub {
  display: block;
}
</style>
