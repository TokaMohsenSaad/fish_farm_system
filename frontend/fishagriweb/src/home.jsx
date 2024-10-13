export default function Home() 
{
    return (
        <>
            <div className='back' style={{ display: 'flex', position: 'relative' }}>
                <div style={{ marginLeft: '200px', marginTop: '300px' }}>
                    <p style={{ fontSize: '50px', margin: '0', textShadow: '6px 6px 5px rgba(0, 0, 0, 0.6)' }}>OPTIMUM</p>
                    <h1 style={{ fontSize: '50px', color: '#3d3d3f', margin: '0', textShadow: '6px 6px 5px rgba(0, 0, 0, 0.6)' }}>AQUA ENVIRONMENT</h1>
                    <p>"Choosing the Right Water for Your Fish: A Comprehensive Guide"</p>
                    <p style={{ width: '60%' }}>
                        Introduction: Welcome to our comprehensive guide on selecting the ideal water conditions for different types of fish.
                        Ensuring the right water parameters is crucial for the health and well-being of your aquatic companions.
                        In this guide, we'll walk you through the key factors to consider when determining the suitable water for various fish species.
                    </p>
                </div>
                <div className="image-container">
                    <div className='rotate-image'>
                        <img src={require('./images/dory-blue-tang-fish-1962774-1662170.png')} alt="Rotating Fish" className='rotatefish' />
                    </div>
                </div>
            </div>
        </>
    );
}