import MainCover from "../main_cover/MainCover";
import MarqueeSection from './../marquee_seciton/MarqueeSection';
import Testimonials from "../testimonials/Testimonials";
import LocationMap from "../location_map/LocationMap";
import Accommodation from "../accommodation/Accommodation";
import OurServices from "../our_services/OurServices";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Home = () => {
    const { setTitle } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(1, 1);
        setTitle("Home");
    }, [setTitle])

    return (
        <div>
            <MainCover></MainCover>
            <MarqueeSection></MarqueeSection>
            <Accommodation></Accommodation>
            <Testimonials></Testimonials>
            <OurServices></OurServices>
            <LocationMap></LocationMap>
        </div>
    );
};

export default Home;