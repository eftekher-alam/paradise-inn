
const LocationMap = () => {

    return (
        <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-duration="1000"
            data-aos-offset="0"
        >
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1857.0975870869836!2d91.97536750782541!3d21.42157218438964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc87b9ddae253%3A0xd409427675824e6b!2z4Ka54Ka_4Kay4Kaf4KaoIOCmn-CmvuCmk-Cmr-CmvOCmvuCmsCDgprLgpr_gpq7gpr_gpp_gp4fgpqE!5e0!3m2!1sen!2sbd!4v1699540077364!5m2!1sen!2sbd"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
            >
            </iframe>
        </div>
    );
};

export default LocationMap;