import React, { useEffect, useState } from "react";
import Avatar from "./avatar";
import "./avatar.css";
import spinner from './giphy.gif'

const AvatarContainer = ({ name, size, color, fontColor, img, borderRadius }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Initials = async () => {
      try {
        name = name || "";
        size = size || 60;

        let colours = ["#711c91", '#ea00d9', '#0abdc6', '#133e7c', '#091833', '#091833'];
        let nameSplit = String(name).toUpperCase().split(" ");
        let initials;
        let colourIndex;
        let canvas;
        let context;
        let dataURI;

        let _initials = name.match(/\b\w/g) || [];
        _initials = (
          (_initials.shift() || "") + (_initials.pop() || "")
        ).toUpperCase();

        if (nameSplit.length === 1) {
          initials = nameSplit[0] ? nameSplit[0].charAt(0) : "?";
        } else {
          initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
        }

        if (window.devicePixelRatio) {
          size = size * window.devicePixelRatio;
        }
        colourIndex = initials !== "" ? name.charCodeAt(0) % colours.length : 0;
        canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        context = canvas.getContext("2d");

        context.fillStyle = color ? color : colours[colourIndex];
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = Math.round(canvas.width / 2) + "px System    ";
        context.textAlign = "center";
        context.fontWeight = "bold";
        context.fillStyle = fontColor ? fontColor : 'white';
        context.fillText(_initials, size / 2, size / 1.5);

        dataURI = canvas.toDataURL();
        canvas = null;
        setData(dataURI);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    if (img) {
        setLoading(false);
    }else{
        Initials();
    }
  }, []);

  if (loading) return <Avatar src={spinner} name={name} size={size} />;
  if (error) return <h1>Error!</h1>;
  if (img) return <Avatar src={img} name={name} size={size} />;
  return <Avatar src={data} name={name} size={size} borderRadius={borderRadius}/>;
};

export default AvatarContainer;
