import '../assets/css/home.css'
// import Sidebar from '../components/Sidebar';
import image from '../images/images1.jpg'
import impact5 from "../images/impact5.png"
import impact6 from "../images/impact6.png"
import jsonData from '../assets/json files/cardData.json';
import impactData from "../assets/json files/impactData.json";
const Home = () => {
    const renderCards = () => {
        return jsonData.map((card, index) => (
            <div className="col text-center px-4 py-5" key={index}>
                <a href={`${card.link}?value=${card.value}`} className="cardLink navigation-grid-element">
                    <div className="card cardShadow" >
                        <div className="thumbnail-image-wrapper">
                            <img src={card.image} className="card-img-top thumbnail-image" alt="..." />
                        </div>
                        <div className="card-body">
                            <h1 className="cardTitle text-dark fw-bold pb-2">{card.title}</h1>
                            <div className="paragraph-wrapper">
                                <p className="card-text paragraphText">{card.description}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        ));
    };

    const renderImpactElements = () => {
        return impactData.map((impact, index) => (
            <div className="col" key={index}>
                <div className="impact-element">
                    <div className="impact-image">
                        <img src={impact.image} alt="" className={impact.imageClass} />
                    </div>
                    <div className="text-block-56">{impact.value}</div>
                    <div className="impact-paragraph-wrapper">
                        <p className="impact-paragraph">{impact.description}</p>
                    </div>
                </div>
            </div>
        ));
    };
    return (
        <div className="mainHomePage d-flex">
            {/* <Sidebar /> */}
            <div className="main-content">
                <div className="text">
                    <div className="homePage bg-light" style={{ marginTop: "-1px" }}>
                        <section className="imageSection">
                            <div className="landing-hero">
                                <img src={image} alt="" className="home-hero-image-copy" />
                                <div className="_1080p-wrapper">
                                    <div className="homepage-main-container">
                                        <h1 className="home-hero-header">Food for Everyone is reducing food loss and waste through surplus food redistribution</h1>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="px-5">
                            <div className="pb-5">
                                <div>
                                    <h1 className="text-center fw-bold pt-3 getInvolvedHeading">Get Involved</h1>
                                </div>
                                <div className="getInvolvedCard">
                                    <div>
                                        <div className="row row-cols-1 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
                                            {renderCards()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="impact-wrapper">
                                <div className="impact-container">
                                    <h1 className="text-center fw-bold getInvolvedHeading">Our Impact</h1>
                                    <div className="row row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 g-4">
                                        {renderImpactElements()}
                                    </div>
                                    <div className="impact-separator"></div>
                                    <div className="row row-cols-2 row-cols-xl-2 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 g-4">
                                        <div className="col">
                                            <div className="impact-element-horizontal">
                                                <div className="impact-image-co2">
                                                    <img src={impact5} alt="" />
                                                </div>
                                                <div>
                                                    <div className="text-block-56">349K</div>
                                                    <p className="impact-paragraph">tonnes of CO<sub>2</sub> -equivalent has been avoided</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="impact-element-copy last last-horizontal">
                                                <div className="impact-element-horizontal-copy">
                                                    <div className="impact-image-sdg">
                                                        <img src={impact6} alt="" className="image-107" />
                                                    </div>
                                                    <div className="div-block-126">
                                                        <div className="impact-paragraph">Supporting Smart Bangladesh Vision 2041 agenda</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
