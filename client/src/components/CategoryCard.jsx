import PropTypes from "prop-types";
import { Link } from "wouter";

export default function CategoryCard({ category }) {
  const { id, name, image } = category;

  return (
    <Link href={`/catalog?category=${id}`} className="group">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 group-hover:shadow-lg h-40 md:h-56">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white font-poppins font-medium text-lg md:text-xl">{name}</h3>
        </div>
      </div>
    </Link>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
}; 