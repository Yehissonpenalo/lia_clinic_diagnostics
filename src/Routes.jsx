import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AiConsultationInterface from "pages/ai-consultation-interface";
import UserProfileManagement from "pages/user-profile-management";
import AdminAnalyticsDashboard from "pages/admin-analytics-dashboard";
import ReportPreviewPurchase from "pages/report-preview-purchase";
import AdminContentManagement from "pages/admin-content-management";
import FullReportDashboard from "pages/full-report-dashboard";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<AiConsultationInterface />} />
        <Route path="/ai-consultation-interface" element={<AiConsultationInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="/admin-analytics-dashboard" element={<AdminAnalyticsDashboard />} />
        <Route path="/report-preview-purchase" element={<ReportPreviewPurchase />} />
        <Route path="/admin-content-management" element={<AdminContentManagement />} />
        <Route path="/full-report-dashboard" element={<FullReportDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;