"use client";

import React, { useState } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import bunnyCry from "./animations/cry.gif";
import bunnyPlease from "./animations/cry1.gif";
import bunnyYes from "./animations/yes.gif";
import bunnyYes1 from "./animations/yes1.gif";
import bunnyPunch from "./animations/no.gif";
import Image from "next/image";
import Button from "./components/Button";

const getRandomPosition = () => {
  if (typeof window !== "undefined") {
    return {
      randomLeft: `${Math.random() * (window.innerWidth - 100)}px`,
      randomTop: `${Math.random() * (window.innerHeight - 50)}px`,
    };
  } else {
    return {
      randomLeft: "0px",
      randomTop: "0px",
    };
  }
};

function Home() {
  const [bunnyState, setBunnyState] = useState("normal");
  const [hovered, setHovered] = useState(false);
  const [randomPosition, setRandomPosition] = useState(getRandomPosition());
  const [hasStarted, setHasStarted] = useState(false);

  const bunnyObj: { [key: number]: string } = { 0: "cry", 1: "punch" };
  const handleHover = (hoverState: boolean) => {
    setHasStarted(true);
    if (hoverState === true) {
      setRandomPosition(getRandomPosition());
      const randomBunnyState = Math.floor(Math.random() * 2);
      setBunnyState(bunnyObj[randomBunnyState] as string);
    }
    setHovered(hoverState);
  };

  return (
    <StyledHome data-testid="container">
      <div className="home-container">
        {bunnyState === "yes" ? (
          <div className="title">
            Looking forward to seeing you again soon, sweetie 😘
          </div>
        ) : (
          <div className="title">Will you go out with me?</div>
        )}
        <div className="animation">
          {bunnyState === "normal" && <Image src={bunnyPlease} alt="loading" />}
          {bunnyState === "cry" && <Image src={bunnyCry} alt="loading" />}
          {bunnyState === "yes" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Image src={bunnyYes} alt="loading" />
              <Image src={bunnyYes1} alt="loading" />
            </div>
          )}
          {bunnyState === "punch" && <Image src={bunnyCry} alt="loading" />}
        </div>
        {bunnyState !== "yes" && (
          <div className="buttons">
            <button
              onClick={() => setBunnyState("yes")}
              onMouseEnter={() => setBunnyState("normal")}
            >
              Yes
            </button>
            <Button
              $randomleft={randomPosition.randomLeft}
              $randomtop={randomPosition.randomTop}
              $hasstarted={hasStarted}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              No
            </Button>
          </div>
        )}
      </div>
    </StyledHome>
  );
}

const StyledHome = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #feeafb;
  .home-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 2rem;
      color: #5caff3;
      font-family: comic sans ms;
    }
  }
  .buttons {
    display: flex;
    gap: 2rem;
  }
`;

export default Home;
