import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import FadeIn from "./Fade";
const Footer = () => {
  const AboutUs = [
    "Tenzing chowk,Kapan",
    "Bhatkekopul,hadigau",
    "Chunikhel,budhanilkantha",
    "SundarBasti, BaluwaKhani",
  ];
  const Company = [
    {
      title: "About us",
      link: "/about",
    },
    {
      title: "Contact Us",
      link: "/contact",
    },
    {
      title: "Privacy & Policy",
      link: "/privacyandpolicy",
    },
    {
      title: "Refund Policy",
      link: "/refundpolicy",
    },
  ];

  const nav = useNavigate();
  return (
    <div className=" bg-teal-700 text-white min-h-screen p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        <div className="md:col-span-1">
          <h1 className="text-3xl mb-8">Pipal Nursery</h1>
          <p className="mb-8">
            Far far away, behind the word mountains, far from the countries.
          </p>
          <FadeIn direction={"up"} delay={0.2} padding fullWidth>
            <div className="flex justify-center gap-4 text-4xl text-white">
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faTiktok} />
              <FontAwesomeIcon icon={faInstagram} />
            </div>
          </FadeIn>
        </div>
        <div className="md:col-span-1">
          <h1 className="text-3xl mb-8">Store Location</h1>
          {AboutUs.map((about, index) => (
            <ul key={index} className="p-1">
              <li>{about}</li>
            </ul>
          ))}
        </div>
        <div className="md:col-span-1">
          <h1 className="text-3xl mb-8">Company</h1>
          {Company.map((Company, index) => (
            <ul key={index} className="p-1">
              <Link to={Company.link} className="cursor-pointer">{Company.title}</Link>
            </ul>
          ))}
        </div>
        <div className="md:col-span-1">
          <h1 className="text-3xl mb-8">Contact Us</h1>
          <ul>
            <li className="p-2">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              +977 9830843233, 9832848332
            </li>
            <li className="p-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 " />
              Email: pipalnursery@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center md:mt-20 p-8">
        <h5>© 2023 PipalNursery™ All Rights Reserved.</h5>
      </div>
    </div>
  );
};

export default Footer;
