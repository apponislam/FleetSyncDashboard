const getLocationName = async (lat, lng) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        return data.display_name || "Unknown location";
    } catch (error) {
        console.error("Error getting location:", error);
        return "Unknown location";
    }
};

export default getLocationName;
