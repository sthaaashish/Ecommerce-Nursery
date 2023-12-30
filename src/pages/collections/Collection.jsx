import React from "react";
import FadeIn from "../../Components/Fade";

const Collection = () => {
  return (
    <div className="p-6">
      <h1 className="text-center mt-8 mb-4 text-green-700  text-3xl">
        Shop By Collections
      </h1>
      <div className="grid grid-cols-2 md:flex  justify-center gap-10 p-3 ">
        {collectionData.map((data,index) => {
          return (
            <FadeIn direction={"up"} delay={index * 0.2}>
            <div key={data.id} className="grid">
              <img src={data.image_data} className="h-[150px] w-[150px]" />
              <span className=" ">{data.title}</span>
            </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;

export const collectionData = [
  {
    id: 1,
    title: "Indoor Plants",
    image_data:
      "https://img.freepik.com/free-photo/monstera-deliciosa-plant-pot_53876-133119.jpg?size=626&ext=jpg&uid=R97202365&ga=GA1.2.56975038.1676625668&semt=sph",
  },
  {
    id: 2,
    title: "Outdoor Plants",
    image_data:
      "https://live-production.wcms.abc-cdn.net.au/7560708aeb99c7bd5ca6e701b5b81751?impolicy=wcms_crop_resize&cropH=485&cropW=862&xPos=0&yPos=0&width=862&height=485",
  },
  {
    id: 3,
    title: "Seasonal Plants",
    image_data:
      "https://img.freepik.com/free-photo/colorful-tulips-flower-pot_1373-278.jpg?size=626&ext=jpg&uid=R97202365&ga=GA1.2.56975038.1676625668&semt=ais",
  },
  {
    id: 4,
    title: "Flowering Plants",
    image_data:
      "https://img.freepik.com/free-photo/red-anthurium-plant-gray-pot_53876-134279.jpg?size=626&ext=jpg&uid=R97202365&ga=GA1.2.56975038.1676625668&semt=ais",
  },
  {
    id: 5,
    title: "Succulents and Cactus",
    image_data:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeSBmrLWtGISI1XR1D2IHpF86eJfu8dR866Q&usqp=CAU",
  },
  {
    id: 6,
    title: "Large Plants and Trees",
    image_data:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQFPSzEYm99Q94WogRTo1QRQNNn5ENNCgi5w&usqp=CAU",
  },
];
