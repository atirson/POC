import * as singleSpa from "single-spa";
import axios from "axios";

async function spaHandler(brokerId) {
  // Broker id identificaria qual microfrontend seria carregado
  console.log("brokerId", brokerId);
  try {
    const response = await axios.get(
      "https://610999ccd71b6700176399f3.mockapi.io/api/v1/showNewVersion"
    );

    const show = await response.data.show;

    if (show) {
      singleSpa.registerApplication(
        "app1",
        () => import("./app1/app1.js"),
        (location) => location.hash.startsWith("#/default")
      );
    } else {
      singleSpa.registerApplication(
        "app2",
        () => import("./app2/app2.js"),
        (location) => location.hash.startsWith("#/default")
      );
    }
    console.log("registered", window.location);
  } catch (error) {
    console.log('Error', error);
  } finally {
    singleSpa.start();
    window.location.hash = "#/default";
  }
}

singleSpa.registerApplication(
  "login",
  () => import("./login/login.js"),
  (location) => location.hash.startsWith("#/login")
);

window.addEventListener("login", (event) => {
  console.log("Event", event);
  localStorage.setItem("brokerId", event.detail.brokerId);
  spaHandler(event.detail.brokerId);
});

if (localStorage.getItem("brokerId")) {
  const brokerId = localStorage.getItem("brokerId");
  spaHandler(brokerId);
}

singleSpa.start();
