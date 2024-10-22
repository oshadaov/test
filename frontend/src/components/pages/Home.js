import React, { useState } from "react";
import GlitchHeader from "./GlichHeader";
import HackedTerminal from '../HackedTerminal';
import UserInput from '../UserInput';
import WarningBanner from '../WarningBanner';
import VirusUpload from '../VirusUpload';
import CriticalErrorLogs from '../CriticalErrorLogs';
import CountdownTimer from '../CountdownTimer';
import './Home.css';

function Home() {
    const [shutdown, setShutdown] = useState(false);

    const handleShutdown = () => {
        setShutdown(true);
        // Optional: Add further shutdown effects like redirect or screen lock
        setTimeout(() => {
            window.location.href = "/shutdown";
        }, 3000); // Redirect to a shutdown page after 3 seconds
    };

    if (shutdown) {
        return (
            <div className="shutdown-screen">
                <h1>System Shutting Down...</h1>
            </div>
        );
    }

    return (
        <div className="home-container">
            <GlitchHeader />
            <WarningBanner />
            <div className="main-container">
                <HackedTerminal />
                <UserInput onShutdown={handleShutdown} />
                <CountdownTimer />
                <VirusUpload />
                <CriticalErrorLogs />
            </div>
        </div>
    );
}

export default Home;
