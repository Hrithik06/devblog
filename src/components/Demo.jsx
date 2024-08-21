import React from 'react';
import image from '../assets/mohammad-rahmani-gA396xahf-Q-unsplash.jpg';
export default function Post() {
    return (
        <div className="w-full  flex flex-col items-center">
            <div className="pb-[300px] w-full relative ">
                <div className="w-full  px-80 flex flex-col justify-center mb-4  bg-gradient-to-b from-[#f4f4f4] to-[#d6d6d6] border-b-[3px] border-black pb-[300px] ">
                    <div className="w-3/4 space-y-4 ml-12 mb-4 ">
                        <div className="flex items-center gap-2 text-gray-500 text-xl">
                            Thursday, August 15, 2024
                            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                            &lt; 1 min read
                        </div>
                        <h1 className="xl:text-7xl font-bold text-shadow-gray-300 text-shadow-sm">
                            The Future of Web Development: Trends to Watch in
                            2025
                        </h1>
                        <p>//TODO: #TAG</p>
                        <p className="text-gray-700 text-xl">Daniel Foster</p>
                    </div>
                    <div className=" absolute bottom-0">
                        <img
                            src={image}
                            alt=""
                            className="xl:max-w-4xl rounded-[48px] border-4 border-yellow-600"
                        />
                    </div>
                </div>
            </div>
            <div className="max-w-3xl ">
                Web development is an ever-changing landscape, and as we move
                closer to 2025, several emerging trends are poised to redefine
                the way we build digital experiences. One of the most
                significant shifts well see is the increased adoption of
                AI-driven development. Tools that leverage artificial
                intelligence to assist in coding, debugging, and optimizing web
                applications are becoming more sophisticated, allowing
                developers to work more efficiently and creatively. Another key
                trend is the rise of Web3, which encompasses decentralized
                applications dApps and blockchain technology. Web3 promises to
                give users more control over their data and digital identities,
                moving away from centralized platforms. For web developers, this
                means learning new technologies and paradigms that focus on
                decentralized protocols and smart contracts. Serverless
                architecture is also gaining traction, offering developers a way
                to build and run applications without managing infrastructure.
                This approach not only reduces operational costs but also allows
                for greater scalability and faster deployment times. Key
                Takeaways: AI-driven development will automate repetitive tasks
                and enhance coding efficiency. Web3 and decentralized
                applications will require developers to learn new technologies.
                Serverless architecture will simplify deployment and scaling,
                making it a must-learn for developers in 2025.
            </div>
        </div>
    );
}
