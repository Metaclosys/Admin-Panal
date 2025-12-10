"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useSession } from "next-auth/react";
import DeletePop from "../../deletePop/deletePop";
import MembershipPlanCard from "../../card/membership-card/membershipCard";
import { apiCall, API_ENDPOINTS } from "../../../../api/apiContent/apiContent";

function MiddleSection({
  membershipPlans = [],
  loading,
  onPlanDeleted,
  searchTerm,
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filter plans based on search term
  const filteredPlans = useMemo(() => {
    if (!membershipPlans) return [];

    return membershipPlans.filter(
      (plan) =>
        !searchTerm ||
        plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [membershipPlans, searchTerm]);

  const handleDeletePlan = async (planId) => {
    try {
      setDeleteLoading(true);

      if (!session?.accessToken) {
        throw new Error("No access token available");
      }

      await apiCall(API_ENDPOINTS.MEMBERSHIP_PLANS.BY_ID(planId), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      message.success("Membership plan deleted successfully");
      onPlanDeleted?.();
    } catch (error) {
      console.error("Error deleting membership plan:", error);
      message.error(error.message || "Failed to delete membership plan");
    } finally {
      setDeleteLoading(false);
      setShowDeletePop(false);
    }
  };

  return (
    <div className="relative">
      {/* Membership Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredPlans.map((plan) => {
          const planId = plan._id || plan.id; // Handle both MongoDB _id and regular id
          return (
            <MembershipPlanCard
              key={planId}
              id={planId}
              plan={plan}
              onDelete={() => {
                setSelectedPlan(plan);
                setShowDeletePop(true);
              }}
              loading={loading}
              onEdit={(currentPlan) => {
                const targetId = currentPlan?._id || currentPlan?.id;

                if (!targetId) {
                  message.error("Unable to determine plan identifier");
                  return;
                }

                router.push(
                  `/dashboard/membership-plan/addMembershipPlans?planId=${encodeURIComponent(
                    targetId
                  )}`
                );
              }}
            />
          );
        })}
      </div>

      {/* Show message when no plans are found */}
      {filteredPlans.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No membership plans found. Add a new plan to get started.
          </p>
        </div>
      )}

      {showDeletePop && (
        <div className="fixed inset-0 z-50">
          <DeletePop
            title="Are you sure you want to delete this membership plan?"
            message="This will delete the membership plan permanently. You cannot undo this action."
            onCancel={() => setShowDeletePop(false)}
            onDelete={() =>
              handleDeletePlan(selectedPlan?._id || selectedPlan?.id)
            }
            onClose={() => setShowDeletePop(false)}
            loading={deleteLoading}
          />
        </div>
      )}
    </div>
  );
}

export default MiddleSection;
