import { calcPlayerRate } from './utility';

const classDom = document.getElementsByClassName('music-list-header-title');
const header =
  classDom.length > 0 ? (classDom[0] as HTMLDivElement) : undefined;

if (typeof header !== 'undefined') {
  const rate = calcPlayerRate();
  const component = `
    <div class="wrapper">
      <div class="header-title">Music List</div>
      <div>Rate: ${rate.toFixed(1)}</div>
    </div>
  `;
  header.innerHTML = component;
}
