import { stylists } from "../mock/mockData.js";

const initials = (name) => 
  name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const priceFmt = (n) => `₱${n}`;

function cardHTML(s) {
  return `
  <div class="card bg-card hover:shadow-lg transition-shadow duration-300">
    <div class="card-content p-6">
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
          ${initials(s.name)}
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-dark-secondary-fg">${s.name}</h3>
          <p class="text-dark-muted-fg">${s.specialty}</p>
        </div>
      </div>

      <div class="space-y-2 mb-4">
        <div class="flex items-center text-sm text-dark-muted-fg">Experience: ${s.experience}</div>
        <div class="flex items-center text-sm text-dark-muted-fg">Rating: ${s.rating}</div>
        <div class="flex items-center text-sm text-dark-muted-fg">Price per service: ${priceFmt(s.price)}</div>
        ${s.rating >= 4.5 ? `<div class="badge border border-primary bg-secondary text-secondary-foreground mb-4">Available Today</div>` : ''}
      </div>
    </div>

    <div class="card-footer pt-0">
      <button class="default-button w-full bg-primary rounded-md hover:bg-primary/90" data-id="${s.id}">Book with ${s.name}</button>
    </div>
  </div>
  `;
}

function renderStylists() {
  const container = document.getElementById("stylists-grid");
  if (!container) return;
  container.innerHTML = stylists.map(cardHTML).join('');
}

function bindBooking() {
  const container = document.getElementById('stylists-grid');
  if (!container) return;
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    const s = stylists.find((x) => x.id === btn.dataset.id);
    if (!s) return;
    alert(`Booking with ${s.name}`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderStylists();
  bindBooking();
})