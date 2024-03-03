import { signal } from '@preact/signals';

export const data = signal(null);

export function loadData() {
  fetch(import.meta.env.BASE_URL + '/plants.json')
    .then(res => res.json())
    .then(json => data.value = json);
}
