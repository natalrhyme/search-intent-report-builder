
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HelpGuideProps {
  onClose: () => void;
}

const HelpGuide = ({ onClose }: HelpGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Report Builder",
      description: "This guide will help you create custom reports with GSC data and search intent analysis.",
      content: (
        <div className="space-y-3">
          <p>
            The Search Intent Report Builder allows you to create custom reports by combining Google Search Console data with AI-powered search intent analysis.
          </p>
          <p>
            In just a few simple steps, you'll be able to create insightful reports that help you understand what your visitors are really looking for.
          </p>
        </div>
      ),
    },
    {
      title: "Step 1: Select GSC Property",
      description: "Choose which property you want to analyze.",
      content: (
        <div className="space-y-3">
          <p>
            First, select the Google Search Console property you want to analyze from the dropdown at the top of the page.
          </p>
          <p>
            The report will automatically load the latest data for that property once selected.
          </p>
        </div>
      ),
    },
    {
      title: "Step 2: Drag & Drop Data Blocks",
      description: "Build your report by adding data blocks.",
      content: (
        <div className="space-y-3">
          <p>
            The left panel contains drag-and-drop data blocks that you can add to your report.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Choose from metrics like Clicks, Impressions, CTR, and Position</li>
            <li>Select different time periods for your metrics</li>
            <li>Add AI-powered intent analysis to understand search intent</li>
          </ul>
          <p>
            Simply drag the blocks you want into the report area on the right.
          </p>
        </div>
      ),
    },
    {
      title: "Step 3: Analyze Intent",
      description: "Add AI-powered intent analysis to your report.",
      content: (
        <div className="space-y-3">
          <p>
            When you add the "User Intent" or "Content Category" blocks to your report, the system will automatically analyze your search queries.
          </p>
          <p>
            The Gemini API looks at each query and determines:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>What the user is really trying to find (intent)</li>
            <li>What type of content would best satisfy that intent (category)</li>
          </ul>
          <p>
            This helps you create more targeted content that matches user expectations.
          </p>
        </div>
      ),
    },
    {
      title: "Step 4: Export Your Report",
      description: "Save your insights in CSV or Google Sheets.",
      content: (
        <div className="space-y-3">
          <p>
            Once you've built your report, you can export it for further analysis or sharing.
          </p>
          <p>
            Click the "Export" button on the report to save your data as a CSV file or send it to Google Sheets.
          </p>
          <p>
            You can also reset your report at any time to start fresh.
          </p>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{currentStepData.title}</CardTitle>
          <CardDescription>{currentStepData.description}</CardDescription>
        </CardHeader>
        <CardContent>{currentStepData.content}</CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Skip Guide
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HelpGuide;
