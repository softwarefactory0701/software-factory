import { BeautyPageIntro } from "../_components/beauty-primitives";
import { AgendaExperience } from "./agenda-experience";

export default function BeautyAgendaPage() {
  return (
    <>
      <BeautyPageIntro
        description="Organizá el día por profesional y anticipá cada momento del salón."
        eyebrow="Martes, 8 de septiembre · 09:00—19:00"
        title="La agenda de hoy"
      />
      <AgendaExperience />
    </>
  );
}
