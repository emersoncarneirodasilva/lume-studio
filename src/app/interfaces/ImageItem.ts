export interface ImageItem {
  id: string;
  url: string;
  type: string;
  uploadedAt: string;
  salonId: string;
  professionalId: string | null;
  serviceId: string | null;
}
