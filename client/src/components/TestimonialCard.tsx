import { Testimonial } from "@/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
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
