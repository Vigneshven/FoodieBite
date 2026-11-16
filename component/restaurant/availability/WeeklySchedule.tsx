"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const weeklyScheduleSchema = z.object({
  days: z.array(
    z
      .object({
        day: z.string(),
        isOpen: z.boolean(),
        openingTime: z.string(),
        closingTime: z.string(),
      })
      .refine((d) => !d.isOpen || Boolean(d.openingTime), {
        message: "Opening time is required",
        path: ["openingTime"],
      })
      .refine((d) => !d.isOpen || Boolean(d.closingTime), {
        message: "Closing time is required",
        path: ["closingTime"],
      })
      .refine(
        (d) =>
          !d.isOpen ||
          !d.openingTime ||
          !d.closingTime ||
          d.openingTime < d.closingTime,
        {
          message: "Closing time must be later than opening time",
          path: ["closingTime"],
        },
      ),
  ),
});

type WeeklyScheduleFormValues = z.infer<typeof weeklyScheduleSchema>;

const defaultSchedule: WeeklyScheduleFormValues = {
  days: [
    { day: "Monday", isOpen: true, openingTime: "09:00", closingTime: "22:00" },
    {
      day: "Tuesday",
      isOpen: true,
      openingTime: "09:00",
      closingTime: "22:00",
    },
    {
      day: "Wednesday",
      isOpen: true,
      openingTime: "09:00",
      closingTime: "22:00",
    },
    {
      day: "Thursday",
      isOpen: true,
      openingTime: "09:00",
      closingTime: "22:00",
    },
    { day: "Friday", isOpen: true, openingTime: "09:00", closingTime: "23:00" },
    {
      day: "Saturday",
      isOpen: true,
      openingTime: "09:00",
      closingTime: "23:00",
    },
    {
      day: "Sunday",
      isOpen: false,
      openingTime: "09:00",
      closingTime: "22:00",
    },
  ],
};

export default function WeeklySchedule() {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<WeeklyScheduleFormValues>({
    resolver: zodResolver(weeklyScheduleSchema),
    defaultValues: defaultSchedule,
  });

  const days = watch("days");

  const onSubmit = (data: WeeklyScheduleFormValues) => {
    console.log("Weekly schedule:", data);
  };

  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>Weekly Schedule</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your restaurant's regular opening and closing hours.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          {days.map((day, index) => (
            <div
              key={day.day}
              className="grid gap-4 rounded-lg border p-4 xl:grid-cols-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-medium">{day.day}</p>
                  <p className="text-xs text-muted-foreground">
                    {day.isOpen ? "Open" : "Closed"}
                  </p>
                </div>
                <Switch
                  checked={day.isOpen}
                  onCheckedChange={(checked) =>
                    setValue(`days.${index}.isOpen`, checked, {
                      shouldValidate: true,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Opening Time</Label>
                <Input
                  type="time"
                  disabled={!day.isOpen}
                  {...register(`days.${index}.openingTime`)}
                />
                {errors.days?.[index]?.openingTime && (
                  <p className="text-xs text-red-500">
                    {errors.days[index].openingTime.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Closing Time</Label>
                <Input
                  type="time"
                  disabled={!day.isOpen}
                  {...register(`days.${index}.closingTime`)}
                />
                {errors.days?.[index]?.closingTime && (
                  <p className="text-xs text-red-500">
                    {errors.days[index].closingTime.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4 shrink-0" />

                <span>
                  {day.isOpen
                    ? `${day.openingTime} - ${day.closingTime}`
                    : "Closed all day"}
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <Button type="submit">
              <Save className="mr-2 size-4" />
              Save Schedule
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
