"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HABIT_ICONS } from "@/lib/constants";
import { createHabit } from "@/hooks/use-habits";
import { useLanguage } from "@/lib/i18n";

interface AddHabitDialogProps {
  onCreated?: () => void;
}

/** Simple dialog to create a habit with a name + emoji icon. */
export function AddHabitDialog({ onCreated }: AddHabitDialogProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(HABIT_ICONS[0]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      setError(t("hab.name"));
      return;
    }
    setBusy(true);
    try {
      await createHabit({ name: name.trim(), icon, frequency: [] });
      toast.success("Habit created.");
      setName("");
      setIcon(HABIT_ICONS[0]);
      setError("");
      setOpen(false);
      onCreated?.();
    } catch {
      toast.error("Could not create habit.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-1.5 h-4 w-4" /> {t("common.newHabit")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("hab.createTitle")}</DialogTitle>
          <DialogDescription>{t("hab.createDesc")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="habit-name">{t("hab.name")}</Label>
            <Input
              id="habit-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder={t("hab.namePlaceholder")}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label>{t("hab.icon")}</Label>
            <div className="flex flex-wrap gap-2">
              {HABIT_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg border text-xl transition-colors",
                    icon === emoji ? "border-primary bg-accent" : "hover:bg-muted",
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleCreate} disabled={busy} className="w-full">
            {busy ? t("hab.creating") : t("hab.createBtn")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
