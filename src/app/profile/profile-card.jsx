"use client";

import { useState } from "react";
import ViewDialog from "./profile-view";
// import UpsertDialog from "./profile-update";
import { format, parse } from "date-fns";

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

import {
  CalendarDays,
  Edit,
  Eye,
  Mail,
  MoreHorizontal,
  UserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const KidCard = ({ kid }) => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  return (
    <>
      {openViewDialog && (
        <ViewDialog
          kid={kid}
          openDialog={openViewDialog}
          setOpenDialog={setOpenViewDialog}
        />
      )}
      {/* {openUpdateDialog && (
        <UpsertDialog
          kid={kid}
          openDialog={openUpdateDialog}
          setOpenDialog={setOpenUpdateDialog}
        />
      )} */}
      <Card className="w-full max-w-sm">
        <CardHeader className="relative flex w-full flex-col items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="absolute right-0 top-0 size-8"
                size="icon"
                variant="secondary"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setOpenViewDialog(true)}>
                <Eye size={16} className="mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenUpdateDialog(true)}>
                <Edit size={16} className="mr-2" />
                Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="size-24 border-2 border-primary p-0.5">
            <AvatarImage
              alt={kid.firstName}
              src={kid.user?.avatarUrl || undefined}
              className="rounded-full object-cover"
            />
            <AvatarFallback className="text-4xl font-light text-secondary">
              {kid.firstName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </CardHeader>

        <CardContent className="flex w-full flex-col justify-stretch gap-4">
          <InfoRow
            icon={<UserRound className="stroke-secondary stroke-1" size={32} />}
            label="Name"
            value={
              kid.middleName
                ? `${kid.title} ${kid.firstName} ${kid.middleName} ${kid.lastName}`
                : `${kid.title} ${kid.firstName} ${kid.lastName}`
            }
          />
          <InfoRow
            icon={<Mail className="stroke-secondary stroke-1" size={32} />}
            label="Email"
            value={kid.user.email}
          />
          <InfoRow
            icon={<CalendarDays className="stroke-secondary stroke-1" size={32} />}
            label="Date of Birth"
            value={format(parse(kid.dateOfBirth, "yyyy-MM-dd", new Date()), "MMM do, yyyy")}
          />
        </CardContent>
      </Card>
    </>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex w-full gap-2">
    {icon}
    <div className="flex w-full flex-col">
      <h1 className="text-xs text-muted-foreground">{label}</h1>
      <p className="break-all text-sm font-medium">{value}</p>
    </div>
  </div>
);

export default KidCard;
