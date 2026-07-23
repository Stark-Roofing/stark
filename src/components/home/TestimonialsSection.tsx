import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import googleReviewsData from '@/data/googleReviews.json';

interface GoogleReview {
  author: string;
  authorUrl: string | null;
  authorPhoto: string | null;
  rating: number;
  text: string;
  languageCode: string | null;
  publishTime: string | null;
  relativeTime: string | null;
}

interface GoogleReviewsData {
  fetchedAt: string | null;
  placeId: string | null;
  businessName: string;
  rating: number | null;
  userRatingCount: number | null;
  reviews: GoogleReview[];
  source: string;
}

const data = googleReviewsData as GoogleReviewsData;

const TestimonialsSection: React.FC = () => {
  const reviews = data.reviews ?? [];
  const hasRealReviews = reviews.length > 0;

  if (!hasRealReviews) {
    // Graceful fallback until the Google Places API fetch is wired in.
    // Renders nothing — no invented testimonials. Once the build script
    // populates googleReviews.json, real reviews appear here automatically.
    return null;
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title text-center">What Our Neighbors Say on Google</h2>
        <p className="section-subtitle text-center">
          {data.rating !== null && data.userRatingCount !== null ? (
            <>
              {data.rating.toFixed(1)} stars from {data.userRatingCount} Google reviews
            </>
          ) : (
            <>Real reviews from real Puget Sound homeowners</>
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="glass-card p-6 flex flex-col h-full animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-row space-x-1 text-yellow-400" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: Math.max(1, Math.min(5, review.rating)) }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-stark-red/20 rotate-180" />
                </div>

                <p className="text-charcoal/90 italic mb-4 flex-grow text-sm leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-auto">
                <div className="flex items-center gap-3">
                  {review.authorPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.authorPhoto}
                      alt={review.author}
                      className="w-8 h-8 rounded-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-stark-red/10 text-stark-red font-bold flex items-center justify-center text-sm">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-navy text-sm truncate">{review.author}</h4>
                    {review.relativeTime && (
                      <p className="text-xs text-charcoal/60">{review.relativeTime} · Google</p>
                    )}
                  </div>
                  {review.authorUrl && (
                    <a
                      href={review.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-charcoal/50 hover:text-stark-red"
                      aria-label="View original review on Google"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-charcoal/50 mt-8">
          Reviews pulled directly from our Google Business Profile. Last updated{' '}
          {data.fetchedAt ? new Date(data.fetchedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'recently'}.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
