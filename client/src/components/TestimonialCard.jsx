import PropTypes from "prop-types";

export default function TestimonialCard({ testimonial }) {
  const { name, initials, rating, comment, avatarBg } = testimonial;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex items-center mb-4">
        <div className={`h-12 w-12 rounded-full ${avatarBg} flex items-center justify-center mr-4`}>
          <span className="font-poppins font-medium text-lg">{initials}</span>
        </div>
        <div>
          <h4 className="font-poppins font-medium">{name}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <i key={i} className="ri-star-fill text-yellow-400"></i>
            ))}
          </div>
        </div>
      </div>
      <p className="text-neutral-600">❝{comment}❞</p>
    </div>
  );
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    avatarBg: PropTypes.string.isRequired
  }).isRequired
}; 