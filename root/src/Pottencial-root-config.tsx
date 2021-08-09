import { getAppNames, registerApplication, start, triggerAppChange, unregisterApplication } from 'single-spa';
var intervalId: NodeJS.Timer;

async function optimizeHandler(){
 try {
 
  intervalId = setInterval(async () => {
    if ((window as any ).dataLayer ) {
      await (window as any ).dataLayer.push({ event: "optimize.activate" });
    }

    if ((window as any ).google_optimize !== undefined) {
      const variant = (window as any ).google_optimize.get('TPunGV65RDK9YP29npw4ow');
      localStorage.setItem('layout:variant',variant);
      
      clearInterval(intervalId); 
      spaHandler(variant);
     
    }
  }, 100);
} catch (error) {
  console.log('Error', error);
} finally {

}
}

async function spaHandler(
 variant:any,
  fromLocalStorage: boolean = false
) {
  try {
    if(variant=="1"){
      console.log("Layout Novo");
      registerApplication(
        {
          name: 'app1',
          app: () => import('../../main/pottencial-broker-app'),
          activeWhen:'/portal',
        });
    }
    else
    {
      console.log("Layout legado");
      registerApplication({
        name: 'app2',
        app: () => import('../../main_legado'),
        activeWhen:'/portal',
      });      
    }
  } catch (error) {
    console.log('Error', error);
  } finally {
    start();
    if (!fromLocalStorage) window.location.pathname = '/portal';
  }
}

registerApplication({
  name: '@Pottencial/Login',
  app: () => System.import('@Pottencial/Login'),
  activeWhen: (location) => location.pathname === '/',
});

window.addEventListener('refresh', (event: CustomEvent) => {
  console.log('Event', event);
  localStorage.setItem('DETAILS', JSON.stringify(event.detail));
  optimizeHandler();
});

 if (localStorage.getItem('layout:variant')) {
   const variant = localStorage.getItem('layout:variant');
   spaHandler(variant, true);
 }

start({
  urlRerouteOnly: true,
});