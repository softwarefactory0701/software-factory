import {
  beautyClients,
  beautyProfessionals,
  beautyServices,
} from "@software-factory/mock-data/beauty";

export const formatCurrency = (value: number) => `$${new Intl.NumberFormat("es-AR").format(value)}`;

export function getBeautyClient(id: string) {
  return beautyClients.find((client) => client.id === id);
}

export function getBeautyProfessional(id: string) {
  return beautyProfessionals.find((professional) => professional.id === id);
}

export function getBeautyService(id: string) {
  return beautyServices.find((service) => service.id === id);
}
