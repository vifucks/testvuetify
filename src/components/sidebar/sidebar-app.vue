<template>
  <nav id="sidebar" class="sidebar-wrapper">
    <div class="sidebar-content">
      <div class="sidebar-brand">
        <router-link to="/">Belotouriha</router-link>
        <div id="close-sidebar">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="sidebar-header">
        <div class="user-pic">
          <img
            class="img-responsive img-rounded"
            src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
            alt="User picture"
          />
        </div>
        <div class="user-info">
          <span class="user-name"><strong>root</strong> </span>
          <span class="user-role">Administrator</span>
          <span class="user-status">
            <i class="fa fa-circle"></i>
            <span>Online</span>
          </span>
        </div>
      </div>
      <!-- sidebar-header  -->
      <!-- sidebar-search  -->
      <div class="sidebar-menu">
        <ul>
          <li class="header-menu">
            <span>Навигация</span>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="fa fa-bus"></i>
              <span>Трансфер</span>
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li>
                  <router-link to="/transfers">Все трансферы</router-link>
                </li>
                <li>
                  <router-link
                    tag="a"
                    class="button"
                    :to="{
                      name: 'create-transfer',
                      params: { id: '12', date: '42' },
                    }"
                    >Создать трансфер<span
                      class="badge badge-pill badge-success"
                      >+</span
                    >
                  </router-link>
                </li>
                <!--                <li>-->
                <!--                  <a href="#">Удалить трансфер</a>-->
                <!--                </li>-->
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="fa fa-comment"></i>
              <span>Комментарии</span>
              <!--              <span class="badge badge-pill badge-danger">3</span>-->
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li>
                  <router-link to="/allcomments" tag="a"
                    >Все комментарии
                  </router-link>
                </li>
                <!--                <li>-->
                <!--                  <a href="#">Новые комментарии-->
                <!--                    <span class="badge badge-pill badge-warning">New</span>-->
                <!--                  </a>-->
                <!--                </li>-->
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="far fa-file-signature"></i>
              <span>Заявки по трансферу</span>
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li>
                  <router-link to="/allrequests" tag="a">Все заявки</router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="fa fa-hotel"></i>
              <span>Заявки по отелям</span>
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li>
                  <router-link to="/booking" tag="a">Все заявки</router-link>
                </li>
              </ul>
            </div>
          </li>
<!--                    <li class="sidebar-dropdown">-->
<!--                      <a href="#">-->
<!--                        <i class="fa fa-globe"></i>-->
<!--                        <span>Maps</span>-->
<!--                      </a>-->
<!--                      <div class="sidebar-submenu">-->
<!--                        <ul>-->
<!--                          <li>-->
<!--                            <a href="#">Google maps</a>-->
<!--                          </li>-->
<!--                          <li>-->
<!--                            <a href="#">Open street map</a>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
                    <li class="header-menu">
                      <span>Дополнительно</span>
                    </li>
                    <li>
                      <router-link to="/changeprices" tag="a">
                        <i class="fa fa-book"></i>
                        <span>Изменение цен</span>
<!--                        <span class="badge badge-pill badge-primary">=</span>-->
                      </router-link>
                    </li>
<!--                    <li>-->
<!--                      <a href="#">-->
<!--                        <i class="fa fa-calendar"></i>-->
<!--                        <span>Calendar</span>-->
<!--                      </a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <a href="#">-->
<!--                        <i class="fa fa-folder"></i>-->
<!--                        <span>Examples</span>-->
<!--                      </a>-->
<!--                    </li>-->
        </ul>
      </div>
      <!-- sidebar-menu  -->
    </div>
    <!-- sidebar-content  -->
    <footer-sidebar-app></footer-sidebar-app>
  </nav>
</template>

<script>
import FooterSidebarApp from "../footer/footer-sidebar-app";
import $ from "jquery";
export default {
  components: {
    FooterSidebarApp,
  },
  name: "sidebar-app",
  mounted() {
    $(".sidebar-dropdown > a").click(function (e) {
      e.preventDefault();
      $(".sidebar-submenu").slideUp(200);
      if ($(this).parent().hasClass("active")) {
        $(".sidebar-dropdown").removeClass("active");
        $(this).parent().removeClass("active");
      } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this).next(".sidebar-submenu").slideDown(200);
        $(this).parent().addClass("active");
      }
    });

    $("#close-sidebar").click(function (e) {
      e.preventDefault();
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function (e) {
      e.preventDefault();
      $(".page-wrapper").addClass("toggled");
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
