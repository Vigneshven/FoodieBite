"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type MenuItemDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuItemName: string;
  onConfirm: () => void;
};

export default function MenuItemDeleteDialog({
  open,
  onOpenChange,
  menuItemName,
  onConfirm,
}: MenuItemDeleteDialogProps) {
  const handleDelete = () => {
    onConfirm();
    onOpenChange(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Menu Item?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {menuItemName}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-gray-500 text-white "
          >
            Delete Menu Item
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
