import { TallerPageHeader } from "../_components/taller-primitives";
import { OrdersExperience } from "./orders-experience";

export default function TallerOrdersPage() {
  return <><TallerPageHeader description="Del ingreso a la entrega: cada vehículo, responsable y trabajo en un solo flujo." eyebrow="Operación central" title="Órdenes de trabajo" /><OrdersExperience /></>;
}
