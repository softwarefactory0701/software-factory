import { BeautyPageIntro } from "../_components/beauty-primitives";
import { ClientsExperience } from "./clients-experience";

export default function BeautyClientsPage() {
  return (
    <>
      <BeautyPageIntro
        description="Una relación más personal con cada clienta, con contexto útil antes de recibirla."
        title="Clientes que vuelven"
      />
      <ClientsExperience />
    </>
  );
}
