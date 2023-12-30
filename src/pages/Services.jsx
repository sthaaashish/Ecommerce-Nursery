
import {
  faSeedling,
  faMountainSun,
  faPersonDigging,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FadeIn from "../Components/Fade";

 const serviceData = [
  {
    id: 1,
    serviceIcon: faTree,
    title: " Gardening & Lawn Services",
    detail:
      "Our gardening and lawn services encompass a wide range of tasks,including planting, mulching, weeding, mowing, and irrigation system maintenance, to provide you with a lush, well-maintained lawn and garden that you can enjoy year-round.",
  },
  {
    id: 2,
    serviceIcon: faSeedling,
    title: "Seeds & Fertilizers",
    detail:
      " Our plant nursery offers a wide range of high-quality seeds and effective fertilizers to support healthy plant growth and enhance the beauty of your garden or landscape.",
  },
  {
    id: 3,
    serviceIcon: faMountainSun,
    title: "LandScape Desgining",
    detail:
      " Transform your outdoor space into a stunning oasis with our landscape designing services, where our experienced team combines creativity, expertise, and attention to detail to create personalized designs that reflect your vision and enhance the beauty of your surroundings.",
  },
  {
    id: 4,
    serviceIcon: faPersonDigging,
    title: " Garden Maintenance",
    detail:
      "Our professional garden maintenance services ensure that your outdoor space stays vibrant and well-cared for, with expert pruning, trimming, watering, and regular upkeep to keep your plants healthy and your garden looking its best",
  },
];

 const OurServices = () => {
  return (
    <div className="p-4 mt-12 md:px-8">
      <h1 className="text-center text-3xl text-green-800 mb-6">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {serviceData.map((data,index)=>(
          <div key={index}>
            <FadeIn  delay={index * 0.2} direction={"up"}>
              <div className="grid">
                <FontAwesomeIcon icon={data.serviceIcon} className="mx-auto text-green-700 p-2"   size="4x"/>
                <h1 className="text-center text-xl mt-2">{data.title}</h1>
                <p className="text-center text-sm">{data.detail}</p>
              </div>
            </FadeIn>
            </div>
        ))}
    </div>
    </div>
  );
};
export default OurServices;




