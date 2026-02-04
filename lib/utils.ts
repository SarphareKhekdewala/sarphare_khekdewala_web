export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export const DELIVERY_AREAS = {
  Mumbai: ['400001', '400002', '400003', '400004', '400005'],
  Thane: ['400601', '400602', '400603', '400604', '400605'],
  'Navi Mumbai': ['400701', '400702', '400703', '400704', '400705'],
};

export function getAreaByPincode(pincode: string): string | null {
  for (const [area, pincodes] of Object.entries(DELIVERY_AREAS)) {
    if (pincodes.includes(pincode)) {
      return area;
    }
  }
  return null;
}

export function calculateDeliveryCharge(area: string): number {
  const charges: Record<string, number> = {
    Mumbai: 50,
    Thane: 70,
    'Navi Mumbai': 80,
  };
  return charges[area] || 100;
}
