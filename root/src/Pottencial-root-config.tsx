import {
  getAppStatus,
  registerApplication,
  start,
  unregisterApplication,
} from 'single-spa';
var intervalId: NodeJS.Timer;

async function optimizeHandler(isLogin: boolean = false) {
  try {
    intervalId = setInterval(async () => {
      if ((window as any).dataLayer) {
        await (window as any).dataLayer.push({ event: 'optimize.activate' });
      }

      if ((window as any).google_optimize !== undefined) {
        const variant = (window as any).google_optimize.get(
          'TPunGV65RDK9YP29npw4ow'
        );
        localStorage.setItem('layout:variant', variant);

        clearInterval(intervalId);
        spaHandler(variant, isLogin);
      }
    }, 100);
  } catch (error) {
    console.log('Error', error);
  } finally {
  }
}

async function spaHandler(variant: any, isLogin: boolean = false) {
  try {
    if (variant == '1') {
      console.log('---------------Layout Novo--------------');
      const status = getAppStatus('legacy');
      console.log('Status legacy', status);
      if (status) {
        unregisterApplication('legacy').then(() => {
          registerNewInterfaceApplication();
        });
      } else {
        registerNewInterfaceApplication();
      }
    } else {
      console.log('---------Layout legado------------');
      const status = getAppStatus('newInterface');
      console.log('Status newInterface', status);
      if (status) {
        unregisterApplication('newInterface').then(() => {
          registerLegacyApplication();
        });
      } else {
        registerLegacyApplication();
      }
    }
  } catch (error) {
    console.log('Error', error);
  } finally {
    start();
    console.log('is login', isLogin);
    if (isLogin) {
      window.location.pathname = '/portal';
    }
  }
}

function registerLegacyApplication() {
  registerApplication({
    name: 'legacy',
    app: () => import('../../main_legado'),
    activeWhen: '/portal',
  });
}

function registerNewInterfaceApplication() {
  registerApplication({
    name: 'newInterface',
    app: () => import('../../main/pottencial-broker-app'),
    activeWhen: '/portal',
  });
}

registerApplication({
  name: '@Pottencial/Login',
  app: () => System.import('@Pottencial/Login'),
  activeWhen: (location) => location.pathname === '/',
});

window.addEventListener('refresh', (event: CustomEvent) => {
  console.log('Event', event);
  localStorage.setItem('DETAILS', JSON.stringify(event.detail.data));
  optimizeHandler(event.detail.isLogin);
});

window.addEventListener('testEvent', (event: CustomEvent) => {
  console.log('Event', event);
  spaHandler(event.detail.variant);
});

if (localStorage.getItem('layout:variant')) {
  const variant = localStorage.getItem('layout:variant');
  spaHandler(variant);
}

start({
  urlRerouteOnly: true,
});
