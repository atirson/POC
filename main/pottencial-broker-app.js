//app1.js

let domEl;

export function bootstrap(props) {
  return Promise.resolve().then(() => {
    domEl = document.createElement('div');
    domEl.id = 'app1';
    domEl.classList.add('application-wrappers');
    document.body.appendChild(domEl);
  });
}

export function mount(props) {
  return Promise.resolve().then(() => {
    /**
     * window.requestAnimationFrame() is necessary in order to have the transition on first bootstrap/mount,
     * otherwise the browser batches the addition of the 'mounting' class with the 'wrapper' class from bootstrap
     * above and the transition doens't actually happen.
     **/
    window.requestAnimationFrame(() =>
      domEl.classList.add('application-mounting')
    );
    domEl.innerHTML = `Main - Nova interface <br /> Corretora: JANE DOE <br />`;
    domEl.style.fontSize = '5rem';
    domEl.style.backgroundColor = 'yellow';

    const button = document.createElement('button');
    button.style.border = 'none';
    button.style.marginLeft = '1rem';
    button.style.marginBottom = '1rem';
    button.style.fontSize = '1.5rem';
    button.style.borderRadius = '5px';
    button.style.fontFamily = 'Poppins';
    button.style.backgroundColor = 'white';
    button.style.padding = '6px';
    button.style.boxShadow = '5px 5px #f26522';
    button.style.color = 'black';
    button.style.cursor = 'pointer';
    button.innerHTML = 'Trocar Corretora';

    const refreshEvent = new CustomEvent('testEvent', {
      detail: { variant: '2' },
    });
    button.onclick = () => {
      window.dispatchEvent(refreshEvent);
    };

    domEl.appendChild(button);
  });
}

export function unmount(props) {
  return Promise.resolve().then(() => {
    domEl.classList.remove('application-mounting');
    domEl.innerHTML = '';
  });
}
