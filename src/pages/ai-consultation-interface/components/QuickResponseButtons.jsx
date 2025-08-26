import React from 'react';
import Button from '../../../components/ui/Button';

const QuickResponseButtons = ({ options = [], onSelect, disabled = false }) => {
  if (!options.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(option)}
          disabled={disabled}
          className="text-xs"
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default QuickResponseButtons;