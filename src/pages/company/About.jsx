// About.js
import React from 'react';

const About = () => {
  return (
    <div className="p-8 md:flex gap-10">
      <div>
        <img
         src='https://images.unsplash.com/photo-1613375772563-af532af5cef9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxhbnQlMjBzaG9wfGVufDB8fDB8fHww'
         className='rounded-md'/>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-bold mt-4 mb-6">About Our Pipal Nursery</h1>
        <p className="text-lg mb-4">
          Welcome to our Pipal nursery, where we cultivate and care for a diverse
          collection of beautiful plants. Our passion is to provide you with
          high-quality plants that bring joy and beauty to your homes and
          gardens.
        </p>
        <p className="text-lg mb-4">
          Our team of dedicated horticulturists and plant enthusiasts work
          tirelessly to ensure that each plant is healthy, vibrant, and ready to
          thrive in its new environment.
        </p>
        <p className="text-lg mb-4">
          Whether you're a seasoned gardener or just starting, we have a wide
          variety of plants to suit every taste and level of expertise. Feel
          free to explore our collection and discover the perfect plants for
          your space.
        </p>
        <p className="text-lg mb-4">
          Thank you for choosing our nursery. We look forward to being a part
          of your plant journey.
        </p>
      </div>
    </div>
  );
};

export default About;
