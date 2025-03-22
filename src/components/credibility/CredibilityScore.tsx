
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CredibilityScoreCardProps } from '@/types';

const CredibilityScore = ({ score, history }: CredibilityScoreCardProps) => {
  // Determine the color and status based on the score
  const getColorClass = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColorClass = (score: number) => {
    if (score >= 90) return "bg-green-600";
    if (score >= 75) return "bg-emerald-600";
    if (score >= 60) return "bg-blue-600";
    if (score >= 40) return "bg-amber-600";
    return "bg-red-600";
  };

  const getStatusText = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 40) return "Needs Improvement";
    return "Poor";
  };

  const getStatusBadgeClass = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 75) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (score >= 60) return "bg-blue-100 text-blue-800 border-blue-200";
    if (score >= 40) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getTurnupLikelihood = (score: number) => {
    if (score >= 90) return "Very High";
    if (score >= 75) return "High";
    if (score >= 60) return "Moderate";
    if (score >= 40) return "Low";
    return "Very Low";
  };

  const renderStars = (score: number) => {
    const stars = Math.round(score / 20);
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-4 h-4 mr-0.5", 
              i < stars ? getColorClass(score) : "text-gray-300"
            )} 
            fill={i < stars ? "currentColor" : "none"} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-lg border p-3 shadow-sm bg-card text-card-foreground hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Credibility Score</h3>
        <Badge variant="outline" className={cn("border font-medium", getStatusBadgeClass(score))}>
          {getStatusText(score)}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <span className={cn("text-xl font-bold", getColorClass(score))}>{score}%</span>
        {renderStars(score)}
      </div>
      
      <Progress 
        value={score} 
        className="h-2 mb-3" 
        indicatorClassName={getProgressColorClass(score)}
      />
      
      <div className="text-sm flex items-center mt-2">
        <AlertTriangle className="w-4 h-4 mr-1 text-muted-foreground" />
        <span className="text-muted-foreground">
          Turnup Likelihood: <span className={getColorClass(score)}>{getTurnupLikelihood(score)}</span>
        </span>
      </div>
      
      {history && (
        <div className="mt-3 pt-3 border-t text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Bookings:</span>
            <span className="font-medium">{history.totalBookings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center">
              <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
              Completed Stays:
            </span>
            <span className="font-medium">{history.completedStays}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center">
              <XCircle className="w-3 h-3 mr-1 text-red-500" />
              Cancellations:
            </span>
            <span className="font-medium">{history.cancellations}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1 text-amber-500" />
              No-Shows:
            </span>
            <span className="font-medium">{history.noShows}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredibilityScore;
