import { registerApplication, start } from 'single-spa';
import { Experiment, Variant } from 'react-optimize';

const layoutEl = document.querySelector('#layout');
layoutEl.innerHTML = `
<Experiment id="TPunGV65RDK9YP29npw4ow">
  <Variant id="0">Original</Variant>
  <Variant id="1">
    <div>CEP INPUT</div>
  </Variant>
</Experiment>
`;

async function spaHandler(
  detail: { show: boolean },
  fromLocalStorage: boolean = false
) {
  try {
    const show = detail.show;

    if (show) {
      registerApplication(
        'app1',
        () => import('../../main/pottencial-broker-app'),
        (location) => location.pathname === '/portal'
      );
    } else {
      registerApplication(
        'app2',
        () => import('../../main_legado'),
        (location) => location.pathname === '/portal'
      );
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
  spaHandler(event.detail);
});

if (localStorage.getItem('DETAILS')) {
  const details = localStorage.getItem('DETAILS');
  spaHandler(JSON.parse(details), true);
}

start({
  urlRerouteOnly: true,
});
