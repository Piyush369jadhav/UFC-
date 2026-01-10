import React from 'react';
import { Source } from '../types';

interface SourceLinksProps {
  sources: Source[];
}

const SourceLinks: React.FC<SourceLinksProps> = ({ sources }) => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 md:mb-8 p-4 bg-[#44444E]/30 backdrop-blur-sm border border-[#37353E]/50 rounded-lg">
      <h3 className="text-sm font-semibold text-[#D3DAD9] mb-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        Information sourced from Google Search:
      </h3>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#D3DAD9] hover:text-white hover:underline transition-colors duration-200"
              aria-label={`Source: ${source.title}`}
            >
              {new URL(source.uri).hostname}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SourceLinks;