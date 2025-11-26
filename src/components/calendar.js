export function createCalendar(container, {
  selected = null,
  onSelect = () => {},
  disabled = (date) => false,
  locale = 'default'
} = {}) {
  if (!container) return;

  let current = selected ? startOfMonth(selected) : startOfMonth(new Date());

  function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
  function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }
  function toMidnight(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

  const todayMid = toMidnight(new Date());

  function render() {
    container.innerHTML = '';

    // header / nav
    const header = document.createElement('div');
    header.className = 'flex items-center justify-between mb-3';
    const prev = button('‹', 'text-dark-fg hover:bg-secondary/10 cursor-pointer');
    const next = button('›', 'text-dark-fg hover:bg-secondary/10 cursor-pointer');
    const title = document.createElement('div');
    title.className = 'font-medium text-sm';
    title.textContent = current.toLocaleString(locale, { month: 'long', year: 'numeric' });

    prev.addEventListener('click', () => { current = new Date(current.getFullYear(), current.getMonth() - 1, 1); render(); });
    next.addEventListener('click', () => { current = new Date(current.getFullYear(), current.getMonth() + 1, 1); render(); });

    header.appendChild(prev);
    header.appendChild(title);
    header.appendChild(next);

    container.appendChild(header);

    // weekdays
    const weekNames = [];
    for (let i = 0; i < 7; i++) {
      const dt = new Date(1970, 0, 4 + i); // Sun..Sat
      weekNames.push(dt.toLocaleString(locale, { weekday: 'short' }));
    }
    const wkRow = document.createElement('div');
    wkRow.className = 'grid grid-cols-7 gap-1 text-xs text-dark-fg mb-1';
    weekNames.forEach(w => {
      const c = document.createElement('div');
      c.className = 'text-center';
      c.textContent = w;
      wkRow.appendChild(c);
    });
    container.appendChild(wkRow);

    // days grid
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-7 gap-1';

    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(year, month);

    // leading blanks
    for (let i = 0; i < firstDay; i++) {
      const cell = document.createElement('div');
      cell.className = 'h-10';
      grid.appendChild(cell);
    }

    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      const btn = document.createElement('button');

      const isDisabled = disabled(date) || toMidnight(date) < todayMid;
      const isSelected = selected && isSameDay(date, selected);

      btn.type = 'button';
      btn.className = [
        'w-full h-10 rounded-md flex items-center justify-center text-sm',
        isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/10',
        isDisabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
      ].join(' ');

      btn.textContent = String(d);
      btn.dataset.date = date.toISOString();

      if (!isDisabled) {
        btn.addEventListener('click', () => {
          selected = date;
          onSelect(date);
          render();
        });
      }

      grid.appendChild(btn);
    }

    container.appendChild(grid);
  }

  function button(label, extra = '') {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `px-2 py-1 rounded-md ${extra}`;
    b.textContent = label;
    return b;
  }

  render();

  return {
    setSelected(d) {
      selected = d ? toMidnight(d) : null;
      render();
    },
    getSelected() {
      return selected;
    },
    goTo(monthDate) {
      current = startOfMonth(monthDate);
      render();
    }
  };
}