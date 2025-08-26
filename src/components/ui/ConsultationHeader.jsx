import React from 'react';
import Icon from '../AppIcon';

const ConsultationHeader = ({ progress = 0, onExit }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-foreground"
            >
              <path
                d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                fill="currentColor"
              />
              <path
                d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
                fill="currentColor"
                opacity="0.7"
              />
              <path
                d="M5 6L5.5 8.5L8 9L5.5 9.5L5 12L4.5 9.5L2 9L4.5 8.5L5 6Z"
                fill="currentColor"
                opacity="0.7"
              />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">LIA</h1>
            <p className="text-xs text-muted-foreground">Clinic Diagnostics</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex items-center space-x-4">
          {progress > 0 && (
            <div className="hidden sm:flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">Progress</span>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {Math.round(progress)}%
              </span>
            </div>
          )}

          {/* Mobile Progress Indicator */}
          {progress > 0 && (
            <div className="sm:hidden">
              <div className="w-8 h-8 relative">
                <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 14}`}
                    strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
                    className="text-primary transition-all duration-300 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground">
                    {Math.round(progress)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Exit Button */}
          {onExit && (
            <button
              onClick={onExit}
              className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
              aria-label="Exit consultation"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ConsultationHeader;