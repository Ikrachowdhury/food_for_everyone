import jsonData from '../assets/json files/GetFoodCardData.json';
import '../assets/css/GetFoodOption.css'
import HomeNavbar from './HomeNavbar';

const GetFoodOption = () => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const value = urlParams.get('value');
    const renderOptionCards = () => {
        return jsonData.map((card, index) => (
            <div className="col text-center px-5 py-5 " key={index}>
                <a
                    href={`${card.link}?value=${card.title === 'Organization' ? 'organization' : card.title === 'Individual' ? 'donee' : 'donee'}`}
                    className="cardLink"
                >
                    <div className="card shadow" >
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
    return (
        <>
        <HomeNavbar />
            <div className="row row-cols-1 row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-1 g-4 mx-5 FoodOption" style={{marginTop:"150px"}}>
                {renderOptionCards()}
            </div>
        </>
    );
};

export default GetFoodOption;