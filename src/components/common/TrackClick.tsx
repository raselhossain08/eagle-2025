/**
 * Track Click Component
 * Wrapper component to track click events
 */

'use client';

import React from 'react';
import { useAnalytics } from '@/hooks/use-analytics';

interface TrackClickProps {
  children: React.ReactNode;
  eventName: string;
  eventCategory?: string;
  eventAction?: string;
  properties?: Record<string, any>;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

export function TrackClick({
  children,
  eventName,
  eventCategory = 'user_interaction',
  eventAction = 'click',
  properties,
  className,
  as: Component = 'div',
  ...props
}: TrackClickProps) {
  const { trackEvent } = useAnalytics();

  const handleClick = (e: React.MouseEvent) => {
    trackEvent(eventName, eventCategory, eventAction, {
      eventLabel: eventName,
      properties: {
        ...properties,
        target: (e.target as HTMLElement).tagName,
        timestamp: new Date().toISOString()
      }
    });

    // Call original onClick if provided
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Component
      {...props}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
}

export default TrackClick;
