"use client";

import { useEffect, useState } from "react";

function Modals() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
    </>
  );
}

export default Modals;
