"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Bell, Calendar, ArrowRight } from "lucide-react";
import { formatDate, formatTime } from "@/src/utils/dateTime";
import { UserNotification } from "@/src/utils/notificationMapper";
import StatusBadge from "../Appointment/StatusBadge";

export default function NotificationCard({
  notification,
}: {
  notification: UserNotification;
}) {
  const [isRead, setIsRead] = useState(notification.isRead);
  const appointment = notification.appointment;

  async function markAsRead() {
    if (isRead) return;
    try {
      setIsRead(true);
      const res = await fetch(`/api/notifications/${notification.id}/read`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error();
    } catch (err) {
      setIsRead(false);
    }
  }

  return (
    <div
      className={`group p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
        isRead
          ? "bg-card-secondary/40 border-card-border/30 opacity-70"
          : "bg-card-secondary border-card-border hover:border-brand-gold-dark/40 shadow-sm"
      }`}
    >
      {/* Indicador de Nova Notificação */}
      {!isRead && (
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold-dark" />
      )}

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-3">
            <div
              className={`p-2 rounded-lg h-fit ${isRead ? "bg-muted/10" : "bg-brand-gold-dark/10"}`}
            >
              <Bell
                size={18}
                className={
                  isRead ? "text-muted-foreground" : "text-brand-gold-dark"
                }
              />
            </div>
            <div className="space-y-1">
              <p
                className={`text-lg font-medium leading-tight ${isRead ? "text-foreground/70" : "text-foreground"}`}
              >
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground font-light italic">
                Recebida em {formatDate(notification.createdAt)} às{" "}
                {formatTime(notification.createdAt)}
              </p>
            </div>
          </div>

          {!isRead ? (
            <button
              onClick={markAsRead}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-brand-gold-dark hover:text-brand-gold-light transition-colors cursor-pointer shrink-0"
            >
              <Check size={14} />
              Marcar como lida
            </button>
          ) : (
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 shrink-0 select-none">
              <Check size={14} className="text-emerald-500" />
              Lido
            </span>
          )}
        </div>

        {/* Detalhes do Agendamento (se houver) */}
        {appointment && (
          <div className="mt-2 p-4 rounded-xl bg-background/50 border border-card-border/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <StatusBadge status={appointment.status} />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={14} className="text-brand-gold-dark/60" />
                  {formatDate(appointment.scheduledAt)} às{" "}
                  {formatTime(appointment.scheduledAt)}
                </div>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {appointment.services?.map((s: any, idx: number) => (
                  <span
                    key={idx}
                    className="text-sm text-foreground/80 font-light"
                  >
                    {s.service.name} •{" "}
                    <span className="text-muted-foreground">
                      {s.professional.name}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {appointment.status === "CANCELED" ||
            appointment.status === "COMPLETED" ? (
              <Link
                href="/agendamentos/historico"
                className="flex items-center gap-2 text-xs font-medium text-brand-gold-dark hover:gap-3 transition-all"
              >
                Ver detalhes <ArrowRight size={14} />
              </Link>
            ) : (
              <Link
                href="/agendamentos"
                className="flex items-center gap-2 text-xs font-medium text-brand-gold-dark hover:gap-3 transition-all"
              >
                Ver detalhes <ArrowRight size={14} />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
