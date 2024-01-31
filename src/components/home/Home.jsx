import { useRef, useState } from "react";
import Lottie from "lottie-react";
import confettiAnimation from "../../assets/confetti.json"


function Home(props) {
    const noSizes = ['2xl', '4xl', '5xl'];
    const happySongRef = useRef();
    const sadSongRef = useRef();
    const lottieRef = useRef();
    const [noIndex, setNoIndex] = useState(noSizes.length - 1);
    const [noHidden, setNoHidden] = useState(false);
    const [happyHidden, setHappyHidden] = useState(true);
    const [sadHidden, setSadHidden] = useState(true);
    const [lottieHidden, setLottieHidden] = useState(true);


    const handleYes = () => {
        setSadHidden(true);
        setHappyHidden(false);
        setLottieHidden(false);
        lottieRef.current.goToAndPlay(0, true);
        if (!sadSongRef.current.paused) {
            sadSongRef.current.pause();
        }
        if (happySongRef.current.paused) {
            happySongRef.current.play();
        }
    }

    const handleNo = () => {
        setHappyHidden(true);
        setSadHidden(false);
        setLottieHidden(true);
        if (!happySongRef.current.paused) {
            happySongRef.current.pause();
        }
        if (sadSongRef.current.paused) {
            sadSongRef.current.play();
        }
        if (noIndex > 0) {
            setNoIndex(index => index - 1);
        } else {
            setNoHidden(true);
        }
    }

    return (
        <>
        <div id="page-wrapper" className="w-full h-full flex justify-center items-center bg-cover bg-[url('/background.png')]">
            <main className="w-5/6 h-5/6 sm:h-3/4 flex flex-col justify-between items-center">
                <section className="w-full h-1/3 text-5xl sm:text-6xl flex flex-col sm:flex-row text-red-700 ">
                    <div className="w-full sm:w-1/3">
                        <h1>jayna wu,</h1>
                        <h2>be my valentine?</h2>
                    </div>
                    <Lottie animationData={confettiAnimation} loop={false} autoplay={false} lottieRef={lottieRef} className="w-full sm:w-1/3 h-full sm:h-[150%] z-0" hidden={lottieHidden} />
                </section>
                <section className="w-4/5 sm:w-2/5 h-1/6 flex flex-row justify-between items-center z-10">
                        <div className="w-1/2 h-full flex justify-center">
                            <button onClick={handleYes} className="text-5xl active:text-[#FEE8EA]">yes &lt;3</button>
                        </div>
                        <div className="w-1/2 h-full flex justify-center items-center">
                            <button onClick={handleNo} className={`text-${noSizes[noIndex]} active:text-[#FEE8EA]`} hidden={noHidden}>no &lt;/3</button>
                            <h3 className="text-2xl" hidden={!noHidden}>wtf.</h3>
                        </div>
                </section>
                <section className="w-full h-1/3 sm:h-1/2 flex justify-center">
                    <img className="h-full" src="/happy-cat.gif" alt="happy-cat" hidden={happyHidden} />
                    <img className="h-full" src="/sad-cat.gif" alt="sad kitty" hidden={sadHidden} />
                </section>
            </main>
        </div>
        <audio id="happySong" src="/happy.mp3" ref={happySongRef} loop={true} className="text-4xl"/>
        <audio id="sadSong" src="/sad-violin.mp3" ref={sadSongRef} />
        </>
    )
}

export default Home;