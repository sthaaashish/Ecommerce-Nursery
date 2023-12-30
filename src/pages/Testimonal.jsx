import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';


const testimonials = [
    {
      content: "I've been a plant enthusiast for years, and this website has truly elevated my indoor oasis. The quality of plants and the variety available is unmatched. My living space has transformed into a green paradise thanks to the beautiful plants I found here!",
      author: "Bonnie Green",
      role: "Manager of New Garden",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
    },
    
    {
      content:
      "Bringing nature indoors has never been easier! The plant collection on this website is not only diverse but also of top-notch quality. My home feels like a breath of fresh air, and I'm grateful for the excellent service and care put into delivering these beautiful plants.",
      author: "Jese Leos",
      role: "Manager at Ktm Resort",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
    },
    
    {
        content:
        "I've always believed in the power of plants to reduce stress and create a calming atmosphere. This website exceeded my expectations with its range of stress-relieving plants. My home office is now a tranquil space, thanks to the green companions I found here.",
        author: "Joseph McFall",
        role: "CEO AG Palace",
        image:
          "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png",
      },
      {
        content:
        "Shopping for plants on this website was a breeze. The user-friendly interface, detailed product descriptions, and helpful customer reviews made it easy to choose the perfect plants for my space. The plants arrived promptly and in great condition.",
        author: "Jese Leos",
        role: "CTO at NepTech",
        image:
          "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png",
      },
      {
        content:
        "I recently purchased a variety of plants from this website, and I couldn't be happier with my decision. The plants arrived in perfect condition, and the customer service was excellent. I highly recommend this site for all plant lovers.",
        author: "Roberta Casas",
        role: "Owner of ARR Villa",
        image:
          "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
      },
  ];


  const TestimonialCards = () => {
  
    const settings = {
       dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive:[
      {breakpoint:850,
      settings:{
        slidesToShow:1
      }}]
    };
  
    return (
      <div className='px-6 mt-8'>
      <div>
        <h1 className='text-center text-3xl text-green-800 mb-4'>Testimonal</h1>
      </div>
        <Slider {...settings} className="mb-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <Card
                shadow={false}
                className="w-full   shadow-lg md:max-w-[26rem] mx-auto max-w-full bg-teal-700 text-white"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="mx-0 flex items-center gap-4 p-4  pt-0  bg-teal-700 text-white"
                  
                >
                  <h1>&quot;{testimonial.content} !!!&quot;</h1>
                </CardHeader>
                <CardBody className="mx-0 flex items-center gap-4 pt-0 pb-6">
                  <Avatar
                    size="lg"
                    variant="circular"
                    alt="tania andrew"
                    src={testimonial.image}
                  />
                  <div className="flex w-full flex-col gap-0.5 text-white">
                    <div className="flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray text-white">
                        {testimonial.author}
                      </Typography>
                    </div>
                    <Typography color="text-white blue-gray">{testimonial.role}</Typography>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </Slider>
  
        
      </div>
    );
  };
  
  export default TestimonialCards;