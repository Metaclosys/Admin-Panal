"use client";
import React, { useState } from 'react';
import { Button, Radio } from 'antd';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

export default function MarketingSettings() {
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingWeb, setIsEditingWeb] = useState(false);

  const [settings, setSettings] = useState({
    socialLinks: {
      facebook: 'Facebook',
      instagram: 'Instagram',
      twitter: 'Twitter',
      pinterest: 'Pinterest'
    },
    emailMarketing: {
      showOptIn: 'Yes'
    },
    webToCustomer: {
      sendEmailOnSubmission: 'No',
      sendEmailTo: ''
    }
  });

  const renderSocialLinks = () => {
    if (isEditingSocial) {
      return (
        <div className="bg-white border rounded-lg mb-4">
          <div className="p-4">
            <h3 className="text-base font-medium">Social Links</h3>
            <div className="space-y-3 mt-4 mb-6">
              <div className="flex items-center gap-2">
                <FaFacebook className="text-blue-600" />
                <span>Facebook</span>
              </div>
              <div className="flex items-center gap-2">
                <FaInstagram className="text-pink-600" />
                <span>Instagram</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTwitter className="text-blue-400" />
                <span>Twitter</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPinterest className="text-red-600" />
                <span>Pinterest</span>
              </div>
            </div>
            <Button 
              type="link"
              className="text-blue-500 p-0"
            >
              Add Social Links
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border rounded-lg mb-4">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-base font-medium">Social Links</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
            onClick={() => setIsEditingSocial(true)}
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="p-4 pt-0 space-y-3">
          <div className="flex items-center gap-2">
            <FaFacebook className="text-blue-600" />
            <span>Facebook</span>
          </div>
          <div className="flex items-center gap-2">
            <FaInstagram className="text-pink-600" />
            <span>Instagram</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTwitter className="text-blue-400" />
            <span>Twitter</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPinterest className="text-red-600" />
            <span>Pinterest</span>
          </div>
        </div>
      </div>
    );
  };

  const renderEmailMarketing = () => {
    if (isEditingEmail) {
      return (
        <div className="bg-white border rounded-lg mb-4">
          <div className="p-4">
            <h3 className="text-base font-medium mb-4">Email Marketing Settings</h3>
            <div className="mb-6">
              <div className="mb-2">Show email marketing opt-in to Customers:</div>
              <Radio.Group 
                value={settings.emailMarketing.showOptIn === 'Yes' ? 'yes' : 'no'}
                onChange={e => setSettings({
                  ...settings,
                  emailMarketing: {
                    ...settings.emailMarketing,
                    showOptIn: e.target.value === 'yes' ? 'Yes' : 'No'
                  }
                })}
              >
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                className="border border-gray-300"
                onClick={() => setIsEditingEmail(false)}
              >
                Cancel
              </Button>
              <Button 
                type="primary"
                className="bg-[#0F172A]"
                onClick={() => setIsEditingEmail(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border rounded-lg mb-4">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-base font-medium">Email Marketing Settings</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
            onClick={() => setIsEditingEmail(true)}
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="p-4 pt-0">
          <div className="flex">
            <span className="flex-1">Show email marketing opt-in to Customers:</span>
            <span>{settings.emailMarketing.showOptIn}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderWebToCustomer = () => {
    if (isEditingWeb) {
      return (
        <div className="bg-white border rounded-lg">
          <div className="p-4">
            <h3 className="text-base font-medium mb-4">Web to Customer Settings</h3>
            <div className="space-y-4 mb-6">
              <div>
                <div className="mb-2">Send Email on Form Submission:</div>
                <Radio.Group 
                  value={settings.webToCustomer.sendEmailOnSubmission === 'Yes' ? 'yes' : 'no'}
                  onChange={e => setSettings({
                    ...settings,
                    webToCustomer: {
                      ...settings.webToCustomer,
                      sendEmailOnSubmission: e.target.value === 'yes' ? 'Yes' : 'No'
                    }
                  })}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </div>
              <div>
                <div className="mb-2">Send Email To:</div>
                <input 
                  type="text"
                  value={settings.webToCustomer.sendEmailTo}
                  onChange={e => setSettings({
                    ...settings,
                    webToCustomer: {
                      ...settings.webToCustomer,
                      sendEmailTo: e.target.value
                    }
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                className="border border-gray-300"
                onClick={() => setIsEditingWeb(false)}
              >
                Cancel
              </Button>
              <Button 
                type="primary"
                className="bg-[#0F172A]"
                onClick={() => setIsEditingWeb(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-base font-medium">Web to Customer Settings</h3>
          <Button 
            type="link" 
            className="text-blue-500 p-0 flex items-center gap-1 h-auto"
            onClick={() => setIsEditingWeb(true)}
          >
            <span className="text-blue-500">✏️</span>
            Edit
          </Button>
        </div>
        <div className="p-4 pt-0 space-y-2">
          <div className="flex">
            <span className="flex-1">Send Email on Form Submission:</span>
            <span>{settings.webToCustomer.sendEmailOnSubmission}</span>
          </div>
          <div className="flex">
            <span className="flex-1">Send Email To:</span>
            <span>{settings.webToCustomer.sendEmailTo}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-300 text-black rounded-lg p-6">
      {renderSocialLinks()}
      {renderEmailMarketing()}
      {renderWebToCustomer()}
    </div>
  );
} 