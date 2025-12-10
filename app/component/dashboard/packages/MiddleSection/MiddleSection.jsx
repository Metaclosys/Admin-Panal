"use client";
import { useState, useMemo } from "react";
import DeletePop from "../../deletePop/deletePop";
import { apiCall, API_ENDPOINTS } from "../../../../api/apiContent/apiContent";
import { useSession } from "next-auth/react";
import { message, Empty, Row, Col } from "antd";
import PackagesCard from "../../card/packages/packagesCard";

function MiddleSection({
  packages = [],
  loading,
  onPackageDeleted,
  searchTerm,
}) {
  const { data: session } = useSession();
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filter packages based on search term
  const filteredPackages = useMemo(() => {
    if (!packages) return [];

    return packages.filter(
      (pkg) =>
        !searchTerm ||
        pkg.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [packages, searchTerm]);

  // Get service names for a package
  const getServiceNames = (pkg) => {
    if (!pkg) return [];

    const serviceNames = pkg.map((service) => service.name);
    return serviceNames;
  };

  const handleDeletePackage = async (packageId) => {
    try {
      setDeleteLoading(true);
      
      if (!session?.accessToken) {
        throw new Error("No access token available");
      }

      await apiCall(API_ENDPOINTS.PACKAGES.BY_ID(packageId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.accessToken}`
        }
      });

      message.success("Package deleted successfully");
      onPackageDeleted?.();
    } catch (error) {
      console.error("Error deleting package:", error);
      message.error(error.message || "Failed to delete package");
    } finally {
      setDeleteLoading(false);
      setShowDeletePop(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (!filteredPackages.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <Empty description="No packages found" />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Row gutter={[16, 16]}>
        {filteredPackages.map((pkg) => (
          <Col xs={24} sm={12} md={8} lg={6} key={pkg._id || pkg.id}>
            <PackagesCard
              name={pkg.name}
              duration={`Duration: ${pkg.duration} mins`}
              type={pkg.type}
              price={pkg.price}
              services={getServiceNames(pkg.includedServiceIds)}
              onDelete={() => {
                setSelectedPackage(pkg);
                setShowDeletePop(true);
              }}
            />
          </Col>
        ))}
      </Row>

      {showDeletePop && (
        <div className="fixed inset-0 z-50">
          <DeletePop
            title="Are you sure you want to delete this package?"
            message="This will delete the package permanently. You cannot undo this action."
            onCancel={() => setShowDeletePop(false)}
            onDelete={() =>
              handleDeletePackage(selectedPackage?._id || selectedPackage?.id)
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
