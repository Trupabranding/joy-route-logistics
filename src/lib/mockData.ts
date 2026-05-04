export const mockJob = {
  id: "VR-2841",
  pickup: "12 Market Street, Soho",
  dropoff: "44 Camden High St, Camden",
  distanceKm: 6.4,
  durationMin: 18,
  price: 24.5,
  itemDescription: "2 medium boxes — fragile",
  recipient: "Lara M.",
  recipientPhone: "+44 7700 900 213",
};

export const mockEarnings = {
  today: 142.8,
  trips: 7,
  online: "5h 12m",
  history: [
    { id: "VR-2841", time: "14:22", from: "Soho", to: "Camden", amount: 24.5 },
    { id: "VR-2839", time: "13:05", from: "Shoreditch", to: "Hackney", amount: 18.2 },
    { id: "VR-2837", time: "12:11", from: "Mayfair", to: "Notting Hill", amount: 31.0 },
    { id: "VR-2834", time: "10:48", from: "Pimlico", to: "Vauxhall", amount: 12.4 },
    { id: "VR-2830", time: "09:30", from: "Kings Cross", to: "Islington", amount: 21.8 },
  ],
};

export const mockDeliveries = [
  { id: "VR-2841", recipient: "Lara M.", from: "Soho", to: "Camden", status: "in_transit" as const, price: 24.5, time: "14:22" },
  { id: "VR-2839", recipient: "John D.", from: "Shoreditch", to: "Hackney", status: "delivered" as const, price: 18.2, time: "13:05" },
  { id: "VR-2837", recipient: "Priya K.", from: "Mayfair", to: "Notting Hill", status: "delivered" as const, price: 31.0, time: "12:11" },
  { id: "VR-2834", recipient: "Sam R.", from: "Pimlico", to: "Vauxhall", status: "delivered" as const, price: 12.4, time: "10:48" },
];

export const mockDriver = {
  name: "Marcus Chen",
  rating: 4.9,
  vehicle: "White Ford Transit",
  plate: "LV24 NXR",
  phone: "+44 7700 900 121",
};
