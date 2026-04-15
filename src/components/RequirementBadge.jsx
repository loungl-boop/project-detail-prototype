import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const RequirementBadge = ({ id, title, content, targetRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isOverflowing, setIsOverflowing] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (isOpen && targetRef?.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipWidth = 450;
      const tooltipHeight = 450;
      const padding = 16;

      let top = targetRect.bottom + padding;
      let left = targetRect.right - tooltipWidth;

      if (left < padding) left = padding;
      if (top + tooltipHeight > window.innerHeight - padding) {
        top = targetRect.top - tooltipHeight - padding;
      }
      if (top < padding) {
        top = padding;
      }
      if (left + tooltipWidth > window.innerWidth - padding) {
        left = window.innerWidth - tooltipWidth - padding;
      }

      setPosition({ top, left });
      setIsOverflowing(top + tooltipHeight > window.innerHeight);
    }
  }, [isOpen, targetRef]);

  useEffect(() => {
    if (isOpen && tooltipRef.current && isOverflowing) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const padding = 16;

      if (tooltipRect.bottom > viewportHeight - padding) {
        const newTop = viewportHeight - tooltipRect.height - padding;
        const minTop = padding;
        setPosition(prev => ({
          ...prev,
          top: Math.max(minTop, newTop)
        }));
      }
    }
  }, [isOpen, isOverflowing, position]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newLeft = e.clientX - dragOffset.x;
      const newTop = e.clientY - dragOffset.y;
      const padding = 16;
      const constrainedLeft = Math.max(padding, Math.min(newLeft, window.innerWidth - 450 - padding));
      const constrainedTop = Math.max(padding, Math.min(newTop, window.innerHeight - 450 - padding));
      setPosition({ left: constrainedLeft, top: constrainedTop });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const renderMarkdown = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('### ')) {
        return <h4 key={index} className="text-base font-semibold text-gray-900 mt-4 mb-2">{line.slice(4)}</h4>;
      }
      if (line.startsWith('#### ')) {
        return <h5 key={index} className="text-sm font-semibold text-gray-800 mt-3 mb-1">{line.slice(5)}</h5>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold text-gray-900 mb-2">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 mb-1 text-gray-700">{line.slice(2)}</li>;
      }
      if (line.startsWith('1. ')) {
        return <li key={index} className="ml-4 mb-1 list-decimal text-gray-700">{line.slice(3)}</li>;
      }
      if (line.startsWith('> ')) {
        return <blockquote key={index} className="border-l-4 border-gray-300 pl-4 py-1 my-2 text-gray-600 italic">{line.slice(2)}</blockquote>;
      }
      if (line.startsWith('| ')) {
        return null;
      }
      if (line.includes('---')) {
        return <hr key={index} className="my-3 border-gray-300" />;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-2 text-gray-700 leading-relaxed">{line}</p>;
    });
  };

  const tooltipContent = isOpen ? (
    <div
      ref={tooltipRef}
      className="fixed bg-[#f0efef] rounded-lg shadow-xl z-[9999] flex flex-col p-4"
      style={{
        width: '450px',
        maxHeight: '80vh',
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <div 
        className="flex justify-between items-start mb-3 pb-2 border-b border-gray-300 cursor-move flex-shrink-0 -mt-1 -mx-1 px-1"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block align-top"
            style={{
              backgroundColor: 'rgb(250, 173, 20)',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
              lineHeight: '14px',
              padding: '0px 4px',
              borderRadius: '2px'
            }}
          >
            {id}
          </span>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        <button
          className="text-gray-400 hover:text-gray-600 text-lg font-bold"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          ×
        </button>
      </div>

      <div
        className="text-sm text-gray-700 leading-relaxed overflow-y-auto flex-1 -mx-1 px-1"
        style={{ lineHeight: '1.6', paddingRight: '4px' }}
      >
        {renderMarkdown(content)}
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        className="inline-block align-top cursor-pointer"
        style={{
          backgroundColor: 'rgb(250, 173, 20)',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold',
          lineHeight: '14px',
          padding: '0px 4px',
          borderRadius: '2px',
          border: 'none',
          position: 'absolute',
          top: '-8px',
          right: '-4px',
          zIndex: 1000
        }}
        onMouseEnter={() => setIsOpen(true)}
        onClick={(e) => e.stopPropagation()}
      >
        {id}
      </div>

      {isOpen && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default RequirementBadge;
