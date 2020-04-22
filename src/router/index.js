import Vue from "vue";
import VueRouter from "vue-router";
import EntityTool from "../views/EntityTool.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "entity-tool",
    component: EntityTool,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
