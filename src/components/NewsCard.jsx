import React from "react";

const NewsCard = ({ article }) => {
  // Destructure article properties for easier access
  const {
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    source,
    category,
    author
  } = article;

  // Helper function to format dates nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Different colors for different categories
  const getCategoryColor = (category) => {
    const colorMap = {
      business: "badge-primary",
      entertainment: "badge-secondary",
      general: "badge-accent",
      health: "badge-success",
      science: "badge-info",
      sports: "badge-warning",
      technology: "badge-error",
    };
    return colorMap[category] || "badge-neutral";
  };

  // Utility to truncate long text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Article image section */}
      <figure className="relative h-48 overflow-hidden">
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback image if the original fails to load
              e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full h-full bg-base-300 flex items-center justify-center">
            <span className="text-base-content/50">No Image Available</span>
          </div>
        )}
        
        {/* Category badge in top-left corner */}
        {category && (
          <div className="absolute top-3 left-3">
            <div className={`badge ${getCategoryColor(category)} badge-sm font-medium`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          </div>
        )}

        {/* Live status indicator */}
        <div className="absolute top-3 right-3">
          <div className="badge badge-success badge-sm">
            Live
          </div>
        </div>
      </figure>

      <div className="card-body p-4">
        {/* Article title */}
        <h2 className="card-title text-base font-semibold mb-2 leading-tight">
          {truncateText(title, 80)}
        </h2>

        {/* Article description */}
        {description && (
          <p className="text-sm text-base-content/70 mb-3 leading-relaxed">
            {truncateText(description, 120)}
          </p>
        )}

        {/* Show author if available */}
        {author && (
          <div className="text-xs text-base-content/60 mb-2">
            <span className="font-medium">By:</span> {truncateText(author, 30)}
          </div>
        )}

        {/* Source and publication date */}
        <div className="flex items-center justify-between text-xs text-base-content/60 mb-4 pt-2 border-t border-base-300">
          <div className="flex items-center gap-1">
            {/* Info icon */}
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{source?.name || "Unknown Source"}</span>
          </div>
          <div className="flex items-center gap-1">
            {/* Calendar icon */}
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{formatDate(publishedAt)}</span>
          </div>
        </div>

        {/* Read more button */}
        <div className="card-actions justify-end">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm gap-1"
          >
            {/* External link icon */}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Read Full Article
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
