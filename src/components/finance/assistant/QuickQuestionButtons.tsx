
import React from 'react';
import { Button } from "@/components/ui/button";

interface QuickQuestionButtonsProps {
  onQuickQuestionClick: (question: string, answer: string) => void;
  faqResponses: Record<string, string>;
}

const QuickQuestionButtons = ({ onQuickQuestionClick, faqResponses }: QuickQuestionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onQuickQuestionClick("I need emergency repairs", faqResponses["emergency"])}
      >
        Emergency Repairs
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onQuickQuestionClick("What's your timeline?", faqResponses["timeline"])}
      >
        Project Timeline
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onQuickQuestionClick("Do you offer financing?", faqResponses["financing"])}
      >
        Financing Options
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => {
          onQuickQuestionClick(
            "I'd like a free estimate", 
            "We'd be happy to provide a free estimate. <a href='/contact' class='text-stark-red font-semibold'>Click here</a> to fill out our quick form, or provide your address for a precise quote."
          );
        }}
      >
        Free Estimate
      </Button>
    </div>
  );
};

export default QuickQuestionButtons;
