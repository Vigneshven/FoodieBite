import { RestaurantOnboardingStatus } from "@/api/admin/type/admin/types-api";

export const onboardingStatusStyles: Record<
  RestaurantOnboardingStatus,
  { label: string; className: string }
> = {
  not_required: {
    label: "Not Required",
    className: "bg-gray-50 text-gray-700 border-gray-200",
  },
  pending_invitation: {
    label: "Pending Invitation",
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },
  invited: {
    label: "Invitation Sent",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  profile_pending: {
    label: "Profile Pending",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  pending_review: {
    label: "Pending Review",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  completed: {
    label: "Completed",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};
