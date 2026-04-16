document.getElementById("sosBtn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const data = {
        touristId: "DEMO123",
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        timestamp: new Date(),
        message: "SOS pressed"
      };

      fetch("http://localhost:5000/api/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(resp => alert("SOS Sent!"))
      .catch(err => console.error(err));
    });
  } else {
    alert("Geolocation not supported!");
  }
});
