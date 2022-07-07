import { animations, Button, styles } from "@components/Button";
import joinArgs from "@utils/joinArgs";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        className={joinArgs([animations.outline, styles.outline])}
        onClick={() => {
          navigate("/auth");
        }}
      >
        Testing
      </Button>
    </div>
  );
}

export default Home;
