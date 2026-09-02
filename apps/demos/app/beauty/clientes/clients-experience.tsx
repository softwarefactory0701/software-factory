"use client";

import { beautyClients } from "@software-factory/mock-data/beauty";
import { StatusBadge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@software-factory/ui";
import { useMemo, useState } from "react";
import { BeautyAvatar, BeautyPanel } from "../_components/beauty-primitives";
import { formatCurrency, getBeautyProfessional } from "../_components/beauty-utils";

export function ClientsExperience() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(beautyClients[0].id);
  const filteredClients = useMemo(
    () => beautyClients.filter((client) => client.name.toLocaleLowerCase("es").includes(query.toLocaleLowerCase("es"))),
    [query],
  );
  const selectedClient = beautyClients.find((client) => client.id === selectedId) ?? beautyClients[0];
  const selectedProfessional = getBeautyProfessional(selectedClient.primaryProfessionalId);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_21rem]">
      <BeautyPanel className="min-w-0 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 p-4 sm:p-5">
          <label className="relative w-full sm:max-w-sm">
            <span className="sr-only">Buscar cliente</span>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">⌕</span>
            <input className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#b88b8d] focus:ring-2 focus:ring-[#b88b8d]/15" onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre..." type="search" value={query} />
          </label>
          <p className="text-xs font-medium text-stone-400">{filteredClients.length} clientes en esta vista</p>
        </div>

        <div className="hidden lg:block">
          <Table>
            <TableHeader><TableRow><TableHead>Cliente</TableHead><TableHead>Última visita</TableHead><TableHead>Próxima visita</TableHead><TableHead>Visitas</TableHead><TableHead>Gasto acumulado</TableHead></TableRow></TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow className={selectedId === client.id ? "bg-[#fbf4f1]" : "cursor-pointer"} key={client.id} onClick={() => setSelectedId(client.id)}>
                  <TableCell><div className="flex items-center gap-3"><BeautyAvatar initials={client.avatar} name={client.name} size="sm" /><div><p className="font-semibold text-stone-800">{client.name}</p><p className="text-xs text-stone-400">{client.phone}</p></div></div></TableCell>
                  <TableCell>{client.lastVisit}</TableCell>
                  <TableCell>{client.nextVisit ? <StatusBadge tone="success">{client.nextVisit}</StatusBadge> : <span className="text-stone-400">Sin turno</span>}</TableCell>
                  <TableCell>{client.visits}</TableCell>
                  <TableCell className="font-semibold text-stone-800">{formatCurrency(client.totalSpend)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="divide-y divide-stone-100 lg:hidden">
          {filteredClients.map((client) => (
            <button className="flex w-full items-center gap-3 p-4 text-left" key={client.id} onClick={() => setSelectedId(client.id)} type="button">
              <BeautyAvatar initials={client.avatar} name={client.name} />
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-stone-800">{client.name}</span><span className="block text-xs text-stone-400">{client.visits} visitas · {formatCurrency(client.totalSpend)}</span></span>
              <span className="text-xl text-stone-300">›</span>
            </button>
          ))}
        </div>
      </BeautyPanel>

      <BeautyPanel className="h-fit p-5 xl:sticky xl:top-24">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a76f73]">Ficha visual</p>
        <div className="mt-5 flex items-center gap-4"><BeautyAvatar initials={selectedClient.avatar} name={selectedClient.name} size="lg" /><div><h3 className="font-display text-2xl font-semibold text-stone-900">{selectedClient.name}</h3><p className="text-sm text-stone-400">{selectedClient.phone}</p></div></div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#faf6f1] p-3"><p className="text-[10px] uppercase tracking-wider text-stone-400">Visitas</p><p className="mt-1 font-display text-xl font-semibold">{selectedClient.visits}</p></div>
          <div className="rounded-xl bg-[#faf6f1] p-3"><p className="text-[10px] uppercase tracking-wider text-stone-400">Acumulado</p><p className="mt-1 font-display text-xl font-semibold">{formatCurrency(selectedClient.totalSpend)}</p></div>
        </div>
        <div className="mt-6 space-y-4 text-sm">
          <div><p className="text-xs font-semibold text-stone-400">Profesional habitual</p><p className="mt-1 font-medium text-stone-700">{selectedProfessional?.name}</p></div>
          <div><p className="text-xs font-semibold text-stone-400">Servicios realizados</p><div className="mt-2 flex flex-wrap gap-2">{selectedClient.services.map((service) => <StatusBadge key={service}>{service}</StatusBadge>)}</div></div>
          <div className="rounded-xl border border-[#ead8ce] bg-[#fcf6f2] p-3"><p className="text-xs font-semibold text-[#8b6265]">Nota para el equipo</p><p className="mt-1 text-xs leading-5 text-stone-600">{selectedClient.notes}</p></div>
          <div><p className="text-xs font-semibold text-stone-400">Próxima visita</p><p className="mt-1 font-medium text-stone-700">{selectedClient.nextVisit ?? "Todavía sin reserva"}</p></div>
        </div>
        <p className="mt-6 border-t border-stone-100 pt-4 text-center text-[10px] text-stone-400">Selección local · No modifica datos reales</p>
      </BeautyPanel>
    </div>
  );
}
