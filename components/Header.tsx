import React from 'react';
import { Promotion } from '../types';

interface HeaderProps {
  selectedPromotion: Promotion | null;
  onBack: () => void;
}

const logoUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAReSURBVHhe7ZxLy9RVFMf7s5mJSEYiIxNJiIzEyEggpZESIqFESAhJGCEpZSUskpSMjEQiIxNJzIQhZSUskpGIjJgZCWEmIzP+b93X+X3e973vfffe9/2+517rXGfvc5+z9tprr7X2LgAJSUlJSUlJSUlJSf/LgAfAGeBIcBp4CVwGdoBlYCgwdq+7wJ7gNvAXeAg8A3YCAw/M8S4FjgEHgSPASeA0sA7MAsP+sBvAF8C+f/84fL4BPAOGZngXgZPAaWAU+BM4AwwA9z0sB4C/wEbgv3+fB84BwzM8hYFDwE5gDTACfAzsAPa6WAsg4H/gIHBd8N8/DgwBwzM8BZYBl4A9wGngdGAWsAfsdLEaQMAz4Hfgsv+/n5wAxma4lAEngefAEmAK+BHYAeR0sQpAQC/wJXBZ+N8/DQwBwzM8BZYBl4AFwHFgLDAJXO1tPQD8DzwE7gr++4eBkRluJcAh4AewDkwC9wA9T9sBEPAG+BU4L/jvPwoMAMEzPAlsBDoBXYA3wFhgfL7X1QIg4GngT+C88N9/FBgBhme4BDgCvAEWAaOBM8Ap4KCr1QAIeB/4Ezgv/O8fBAYAYZmeBDYCdQI6AG+AscD4fK+rBUDA08CfwHnhv/8oMAIMz3AJsA54A7gGDAE3gQPAKOBgrxYAAf8GfgiuC//7h4HhGZ4ExgM7AR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIdneAocAO4B1wBDwE3gGPAQ8KCrFQAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAoYBG4C1wBDwE3gOPAQuM+FagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAoYBG4C1wBDwE3gOPAQuM+FagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAoYBG4C1wBDwE3gOPAQuM+FagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAoYBG4C1wBDwE3gOPAQuM+FagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAoYBG4C1wBDwE3gOPAQuM+FagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAoYBG4C1wBDwE3gOPAQuM+FagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAoYBG4C1wBDwE3gOPAQuM+FagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAoYBG4C1wBDwE3gOPAQuM+FagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAocA+4C1wBDwE3gPPAQeN+lagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAoYBG4B1wBDwE3gPPAQuM+FagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAoYBG4B1wBDwE3gPPAQuM+FagAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAocAu4C1wBDwE3gGPAQ+N+lKgAAvwN/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAocAu4C1wBDwE3gGPAQ+N+lKgAAPwR/BPcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAocAu4C1wBDwE3gGPAQ+N+lKgAAPwR/BNcF//3DwPAMTwLDgR2AN8BYYHy+19UCIOBp4E/gvPC/fxgYAIZneAp8CtwFrgGHgJvAseAh8L9L/QWSkpKSkpKSkpKSkpJ+kf4Fx2rTsqSgD7IAAAAASUVORK5CYII=';

const Header: React.FC<HeaderProps> = ({ selectedPromotion, onBack }) => {
  const title = selectedPromotion ? `${selectedPromotion} Fights` : 'Upcoming MMA Fights';
  const subtitleText = selectedPromotion ? 'Live Data via Google Search' : 'app by Automation.go';
  const subtitleIsBranded = !selectedPromotion;

  return (
    <header className="bg-[#44444E]/30 backdrop-blur-sm border-b border-[#37353E]/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          {selectedPromotion && (
            <button 
              onClick={onBack}
              className="flex items-center text-[#D3DAD9] hover:text-white transition-colors duration-200 group"
              aria-label="Go back to promotions list"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="ml-1 font-semibold">Back</span>
            </button>
          )}
        </div>
        <div className="flex-1 text-center">
            {!selectedPromotion && (
              <img src={logoUrl} alt="Automation.go Logo" className="h-10 mx-auto mb-2" />
            )}
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D3DAD9] to-[#b0b8b7] tracking-tight uppercase">
              {title}
            </h1>
            <p className={`text-center text-[#715A5A] text-sm mt-1 font-bold tracking-widest ${!subtitleIsBranded && 'uppercase'}`}>
              {subtitleText}
            </p>
        </div>
        <div className="flex-1"></div>
      </div>
    </header>
  );
};

export default Header;