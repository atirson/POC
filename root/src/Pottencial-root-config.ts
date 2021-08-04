import { registerApplication, start, } from "single-spa";




async function spaHandler(detail, fromLocalStorage = false) {
  try {

    const show = detail.show;
    if (show) {
      registerApplication(
        "app1",
        () => import("../../main"),
        (location) => location.pathname === "/portal"
      );
    } else {
      registerApplication(
        "app2",
        () => import("../../main_legado"),
        (location) => location.pathname === "/portal"
      );
    }
  } catch (error) {
    console.log('Error', error);
  } finally {
    start();
    if (!fromLocalStorage) window.location.pathname = "/portal";
  }
}


registerApplication({
  name: "@Pottencial/Login",
  app: () =>
    System.import("@Pottencial/Login"),
  activeWhen: (location) => location.pathname === "/",
});

window.addEventListener("login", (event) => {
  console.log("Event", event);
  localStorage.setItem("DETAILS", JSON.stringify((<any>event).detail));
  spaHandler((<any>event).detail);
});

if (localStorage.getItem("DETAILS")) {
  const details = localStorage.getItem("DETAILS");
  spaHandler(JSON.parse(details), true);
}

start({
  urlRerouteOnly: true,
});
