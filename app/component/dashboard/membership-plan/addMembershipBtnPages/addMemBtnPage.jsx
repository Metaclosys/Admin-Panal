"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Radio,
  Button,
  Card,
  Select,
  InputNumber,
  Switch,
} from "antd";
import Link from "next/link";
import ServiceModal from "../../ServiceCardBtn/ServiceCardBtn";

const services = [
  {
    id: 1,
    title: "Combination",
    image: "/images/jpgFiles/service1.jpg",
    buttonText: "Select Services",
  },
  {
    id: 2,
    title: "Hair Color",
    image: "/images/jpgFiles/service1.jpg",
    buttonText: "Select Services",
  },
  {
    id: 3,
    title: "Haircuts",
    image: "/images/jpgFiles/service1.jpg",
    buttonText: "Select Services",
  },
  {
    id: 4,
    title: "Men's Grooming",
    image: "/images/jpgFiles/service1.jpg",
    buttonText: "Select Services",
  },
  {
    id: 5,
    title: "Waxing",
    image: "/images/jpgFiles/service1.jpg",
    buttonText: "Select Services",
  },
  {
    id: 6,
    title: "Manicures",
    image: "/images/jpgFiles/service1.jpg",
    buttonText: "Select Services",
  },
];

const serviceOptions = {
  Combination: [
    "General",
    "Bald Fade with Bread Trim and Razor Line Up",
    "Haircut with Beard Trim",
    "Haircut with Beard Trim w/ Razor Line Up",
    "Haircut & Beard Shave Special",
    "Haircut & Facial Combo",
    "Royal Hangover Treatment",
    "Sami's Special",
  ],
  "Hair Color": [
    "General",
    "Virgin Process Color",
    "Color Retouch",
    "Bleach and Tone",
    "Re-bonding Treatment",
    "Grey-Blending",
  ],
  Haircuts: [
    "General",
    "Scissor Cut",
    "Buzz Haircut",
    "Beard Trim",
    "Ultra Wax",
    "Long Method",
    "Short Paper Method/Razor/Fade",
    "Against Hair Method",
    "Manual + Method blending",
  ],
  "Men's Grooming": [
    "Beard Trim",
    "Beard Trim with foam (45+ Up",
    "Beard Trim with foam",
    "Ear Lower Facial Treatment",
    "Head/Facial/Massage",
  ],
  Manicures: ["Nail Repair", "Gents Manicure"],
  Waxing: [
    "Brows",
    "General",
    "Nose Wax",
    "Deluxe Tailored Wax Packages (Brows/Nose/Ears)",
    "Ears",
  ],
};

function AddMemBtnPage({ activeTab }) {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      window.history.back();
    }
  };

  const [selectedService, setSelectedService] = useState(null);

  const handleViewServices = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  // Expanded formData state
  const [formData, setFormData] = useState({
    membershipName: "",
    sharingOption: {
      isShared: false,
      shareScope: "brand",
    },
    benefitSets: {
      hasBenefits: false,
      benefits: [],
    },
    services: {
      selectedServices: [],
    },
    paymentPlan: {
      price: "",
      interval: "monthly",
      initiationFee: "",
      durationType: "ongoing",
      duration: "",
      expireBenefits: "never",
      expireDays: "",
      employeeCommission: "",
      canFreeze: false,
      freezePrice: "",
      freezeAccrueBenefits: false,
      freezeRedeemBenefits: false,
    },
  });

  const handleSubmit = (values) => {
    console.log("Membership Plan details:", values);
    // Handle form submission
  };
  const NavigationButtons = () => (
    <div className="flex items-center justify-end mb-0 gap-2">
      <Button
        onClick={prevPage}
        className="bg-transparent border-black text-black rounded-full px-6 py-2.5 h-auto"
      >
        Back
      </Button>
      <Button
        type="primary"
        onClick={nextPage}
        className="bg-[#0F172A] rounded-full px-6 py-2.5 h-auto"
      >
        Continue
      </Button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center p-20">
            {currentPage === 1 && (
              <>
                <h2 className="text-2xl font-bold text-blue-500 mb-4">
                  Membership Plan Name
                </h2>
                <p className="text-gray-600 text-center mb-8 max-w-md">
                  Membership Plans should have distinctive names. It's good to
                  be descriptive but not too lengthy.
                </p>
                <Form.Item
                  name="membershipName"
                  className="w-full max-w-md"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a membership plan name",
                    },
                  ]}
                >
                  <Input
                    placeholder="Membership Plan Name"
                    value={formData.membershipName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        membershipName: e.target.value,
                      })
                    }
                    className="py-2"
                  />
                </Form.Item>
              </>
            )}
            {currentPage === 2 && (
              <>
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">
                  Sharing Option
                </h2>
                <p className="text-gray-600 text-center mb-8 max-w-md">
                  Some businesses allow their members to share their Membership
                  Plan with others.
                </p>
                <Form.Item name="sharingOption" className="mb-6">
                  <div className="mb-6">
                    <p className="mb-4">
                      Will you allow your members to share Membership Plan with
                      others?
                    </p>
                    <Radio.Group
                      value={formData.sharingOption.isShared}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sharingOption: {
                            ...formData.sharingOption,
                            isShared: e.target.value,
                          },
                        })
                      }
                    >
                      <Radio value={false}>No</Radio>
                      <Radio value={true}>Yes</Radio>
                    </Radio.Group>
                  </div>
                  {formData.sharingOption.isShared && (
                    <Radio.Group
                      value={formData.sharingOption.shareScope}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sharingOption: {
                            ...formData.sharingOption,
                            shareScope: e.target.value,
                          },
                        })
                      }
                      className="flex gap-4"
                    >
                      <Radio value="brand">
                        All customers within the brand
                      </Radio>
                      <Radio value="location">
                        Only customers within each location
                      </Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center justify-center p-20">
            {currentPage === 1 && (
              <>
                <h2 className="text-2xl font-bold text-blue-500 mb-4">
                  Benefit Sets
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  Members can choose from any Services you select on this page.
                  <br />
                  You can select entire categories too.
                </p>

                <div className="w-full max-w-3xl">
                  <h3 className="text-lg font-medium mb-4">Services</h3>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="bg-[#87D0FFBF] p-6 rounded-lg flex flex-col items-center"
                      >
                        <h4 className="font-medium mb-4">{service.title}</h4>
                        <button
                          onClick={() => handleViewServices(service.title)}
                          className="bg-[#0F172A] text-white px-4 py-2 rounded-full text-sm hover:bg-[#1E293B] transition-colors"
                        >
                          {service.buttonText}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="text-gray-600 mb-4">
                      After selecting Services, let's name this Benefit Set.
                    </p>
                    <Form.Item
                      name={["benefitSets", "name"]}
                      className="w-full"
                    >
                      <Input
                        placeholder="Benefits Set Name"
                        className="py-2 rounded-lg"
                        value={formData.benefitSets.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            benefitSets: {
                              ...formData.benefitSets,
                              name: e.target.value,
                            },
                          })
                        }
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Service Modal */}
                <ServiceModal
                  isOpen={!!selectedService}
                  onClose={handleCloseModal}
                  serviceType={selectedService}
                  services={
                    selectedService ? serviceOptions[selectedService] : []
                  }
                />
              </>
            )}

            {currentPage === 2 && (
              <>
                <h2 className="text-2xl font-bold text-blue-500 mb-4">
                  Configure Benefits
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  How many benefits can be redeemed, how often, and for how
                  long?
                </p>

                <div className="w-full max-w-3xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex justify-between gap-2 items-center">
                      <p className="text-sm text-gray-500 mb-2">Any</p>
                      <Input
                        placeholder=""
                        value={formData.benefitSets.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            benefitSets: {
                              ...formData.benefitSets,
                              name: e.target.value,
                            },
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                      <p className="text-sm text-gray-500 mb-2">from</p>
                      <p className="text-sm text-blue-400 mb-2">
                        &lt;Membership Plan Name&gt;
                      </p>

                      <Select
                        placeholder="Select frequency"
                        value={formData.benefitSets.from}
                        onChange={(value) =>
                          setFormData({
                            ...formData,
                            benefitSets: {
                              ...formData.benefitSets,
                              from: value,
                            },
                          })
                        }
                        className="w-full"
                      >
                        <Select.Option value="one-time">One-time</Select.Option>
                        <Select.Option value="weekly">Weekly</Select.Option>
                        <Select.Option value="monthly">Monthly</Select.Option>
                      </Select>
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                      <p className="text-sm text-gray-500 mb-2">expiring</p>
                      <Select
                        placeholder="Select expiry"
                        value={formData.benefitSets.action}
                        onChange={(value) =>
                          setFormData({
                            ...formData,
                            benefitSets: {
                              ...formData.benefitSets,
                              action: value,
                            },
                          })
                        }
                        className="w-full"
                      >
                        <Select.Option value="never">Never</Select.Option>
                        <Select.Option value="days">
                          Days from accrued date
                        </Select.Option>
                        <Select.Option value="next-accrual">
                          Upon next accrual
                        </Select.Option>
                      </Select>
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                      <Input
                        placeholder="never"
                        value={formData.benefitSets.expiry}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            benefitSets: {
                              ...formData.benefitSets,
                              expiry: e.target.value,
                            },
                          })
                        }
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500 mb-2">days</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentPage === 3 && (
              <>
                <h2 className="text-2xl font-bold text-blue-500 mb-4">
                  <span className="text-gray-700">
                    {formData.membershipName}
                  </span>{" "}
                  Benefits
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  Existing Benefits can be edited or removed, if needed. You
                  <br />
                  can also add a new Benefit Set.
                </p>

                <div className="w-full max-w-3xl">
                  <div className="flex items-center gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Any</p>
                      <p>{formData.benefitSets.name}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">from</p>
                      <p>{formData.benefitSets.from}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">
                        &lt;Membership Plan Name&gt;
                      </p>
                      <p>{formData.benefitSets.action}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">expiring</p>
                      <p>{formData.benefitSets.expiry}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">days from accrued</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setCurrentPage(2)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <Button
                    type="dashed"
                    onClick={() => setCurrentPage(2)}
                    className="w-full mt-4"
                    icon={<span className="mr-2">+</span>}
                  >
                    Add Another Benefit Set
                  </Button>
                </div>
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center justify-center p-20">
            {currentPage === 1 && (
              <>
                <h2 className="text-2xl font-bold text-blue-500 mb-4">
                  Payment Plan
                </h2>
                <div className="w-full max-w-3xl">
                  <div className="space-y-6">
                    {/* Payment Price/Pay Period */}
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-2">
                          Payment Price/Pay Period
                        </p>
                        <div className="flex gap-2 items-center">
                          <span>$</span>
                          <Input
                            value={formData.paymentPlan.price}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                paymentPlan: {
                                  ...formData.paymentPlan,
                                  price: e.target.value,
                                },
                              })
                            }
                            className="w-32"
                          />
                          <span>(USD)</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-2">Effective</p>
                        <Input
                          value={formData.paymentPlan.price}
                          onChange={() => {}}
                          className="w-32"
                          placeholder="day/month/year"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-2">Frequency</p>
                        <Select
                          value={formData.paymentPlan.interval}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              paymentPlan: {
                                ...formData.paymentPlan,
                                interval: value,
                              },
                            })
                          }
                          className="w-full"
                        >
                          <Select.Option value="one-time">
                            One Time
                          </Select.Option>
                          <Select.Option value="daily">Daily</Select.Option>
                          <Select.Option value="weekly">Weekly</Select.Option>
                          <Select.Option value="bi-weekly">
                            Bi-Weekly
                          </Select.Option>
                          <Select.Option value="monthly">Monthly</Select.Option>
                          <Select.Option value="quarterly">
                            Quarterly
                          </Select.Option>
                          <Select.Option value="semi-annually">
                            Semi-Annually
                          </Select.Option>
                          <Select.Option value="annually">
                            Annually
                          </Select.Option>
                        </Select>
                      </div>
                    </div>

                    <hr className="border-gray-500 w-full my-5" />

                    {/* Initiation Fee */}
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-500">Initiation Fee</p>
                      <div className="flex gap-2 items-center">
                        <span>$</span>
                        <Input
                          value={formData.paymentPlan.initiationFee}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              paymentPlan: {
                                ...formData.paymentPlan,
                                initiationFee: e.target.value,
                              },
                            })
                          }
                          className="w-32"
                        />
                        <span>(USD)</span>
                      </div>
                    </div>

                    <hr className="border-gray-500 w-full" />

                    {/* Membership Duration */}
                    <div className="flex items-center gap-4">
                      <p>Membership Duration</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Radio.Group
                            value={formData.paymentPlan.durationType}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                paymentPlan: {
                                  ...formData.paymentPlan,
                                  durationType: e.target.value,
                                },
                              })
                            }
                          >
                            <Radio value="ongoing">Ongoing</Radio>
                            <Radio value="limited">Limited</Radio>
                          </Radio.Group>
                        </div>
                        {formData.paymentPlan.durationType === "limited" && (
                          <Input className="w-20" suffix="days" />
                        )}
                      </div>
                    </div>

                    <hr className="border-gray-500 w-full" />

                    {/* Expire Benefits */}
                    <div className="flex flex-col gap-4">
                      <p>Expire benefits after Membership Ends</p>
                      <Radio.Group
                        value={formData.paymentPlan.expireBenefits}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentPlan: {
                              ...formData.paymentPlan,
                              expireBenefits: e.target.value,
                            },
                          })
                        }
                        className="flex flex-row"
                      >
                        <Radio value="never">
                          Never expire limited benefits
                        </Radio>
                        <Radio value="immediately">Immediately</Radio>
                        <Radio value="after">
                          Expires in <Input className="w-20 mx-2" /> days
                        </Radio>
                      </Radio.Group>
                    </div>

                    <hr className="border-gray-500 w-full" />

                    {/* Employee Commission */}
                    <div className="flex items-center  gap-4">
                      <p>Employee Commission</p>
                      <div>
                        <Select
                          value={formData.paymentPlan.interval}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              paymentPlan: {
                                ...formData.paymentPlan,
                                interval: value,
                              },
                            })
                          }
                          className="max-w-55"
                        >
                          <Select.Option value="none">None</Select.Option>
                          <Select.Option value="percentage">
                            Percentage
                          </Select.Option>
                          <Select.Option value="amount">Amount</Select.Option>
                        </Select>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Input className="w-32" suffix="%" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentPage === 2 && (
              <>
                <h2 className="text-2xl font-bold text-blue-500 mb-4">
                  Payment Plan Freeze Period Options
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  Freezing Payment Plans allows customers to take a break from
                  their Membership Plan. Configure Payment Plan freeze settings
                  here.
                </p>

                <div className="w-full max-w-3xl space-y-6">
                  <div className="flex items-center gap-4">
                    <p>Can this plan be frozen?</p>
                    <Switch
                      checked={formData.paymentPlan.canFreeze}
                      onChange={(checked) =>
                        setFormData({
                          ...formData,
                          paymentPlan: {
                            ...formData.paymentPlan,
                            canFreeze: checked,
                          },
                        })
                      }
                    />
                  </div>

                  {formData.paymentPlan.canFreeze && (
                    <>
                      <div className="flex items-center gap-4">
                        <p>Price Of Plan During Freeze Period</p>
                        <div className="flex gap-2 items-center">
                          <span>$</span>
                          <Input className="w-32" />
                          <span>(USD)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <p>Continue to accrue benefits while plan is frozen?</p>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">No</span>
                          <Switch
                            checked={formData.paymentPlan.freezeAccrueBenefits}
                            onChange={(checked) =>
                              setFormData({
                                ...formData,
                                paymentPlan: {
                                  ...formData.paymentPlan,
                                  freezeAccrueBenefits: checked,
                                },
                              })
                            }
                          />
                          <span className="text-gray-500">Yes</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <p>
                          Continue to redeem earned benefits while plan is
                          frozen?
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">No</span>
                          <Switch
                            checked={formData.paymentPlan.freezeRedeemBenefits}
                            onChange={(checked) =>
                              setFormData({
                                ...formData,
                                paymentPlan: {
                                  ...formData.paymentPlan,
                                  freezeRedeemBenefits: checked,
                                },
                              })
                            }
                          />
                          <span className="text-gray-500">Yes</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {currentPage === 3 && (
              <>
                <h2 className="text-2xl font-bold text-blue-500 mb-4">
                  Sell this Plan Online?
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  If so, provide a meaningful description and terms so they can
                  make an informed purchase decision.
                </p>

                <div className="w-full max-w-3xl space-y-6">
                  <div className="flex items-center gap-4">
                    <p>Can this plan be frozen?</p>
                    <Switch
                      checked={formData.paymentPlan.canFreeze}
                      onChange={(checked) =>
                        setFormData({
                          ...formData,
                          paymentPlan: {
                            ...formData.paymentPlan,
                            canFreeze: checked,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </>
            )}
            {currentPage === 4 && (
              <>
                <h2 className="text-2xl font-bold text-blue-500 mb-4">
                  <span className="text-gray-700">
                    {formData.membershipName}
                  </span>{" "}
                  Payment Plan
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  Existing Benefit Sets can be updated or deleted. You
                  <br />
                  can also add a new Benefit Set.
                </p>

                <div className="w-full max-w-3xl">
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-4">
                      {/* Active Status */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Active</span>
                        <span className="text-gray-600">No</span>
                        <Switch defaultChecked />
                        <span className="text-gray-600">Yes</span>
                      </div>

                      {/* Payment Amount */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">$40.00/Monthly</span>
                      </div>

                      {/* Ongoing Icon */}
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600">Ongoing</span>
                      </div>

                      {/* Initiation Fee */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Initiation $2.00</span>
                      </div>

                      {/* Freeze Status */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Can Not Be Frozen</span>
                      </div>

                      {/* Online Status */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Not Sold Online</span>
                      </div>

                      {/* Expiry Date */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">12/25/2024</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-auto">
                        <button className="text-gray-500 hover:text-gray-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center justify-center p-20">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">
              Congratulations!!!
            </h2>
            <p className="text-gray-600 text-center mb-8">
              You've completed the <span>{formData.membershipName}</span>{" "}
              Membership Plan.
            </p>

            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>General Settings</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Benefit Sets</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Payment Plan</span>
              </div>
              <div className="flex items-center justify-center mt-8 mb-4">
                <img
                  src="/images/pngFiles/woman_in_monitor_giving_present.png"
                  alt="Congratulations"
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
            <Link href="/dashboard/membership-plan">
              <Button
                type="primary"
                size="large"
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  /* Add view plans handler */
                }}
              >
                View Plans
              </Button>
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formData}
        >
          {/* Tab Content */}
          <div className="min-h-[400px]">{renderTabContent()}</div>
          <NavigationButtons />
        </Form>
      </div>
    </div>
  );
}

export default AddMemBtnPage;
