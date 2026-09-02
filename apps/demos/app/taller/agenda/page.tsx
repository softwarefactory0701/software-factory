import { TallerPageHeader } from "../_components/taller-primitives";
import { TallerAgendaExperience } from "./taller-agenda-experience";

export default function TallerAgendaPage() {
  return <><TallerPageHeader description="Turnos organizados por mecánico, con vehículo, patente y trabajo previsto." eyebrow="Martes, 8 de septiembre · 08:00—19:00" title="Plan de trabajo del día" /><TallerAgendaExperience /></>;
}
