export const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9;
  const endHour = 18;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        time,
        available: Math.random() > 0.3 // 70% chance of being available
      });
    }
  }
  
  return slots;
};

export const getAvailableSlots = (stylistId, date) => {
  // In a real app, this would check actual bookings
  return generateTimeSlots();
};