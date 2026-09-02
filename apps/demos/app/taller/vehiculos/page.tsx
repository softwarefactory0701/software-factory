import { TallerPageHeader } from "../_components/taller-primitives";
import { VehiclesExperience } from "./vehicles-experience";

export default function TallerVehiclesPage() {
  return <><TallerPageHeader description="Ficha, kilometraje e historial para anticipar el próximo mantenimiento." eyebrow="Parque atendido" title="Vehículos" /><VehiclesExperience /></>;
}
